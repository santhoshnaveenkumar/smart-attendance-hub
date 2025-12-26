import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const attendanceData = [
  { id: 1, name: "Emma Wilson", rollNo: "CS2024001", status: "present", time: "09:05 AM", method: "Face Recognition" },
  { id: 2, name: "John Smith", rollNo: "CS2024002", status: "present", time: "09:08 AM", method: "Face Recognition" },
  { id: 3, name: "Michael Brown", rollNo: "CS2024003", status: "present", time: "09:12 AM", method: "Face Recognition" },
  { id: 4, name: "Sarah Davis", rollNo: "CS2024004", status: "absent", time: "-", method: "-" },
  { id: 5, name: "James Johnson", rollNo: "CS2024005", status: "present", time: "09:15 AM", method: "Face Recognition" },
  { id: 6, name: "Emily Chen", rollNo: "CS2024006", status: "late", time: "09:35 AM", method: "Face Recognition" },
  { id: 7, name: "David Lee", rollNo: "CS2024007", status: "present", time: "09:02 AM", method: "Face Recognition" },
  { id: 8, name: "Anna Martinez", rollNo: "CS2024008", status: "absent", time: "-", method: "-" },
];

export function AttendanceTable() {
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
            {attendanceData.map((student, index) => (
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
    </div>
  );
}
