/**
 * Skip Not Ad Studios - Core Database & State Management System
 * Handles Admin/Staff Auth, Live Attendance, Face Verification Snaps,
 * Geolocation Tracking, Leave Applications, and Daily Tasks with Rollover.
 */

const STORAGE_KEY = 'SNAS_ENTERPRISE_DB_V2';

// Default initial state seeded with realistic corporate agency data
const defaultState = {
  admin: {
    username: 'snas@001',
    password: 'gowiththeflow',
    displayName: 'Executive Management (SNAS Admin)',
    phone: '6380404840',
    email: 'admin@skipnotadstudios.com'
  },
  staff: [
    {
      id: 'STAFF-CAM01',
      username: 'cam01',
      password: 'cam123',
      name: 'Vignesh K.',
      role: 'Chief Cinematographer & Drone Op',
      department: 'Production & Video Team',
      phone: '9840123456',
      baseSalary: 35000,
      joinedDate: '2025-03-15',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      active: true
    },
    {
      id: 'STAFF-MKT01',
      username: 'mkt01',
      password: 'mkt123',
      name: 'Pooja Raghavan',
      role: 'Lead Performance & SEO Strategist',
      department: 'Growth Marketing',
      phone: '9840234567',
      baseSalary: 38000,
      joinedDate: '2025-04-01',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      active: true
    },
    {
      id: 'STAFF-DEV01',
      username: 'dev01',
      password: 'dev123',
      name: 'Dinesh Manickam',
      role: 'Principal Full-Stack & SaaS Engineer',
      department: 'Software Engineering',
      phone: '9840345678',
      baseSalary: 45000,
      joinedDate: '2025-03-20',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      active: true
    }
  ],
  attendance: [
    {
      id: 'ATT-20261110-01',
      staffId: 'STAFF-CAM01',
      staffName: 'Vignesh K.',
      date: '2026-11-10',
      checkInTime: '09:12 AM',
      checkOutTime: '06:34 PM',
      duration: '9h 22m',
      location: 'Pakka Wash Detailing Studio, OMR, Chennai',
      coords: { lat: 12.9716, lon: 80.2452, accuracy: 12 },
      selfieUrl: '',
      deviceInfo: 'Camera Field Kit / Mobile Web'
    },
    {
      id: 'ATT-20261110-02',
      staffId: 'STAFF-MKT01',
      staffName: 'Pooja Raghavan',
      date: '2026-11-10',
      checkInTime: '09:28 AM',
      checkOutTime: '06:05 PM',
      duration: '8h 37m',
      location: 'Skip Not Ad HQ, Chennai, TN',
      coords: { lat: 13.0827, lon: 80.2707, accuracy: 8 },
      selfieUrl: '',
      deviceInfo: 'Workstation Chrome'
    },
    {
      id: 'ATT-20261110-03',
      staffId: 'STAFF-DEV01',
      staffName: 'Dinesh Manickam',
      date: '2026-11-10',
      checkInTime: '09:05 AM',
      checkOutTime: '06:40 PM',
      duration: '9h 35m',
      location: 'Skip Not Ad HQ, Chennai, TN',
      coords: { lat: 13.0827, lon: 80.2707, accuracy: 6 },
      selfieUrl: '',
      deviceInfo: 'MacBook Pro / Office LAN'
    }
  ],
  leaves: [
    {
      id: 'LEV-101',
      staffId: 'STAFF-CAM01',
      staffName: 'Vignesh K.',
      applyDate: '2026-11-08',
      leaveDate: '2026-11-14',
      leaveType: 'Casual Leave',
      reason: 'Family function in Madurai (Outstation travel)',
      status: 'Approved',
      adminRemarks: 'Approved. Advance shoot rescheduled for Molten Morsels.',
      notifiedViaWhatsApp: true,
      timestamp: '2026-11-08T10:15:00Z'
    },
    {
      id: 'LEV-102',
      staffId: 'STAFF-MKT01',
      staffName: 'Pooja Raghavan',
      applyDate: '2026-11-10',
      leaveDate: '2026-11-16',
      leaveType: 'Medical Leave',
      reason: 'Health checkup and dental appointment',
      status: 'Pending',
      adminRemarks: '',
      notifiedViaWhatsApp: true,
      timestamp: '2026-11-10T14:30:00Z'
    }
  ],
  tasks: [
    {
      id: 'TSK-201',
      staffId: 'STAFF-CAM01',
      staffName: 'Vignesh K.',
      title: 'Molten Morsels 4K Reel Production & Color Grading',
      description: 'Finish client location b-roll shoot editing, export in 9:16 high bitrate for Instagram reels with sound design.',
      priority: 'High',
      assignedDate: '2026-11-11',
      dueDate: '2026-11-11',
      status: 'Assigned', // 'Assigned' | 'Submitted' | 'Approved' | 'Revision'
      submissionNotes: '',
      submissionLink: '',
      rolledOver: false,
      rolledOverFromDate: null
    },
    {
      id: 'TSK-202',
      staffId: 'STAFF-CAM01',
      staffName: 'Vignesh K.',
      title: 'Style Craft Salon - Promo Cut Raw Backup to Cloud',
      description: 'Upload all A-cam & B-cam 120fps slow-mo footage to client GDrive archive folder.',
      priority: 'High',
      assignedDate: '2026-11-10',
      dueDate: '2026-11-10',
      status: 'Assigned',
      submissionNotes: '',
      submissionLink: '',
      rolledOver: true,
      rolledOverFromDate: '2026-11-10'
    },
    {
      id: 'TSK-203',
      staffId: 'STAFF-MKT01',
      staffName: 'Pooja Raghavan',
      title: 'AF Nutrition Meta Ads ROAS Optimization',
      description: 'Audit top 3 CBO campaigns, pause underperforming ad sets (< 3.2x ROAS), scale winning creatine video ads.',
      priority: 'High',
      assignedDate: '2026-11-11',
      dueDate: '2026-11-11',
      status: 'Submitted',
      submissionNotes: 'Audited 5 ad sets. Shifted 40% budget to Creatine Monohydrate hook reel. ROAS trending at 4.1x today.',
      submissionLink: 'https://business.facebook.com/adsmanager',
      rolledOver: false,
      rolledOverFromDate: null
    },
    {
      id: 'TSK-204',
      staffId: 'STAFF-DEV01',
      staffName: 'Dinesh Manickam',
      title: 'Uno Tours - Booking System Webhook Integration',
      description: 'Complete Razorpay payment webhook handler and send automatic PDF confirmation tickets to customer WhatsApp.',
      priority: 'Medium',
      assignedDate: '2026-11-11',
      dueDate: '2026-11-11',
      status: 'Assigned',
      submissionNotes: '',
      submissionLink: '',
      rolledOver: false,
      rolledOverFromDate: null
    }
  ],
  settings: {
    studioPhone: '6380404840',
    studioWhatsApp: '916380404840',
    officeCoords: { lat: 13.0827, lon: 80.2707, radiusMeters: 500 },
    workingDaysPerMonth: 26
  }
};

