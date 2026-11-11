/**
 * Skip Not Ad Studios - Supabase Cloud Synchronization & Auto-Purge Engine
 * Bridges local data with Supabase PostgreSQL cloud database.
 */

class SupabaseManager {
  constructor() {
    this.client = null;
    this.configKey = 'SNAS_SUPABASE_CONFIG';
    this.config = this.loadConfig();
    this.initClient();
  }

  loadConfig() {
    try {
      const saved = localStorage.getItem(this.configKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          url: parsed.url || 'https://vdczaejdmdirogtzsbtc.supabase.co',
          anonKey: parsed.anonKey || 'sb_publishable_R3sRpviUs267A28J1gQECg_vcXkg1V4',
          connected: Boolean(parsed.anonKey || 'sb_publishable_R3sRpviUs267A28J1gQECg_vcXkg1V4')
        };
      }
    } catch (e) {
      console.warn('Failed to load Supabase config:', e);
    }
    return {
      url: 'https://vdczaejdmdirogtzsbtc.supabase.co',
      anonKey: 'sb_publishable_R3sRpviUs267A28J1gQECg_vcXkg1V4',
      connected: true
    };
  }

  saveConfig(url, anonKey) {
    this.config = {
      url: (url || '').trim(),
      anonKey: (anonKey || '').trim(),
      connected: Boolean(url && anonKey)
    };
    localStorage.setItem(this.configKey, JSON.stringify(this.config));
    this.initClient();
    return this.config.connected;
  }

  initClient() {
    if (this.config.url && this.config.anonKey && window.supabase) {
      try {
        this.client = window.supabase.createClient(this.config.url, this.config.anonKey);
        console.log('✓ Supabase Cloud Client Initialized successfully.');
        // Automated keep-alive ping: keeps Supabase active even on casual page visits
        this.client.from('snas_staff').select('id', { head: true, count: 'exact' }).then(() => {
          console.log('✓ Supabase keep-alive pulse active.');
        }).catch(() => {});
      } catch (err) {
        console.error('Failed to initialize Supabase client:', err);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }

  isConnected() {
    return Boolean(this.client);
  }

  // Test live connection to Supabase
  async testConnection() {
    if (!this.client) {
      return { success: false, message: 'Supabase credentials not configured.' };
    }
    try {
      const { data, error } = await this.client.from('snas_staff').select('count', { count: 'exact', head: true });
      if (error) throw error;
      return { success: true, message: 'Connected to Supabase PostgreSQL Cloud successfully!' };
    } catch (err) {
      return { success: false, message: err.message || 'Connection failed' };
    }
  }

  // Synchronize Staff from Supabase to Local or vice versa
  async pullStaff() {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client.from('snas_staff').select('*');
      if (error) throw error;
      if (data && data.length > 0) {
        const mapped = data.map(s => ({
          id: s.id,
          username: s.username,
          password: s.password,
          name: s.name,
          role: s.role,
          department: s.department,
          phone: s.phone,
          baseSalary: Number(s.base_salary) || 25000,
          joinedDate: s.joined_date,
          avatarUrl: s.avatar_url || '',
          active: s.active
        }));
        window.SNAS_DB.data.staff = mapped;
        window.SNAS_DB.saveData();
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase pullStaff error:', e);
    }
    return null;
  }

  // Push attendance record to Supabase Cloud
  async pushAttendance(record) {
    if (!this.client) return null;
    try {
      const payload = {
        id: record.id,
        staff_id: record.staffId,
        staff_name: record.staffName,
        date: record.date,
        check_in_time: record.checkInTime,
        check_out_time: record.checkOutTime || '--',
        duration: record.duration || 'In Progress',
        location: record.location,
        lat: record.coords?.lat || null,
        lon: record.coords?.lon || null,
        accuracy: record.coords?.accuracy || null,
        selfie_url: record.selfieUrl || '',
        device_info: record.deviceInfo || 'Web App'
      };
      const { data, error } = await this.client.from('snas_attendance').upsert(payload);
      if (error) throw error;
      return data;
    } catch (e) {
      console.warn('Failed pushing attendance to Supabase:', e);
    }
    return null;
  }

  // Push new leave request to Supabase Cloud
  async pushLeave(leave) {
    if (!this.client) return null;
    try {
      const payload = {
        id: leave.id,
        staff_id: leave.staffId,
        staff_name: leave.staffName,
        apply_date: leave.applyDate,
        leave_date: leave.leaveDate,
        leave_type: leave.leaveType,
        reason: leave.reason,
        status: leave.status,
        admin_remarks: leave.adminRemarks || ''
      };
      const { data, error } = await this.client.from('snas_leaves').upsert(payload);
      if (error) throw error;
      return data;
    } catch (e) {
      console.warn('Failed pushing leave to Supabase:', e);
    }
    return null;
  }

  // Push new task or task status to Supabase Cloud
  async pushTask(task) {
    if (!this.client) return null;
    try {
      const payload = {
        id: task.id,
        staff_id: task.staffId,
        staff_name: task.staffName,
        title: task.title,
        description: task.description,
        priority: task.priority,
        assigned_date: task.assignedDate,
        due_date: task.dueDate,
        status: task.status,
        submission_notes: task.submissionNotes || '',
        submission_link: task.submissionLink || '',
        rolled_over: Boolean(task.rolledOver),
        rolled_over_from_date: task.rolledOverFromDate || null,
        admin_review_notes: task.adminReviewNotes || ''
      };
      const { data, error } = await this.client.from('snas_tasks').upsert(payload);
      if (error) throw error;
      return data;
    } catch (e) {
      console.warn('Failed pushing task to Supabase:', e);
    }
    return null;
  }

  // =========================================================================
  // MONTHLY PURGE & 30-DAY AUTO-CLEANUP ENGINE
  // =========================================================================
  async purgeOldData(daysThreshold = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysThreshold);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];

    let deletedLocal = 0;

    // 1. Purge from local state
    const originalLen = window.SNAS_DB.data.attendance.length;
    window.SNAS_DB.data.attendance = window.SNAS_DB.data.attendance.filter(a => a.date >= cutoffStr);
    deletedLocal = originalLen - window.SNAS_DB.data.attendance.length;

    // Purge old approved/rejected leaves older than threshold
    window.SNAS_DB.data.leaves = window.SNAS_DB.data.leaves.filter(l => l.applyDate >= cutoffStr || l.status === 'Pending');

    // Purge completed/approved tasks older than threshold
    window.SNAS_DB.data.tasks = window.SNAS_DB.data.tasks.filter(t => t.assignedDate >= cutoffStr || t.status !== 'Approved');

    window.SNAS_DB.saveData();

    // 2. Purge from Supabase if connected
    let deletedCloud = 0;
    if (this.client) {
      try {
        const { error } = await this.client
          .from('snas_attendance')
          .delete()
          .lt('date', cutoffStr);
        if (!error) deletedCloud = 1;
      } catch (err) {
        console.warn('Supabase remote purge error:', err);
      }
    }

    return {
      deletedLocal,
      deletedCloud,
      cutoffDate: cutoffStr
    };
  }
}

// Global Singleton
window.SNAS_SUPABASE = new SupabaseManager();
