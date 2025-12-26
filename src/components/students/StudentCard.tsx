import { Mail, Phone, MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  email: string;
  phone: string;
  department: string;
  attendance: number;
  activities: number;
  avatar: string;
}

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const isHighPerformer = student.attendance >= 85 && student.activities >= 80;
  const trend = student.attendance >= 85 ? "up" : "down";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      {/* Performance Indicator */}
      {isHighPerformer && (
        <div className="absolute -right-8 -top-8 h-16 w-16 rotate-45 bg-success/20" />
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-lg font-semibold text-primary-foreground shadow-lg">
              {student.avatar}
            </div>
            <div
              className={cn(
                "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card",
                isHighPerformer ? "bg-success" : "bg-warning"
              )}
            />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              {student.name}
            </h3>
            <p className="text-sm font-mono text-muted-foreground">{student.rollNo}</p>
            <p className="text-xs text-muted-foreground">{student.department}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Contact Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span className="truncate">{student.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{student.phone}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Attendance</span>
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-success" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
          </div>
          <p className={cn(
            "text-xl font-bold",
            student.attendance >= 85 ? "text-success" : student.attendance >= 70 ? "text-warning" : "text-destructive"
          )}>
            {student.attendance}%
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <span className="text-xs text-muted-foreground">Activities</span>
          <p className={cn(
            "text-xl font-bold",
            student.activities >= 80 ? "text-success" : student.activities >= 60 ? "text-warning" : "text-destructive"
          )}>
            {student.activities}%
          </p>
        </div>
      </div>
    </div>
  );
}
