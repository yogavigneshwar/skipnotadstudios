-- =====================================================================
-- SKIP NOT AD STUDIOS - SUPABASE CLOUD DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor (1-Click Execution)
-- =====================================================================

-- 1. Create Staff Members Table
CREATE TABLE IF NOT EXISTS snas_staff (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(150) NOT NULL,
  role VARCHAR(150) NOT NULL,
  department VARCHAR(100) DEFAULT 'Operations',
  phone VARCHAR(25),
  base_salary NUMERIC DEFAULT 25000,
  joined_date DATE DEFAULT CURRENT_DATE,
  avatar_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Attendance Verification Table (Face Snapshot + GPS Coordinates)
CREATE TABLE IF NOT EXISTS snas_attendance (
  id VARCHAR(50) PRIMARY KEY,
  staff_id VARCHAR(50) REFERENCES snas_staff(id) ON DELETE CASCADE,
  staff_name VARCHAR(150),
  date DATE DEFAULT CURRENT_DATE,
  check_in_time VARCHAR(25),
  check_out_time VARCHAR(25) DEFAULT '--',
  duration VARCHAR(50) DEFAULT 'In Progress',
  location TEXT,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  accuracy DOUBLE PRECISION,
  selfie_url TEXT,
  device_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Daily Tasks Table (with Automated Rollover Support)
CREATE TABLE IF NOT EXISTS snas_tasks (
  id VARCHAR(50) PRIMARY KEY,
  staff_id VARCHAR(50) REFERENCES snas_staff(id) ON DELETE CASCADE,
  staff_name VARCHAR(150),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) DEFAULT 'Medium', -- 'High' | 'Medium' | 'Normal'
  assigned_date DATE DEFAULT CURRENT_DATE,
  due_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(30) DEFAULT 'Assigned', -- 'Assigned' | 'Submitted' | 'Approved' | 'Revision'
  submission_notes TEXT,
  submission_link TEXT,
  rolled_over BOOLEAN DEFAULT FALSE,
  rolled_over_from_date DATE,
  admin_review_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Advance Leave Applications Table
CREATE TABLE IF NOT EXISTS snas_leaves (
  id VARCHAR(50) PRIMARY KEY,
  staff_id VARCHAR(50) REFERENCES snas_staff(id) ON DELETE CASCADE,
  staff_name VARCHAR(150),
  apply_date DATE DEFAULT CURRENT_DATE,
  leave_date DATE NOT NULL,
  leave_type VARCHAR(50) DEFAULT 'Casual Leave',
  reason TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'Pending', -- 'Pending' | 'Approved' | 'Rejected'
  admin_remarks TEXT,
  notified_via_whatsapp BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS) & Public Anonymous Policies for Studio Portal
ALTER TABLE snas_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE snas_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE snas_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE snas_leaves ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to staff" ON snas_staff;
DROP POLICY IF EXISTS "Allow public read/write to attendance" ON snas_attendance;
DROP POLICY IF EXISTS "Allow public read/write to tasks" ON snas_tasks;
DROP POLICY IF EXISTS "Allow public read/write to leaves" ON snas_leaves;

CREATE POLICY "Allow public read access to staff" ON snas_staff FOR ALL USING (true);
CREATE POLICY "Allow public read/write to attendance" ON snas_attendance FOR ALL USING (true);
CREATE POLICY "Allow public read/write to tasks" ON snas_tasks FOR ALL USING (true);
CREATE POLICY "Allow public read/write to leaves" ON snas_leaves FOR ALL USING (true);

-- 6. Seed Default Initial Staff Accounts
INSERT INTO snas_staff (id, username, password, name, role, department, phone, base_salary, joined_date)
VALUES 
  ('STAFF-CAM01', 'cam01', 'cam123', 'Vignesh K.', 'Chief Cinematographer & Drone Op', 'Production & Video Team', '9840123456', 35000, '2025-03-15'),
  ('STAFF-MKT01', 'mkt01', 'mkt123', 'Pooja Raghavan', 'Lead Performance & SEO Strategist', 'Growth Marketing', '9840234567', 38000, '2025-04-01'),
  ('STAFF-DEV01', 'dev01', 'dev123', 'Dinesh Manickam', 'Principal Full-Stack & SaaS Engineer', 'Software Engineering', '9840345678', 45000, '2025-03-20')
ON CONFLICT (id) DO NOTHING;

-- 7. Monthly Auto-Purge Procedure (Deletes attendance logs older than 30 days)
CREATE OR REPLACE FUNCTION purge_old_attendance_logs()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM snas_attendance WHERE created_at < NOW() - INTERVAL '30 days';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;
