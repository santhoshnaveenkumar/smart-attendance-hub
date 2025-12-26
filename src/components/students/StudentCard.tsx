import { Mail, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Student, useDeleteStudent } from "@/hooks/useStudents";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const deleteStudent = useDeleteStudent();
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleDelete = () => {
    if (confirm(`Delete ${student.name}?`)) {
      deleteStudent.mutate(student.id);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-lg font-semibold text-primary-foreground shadow-lg">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card bg-success" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              {student.name}
            </h3>
            <p className="text-sm font-mono text-muted-foreground">{student.student_id}</p>
            <p className="text-xs text-muted-foreground">{student.department}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDelete} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Contact Info */}
      <div className="mt-4 space-y-2">
        {student.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{student.email}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {student.year}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <span className="text-xs text-muted-foreground">Department</span>
          <p className="text-sm font-medium text-foreground truncate">
            {student.department}
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <span className="text-xs text-muted-foreground">Year</span>
          <p className="text-sm font-medium text-foreground">
            {student.year}
          </p>
        </div>
      </div>
    </div>
  );
}