class DBManager {
  constructor() {
    this.data = this.loadData();
    this.runAutomaticRollover();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.saveData(defaultState);
        return JSON.parse(JSON.stringify(defaultState));
      }
      const parsed = JSON.parse(stored);
      // Ensure all critical collections exist
      return {
        ...defaultState,
        ...parsed,
        admin: { ...defaultState.admin, ...(parsed.admin || {}) },
        settings: { ...defaultState.settings, ...(parsed.settings || {}) }
      };
    } catch (e) {
      console.error('Failed reading DB from localStorage, falling back to default:', e);
      return JSON.parse(JSON.stringify(defaultState));
    }
  }

  saveData(data = this.data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.data = data;
    } catch (e) {
      console.error('Failed persisting DB to localStorage:', e);
    }
  }

  /**
   * Automatic Task Rollover Engine:
   * Rule: If a task was assigned on an earlier day and is NOT marked 'Approved',
   * it must automatically roll over into today's workload with a Rolled Over flag
   * and warning tag, so neither staff nor admin loses track of it.
   */
  runAutomaticRollover() {
    const today = new Date().toISOString().split('T')[0];
    let modified = false;

    this.data.tasks = this.data.tasks.map(task => {
      // If task is not approved, and its assigned/due date is before today
      if (task.status !== 'Approved' && task.dueDate && task.dueDate < today) {
        if (!task.rolledOver) {
          modified = true;
          return {
            ...task,
            rolledOver: true,
            rolledOverFromDate: task.dueDate,
            dueDate: today, // Roll forward into today
            priority: 'High' // Escalate priority on rollover
          };
        }
      }
      return task;
    });

    if (modified) {
      this.saveData();
    }
  }

  // Auth queries
  authenticate(username, password) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Check Admin
    if (
      cleanUser === this.data.admin.username.toLowerCase() &&
      cleanPass === this.data.admin.password
    ) {
      return {
        success: true,
        role: 'admin',
        profile: {
          id: 'ADMIN-001',
          name: this.data.admin.displayName,
          username: this.data.admin.username,
          phone: this.data.admin.phone,
          email: this.data.admin.email
        }
      };
    }

    // Check Staff
    const staff = this.data.staff.find(
      s =>
        (s.username.toLowerCase() === cleanUser || s.id.toLowerCase() === cleanUser) &&
        s.password === cleanPass &&
        s.active !== false
    );

    if (staff) {
      return {
        success: true,
        role: 'staff',
        profile: { ...staff }
      };
    }

    return {
      success: false,
      message: 'Invalid Username or Password. Please check your credentials.'
    };
  }

  // Staff CRUD
  addStaff(staffMember) {
    const id = `STAFF-${Date.now().toString().slice(-4)}`;
    const newStaff = {
      id,
      username: staffMember.username || `user${Math.floor(100 + Math.random() * 900)}`,
      password: staffMember.password || 'snas123',
      name: staffMember.name || 'Unnamed Staff',
      role: staffMember.role || 'Production Staff',
      department: staffMember.department || 'Operations',
      phone: staffMember.phone || '',
      baseSalary: Number(staffMember.baseSalary) || 25000,
      joinedDate: new Date().toISOString().split('T')[0],
      avatarUrl: staffMember.avatarUrl || '',
      active: true
    };
    this.data.staff.push(newStaff);
    this.saveData();
    return newStaff;
  }

  getStaffById(staffId) {
    return this.data.staff.find(s => s.id === staffId);
  }

  // Attendance Records
  recordAttendance(record) {
    const id = `ATT-${Date.now()}`;
    const newRecord = {
      id,
      timestamp: new Date().toISOString(),
      ...record
    };
    this.data.attendance.unshift(newRecord);
    this.saveData();
    if (window.SNAS_SUPABASE) {
      window.SNAS_SUPABASE.pushAttendance(newRecord);
    }
    return newRecord;
  }

  getTodayAttendance(staffId) {
    const today = new Date().toISOString().split('T')[0];
    return this.data.attendance.find(a => a.staffId === staffId && a.date === today);
  }

  updateAttendance(id, updates) {
    const idx = this.data.attendance.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.data.attendance[idx] = { ...this.data.attendance[idx], ...updates };
      this.saveData();
      if (window.SNAS_SUPABASE) {
        window.SNAS_SUPABASE.pushAttendance(this.data.attendance[idx]);
      }
      return this.data.attendance[idx];
    }
    return null;
  }

  // Leave System
  applyLeave(staffId, details) {
    const staff = this.getStaffById(staffId);
    const id = `LEV-${Date.now().toString().slice(-4)}`;
    const newLeave = {
      id,
      staffId,
      staffName: staff ? staff.name : 'Unknown Staff',
      applyDate: new Date().toISOString().split('T')[0],
      leaveDate: details.leaveDate,
      leaveType: details.leaveType || 'Casual Leave',
      reason: details.reason || '',
      status: 'Pending', // 'Pending' | 'Approved' | 'Rejected'
      adminRemarks: '',
      notifiedViaWhatsApp: true,
      timestamp: new Date().toISOString()
    };
    this.data.leaves.unshift(newLeave);
    this.saveData();
    if (window.SNAS_SUPABASE) {
      window.SNAS_SUPABASE.pushLeave(newLeave);
    }
    return newLeave;
  }

  updateLeaveStatus(leaveId, status, adminRemarks = '') {
    const leave = this.data.leaves.find(l => l.id === leaveId);
    if (leave) {
      leave.status = status;
      leave.adminRemarks = adminRemarks;
      this.saveData();
      if (window.SNAS_SUPABASE) {
        window.SNAS_SUPABASE.pushLeave(leave);
      }
      return leave;
    }
    return null;
  }

  // Task System
  createTask(taskData) {
    const id = `TSK-${Date.now().toString().slice(-4)}`;
    const staff = this.getStaffById(taskData.staffId);
    const newTask = {
      id,
      staffId: taskData.staffId,
      staffName: staff ? staff.name : 'Unassigned',
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'Medium',
      assignedDate: taskData.assignedDate || new Date().toISOString().split('T')[0],
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      status: 'Assigned',
      submissionNotes: '',
      submissionLink: '',
      rolledOver: false,
      rolledOverFromDate: null
    };
    this.data.tasks.unshift(newTask);
    this.saveData();
    if (window.SNAS_SUPABASE) {
      window.SNAS_SUPABASE.pushTask(newTask);
    }
    return newTask;
  }

  submitTaskWork(taskId, notes, link = '') {
    const task = this.data.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = 'Submitted';
      task.submissionNotes = notes;
      task.submissionLink = link;
      task.submittedAt = new Date().toISOString();
      this.saveData();
      if (window.SNAS_SUPABASE) {
        window.SNAS_SUPABASE.pushTask(task);
      }
      return task;
    }
    return null;
  }

  reviewTask(taskId, status, notes = '') {
    const task = this.data.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status; // 'Approved' | 'Revision'
      if (notes) task.adminReviewNotes = notes;
      this.saveData();
      if (window.SNAS_SUPABASE) {
        window.SNAS_SUPABASE.pushTask(task);
      }
      return task;
    }
    return null;
  }

  // Salary Calculator
  calculateSalary(staffId) {
    const staff = this.getStaffById(staffId);
    if (!staff) return null;

    const baseSalary = staff.baseSalary || 30000;
    const workingDays = this.data.settings.workingDaysPerMonth || 26;
    const perDayRate = Math.round(baseSalary / workingDays);

    // Count present days in current month
    const now = new Date();
    const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const presentDays = this.data.attendance.filter(
      a => a.staffId === staffId && a.date.startsWith(currentMonthPrefix)
    ).length;

    const approvedLeaves = this.data.leaves.filter(
      l =>
        l.staffId === staffId &&
        l.leaveDate.startsWith(currentMonthPrefix) &&
        l.status === 'Approved'
    ).length;

    // Paid days = present + approved paid leaves
    const paidDays = Math.min(workingDays, presentDays + approvedLeaves);
    const estimatedPayout = Math.round(paidDays * perDayRate);

    return {
      baseSalary,
      workingDays,
      perDayRate,
      presentDays,
      approvedLeaves,
      paidDays,
      estimatedPayout,
      month: now.toLocaleString('default', { month: 'long', year: 'numeric' })
    };
  }

  exportBackup() {
    return JSON.stringify(this.data, null, 2);
  }

  importBackup(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.staff && parsed.admin) {
        this.data = parsed;
        this.saveData();
        return true;
      }
    } catch (e) {
      console.error('Invalid backup JSON:', e);
    }
    return false;
  }

  resetDefault() {
    this.data = JSON.parse(JSON.stringify(defaultState));
    this.saveData();
  }
}

// Global Singleton Export
window.SNAS_DB = new DBManager();
