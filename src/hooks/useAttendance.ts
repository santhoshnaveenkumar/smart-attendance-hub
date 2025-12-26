import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface AttendanceRecord {
  id: string;
  student_id: string;
  date: string;
  time: string;
  status: "present" | "absent" | "late";
  method: string | null;
  created_at: string;
  students?: {
    name: string;
    student_id: string;
  };
}

export function useAttendance(date?: string) {
  const today = date || new Date().toISOString().split("T")[0];
  
  return useQuery({
    queryKey: ["attendance", today],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select(`
          *,
          students (
            name,
            student_id
          )
        `)
        .eq("date", today)
        .order("time", { ascending: true });

      if (error) throw error;
      return data as AttendanceRecord[];
    },
  });
}

export function useMarkAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      student_id,
      status,
      method = "Face Recognition",
    }: {
      student_id: string;
      status: "present" | "absent" | "late";
      method?: string;
    }) => {
      const today = new Date().toISOString().split("T")[0];
      const now = new Date().toTimeString().split(" ")[0];

      const { data, error } = await supabase
        .from("attendance")
        .upsert(
          {
            student_id,
            date: today,
            time: now,
            status,
            method,
          },
          { onConflict: "student_id,date" }
        )
        .select(`
          *,
          students (
            name,
            student_id
          )
        `)
        .single();

      if (error) throw error;
      return data as AttendanceRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      queryClient.invalidateQueries({ queryKey: ["attendance-stats"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useAttendanceStats() {
  const today = new Date().toISOString().split("T")[0];
  
  return useQuery({
    queryKey: ["attendance-stats", today],
    queryFn: async () => {
      const [studentsResult, attendanceResult] = await Promise.all([
        supabase.from("students").select("id", { count: "exact" }),
        supabase.from("attendance").select("status").eq("date", today),
      ]);

      if (studentsResult.error) throw studentsResult.error;
      if (attendanceResult.error) throw attendanceResult.error;

      const totalStudents = studentsResult.count || 0;
      const attendance = attendanceResult.data || [];
      const present = attendance.filter((a) => a.status === "present").length;
      const late = attendance.filter((a) => a.status === "late").length;
      const absent = totalStudents - present - late;

      return {
        totalStudents,
        present,
        late,
        absent,
        percentage: totalStudents > 0 ? Math.round(((present + late) / totalStudents) * 100) : 0,
      };
    },
  });
}
