-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  student_id TEXT NOT NULL UNIQUE,
  email TEXT,
  department TEXT NOT NULL,
  year TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  time TIME NOT NULL DEFAULT CURRENT_TIME,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  method TEXT DEFAULT 'manual',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, date)
);

-- Create activities table
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('assignment', 'quiz', 'lab', 'seminar', 'project')),
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  max_score INTEGER DEFAULT 100,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student_activities for tracking completion
CREATE TABLE public.student_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  score INTEGER,
  submitted_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'graded')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, activity_id)
);

-- Enable RLS on all tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_activities ENABLE ROW LEVEL SECURITY;

-- Create public read policies (for demo - no auth required)
CREATE POLICY "Allow public read students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public insert students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update students" ON public.students FOR UPDATE USING (true);
CREATE POLICY "Allow public delete students" ON public.students FOR DELETE USING (true);

CREATE POLICY "Allow public read attendance" ON public.attendance FOR SELECT USING (true);
CREATE POLICY "Allow public insert attendance" ON public.attendance FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update attendance" ON public.attendance FOR UPDATE USING (true);
CREATE POLICY "Allow public delete attendance" ON public.attendance FOR DELETE USING (true);

CREATE POLICY "Allow public read activities" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Allow public insert activities" ON public.activities FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update activities" ON public.activities FOR UPDATE USING (true);
CREATE POLICY "Allow public delete activities" ON public.activities FOR DELETE USING (true);

CREATE POLICY "Allow public read student_activities" ON public.student_activities FOR SELECT USING (true);
CREATE POLICY "Allow public insert student_activities" ON public.student_activities FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update student_activities" ON public.student_activities FOR UPDATE USING (true);
CREATE POLICY "Allow public delete student_activities" ON public.student_activities FOR DELETE USING (true);

-- Insert sample students
INSERT INTO public.students (name, student_id, email, department, year) VALUES
  ('Alice Johnson', 'STU001', 'alice@edu.com', 'Computer Science', '3rd Year'),
  ('Bob Smith', 'STU002', 'bob@edu.com', 'Computer Science', '2nd Year'),
  ('Charlie Brown', 'STU003', 'charlie@edu.com', 'Electronics', '3rd Year'),
  ('Diana Ross', 'STU004', 'diana@edu.com', 'Mechanical', '4th Year'),
  ('Edward Lee', 'STU005', 'edward@edu.com', 'Computer Science', '1st Year');

-- Insert sample activities
INSERT INTO public.activities (title, type, description, due_date, max_score) VALUES
  ('Python Assignment 1', 'assignment', 'Basic Python programming concepts', now() + interval '7 days', 100),
  ('Database Quiz', 'quiz', 'SQL and database fundamentals', now() + interval '3 days', 50),
  ('Machine Learning Lab', 'lab', 'Hands-on ML exercises', now() + interval '14 days', 100),
  ('Project Presentation', 'project', 'Final project presentation', now() + interval '30 days', 200);