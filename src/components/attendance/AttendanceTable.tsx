import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAttendance } from "@/hooks/useAttendance";
import { useStudents } from "@/hooks/useStudents";

export function AttendanceTable() {
  const { data: attendance, isLoading: attendanceLoading } = useAttendance();
  const { data: students, isLoading: studentsLoading } = useStudents();

  const isLoading = attendanceLoading || studentsLoading;

  // Combine students with their attendance records
  const tableData = students?.map((student) => {
    const record = attendance?.find((a) => a.student_id === student.id);
    return {
      id: student.id,
      name: student.name,
      rollNo: student.student_id,
      status: record?.status || "absent",
      time: record?.time
        ? new Date(`2000-01-01T${record.time}`).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
      method: record?.method || "-",
    };
  }) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Student
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Roll No
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Method
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tableData.map((student, index) => (
              <tr
                key={student.id}
                className="transition-colors hover:bg-muted/20 animate-slide-up"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-medium text-primary-foreground">
                      {student.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="font-medium text-foreground">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-muted-foreground">{student.rollNo}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                      student.status === "present" && "bg-success/10 text-success",
                      student.status === "absent" && "bg-destructive/10 text-destructive",
                      student.status === "late" && "bg-warning/10 text-warning"
                    )}
                  >
                    {student.status === "present" && <CheckCircle2 className="h-3 w-3" />}
                    {student.status === "absent" && <XCircle className="h-3 w-3" />}
                    {student.status === "late" && <Clock className="h-3 w-3" />}
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{student.time}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{student.method}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {tableData.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          No students found. Add students first.
        </div>
      )}
    </div>
  );
}
