import { Trophy, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const students = [
  { rank: 1, name: "Emma Wilson", attendance: 98, activities: 95, avatar: "EW" },
  { rank: 2, name: "John Smith", attendance: 96, activities: 92, avatar: "JS" },
  { rank: 3, name: "Michael Brown", attendance: 94, activities: 90, avatar: "MB" },
  { rank: 4, name: "Sarah Davis", attendance: 92, activities: 88, avatar: "SD" },
  { rank: 5, name: "James Johnson", attendance: 90, activities: 85, avatar: "JJ" },
];

export function TopStudents() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
            <Trophy className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Top Performers
            </h3>
            <p className="text-sm text-muted-foreground">
              Based on attendance & activities
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {students.map((student, index) => (
          <div
            key={student.rank}
            className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                student.rank === 1 && "bg-warning/20 text-warning",
                student.rank === 2 && "bg-muted text-muted-foreground",
                student.rank === 3 && "bg-warning/10 text-warning/70",
                student.rank > 3 && "bg-muted text-muted-foreground"
              )}
            >
              {student.rank}
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary text-sm font-medium text-primary-foreground">
              {student.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {student.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{student.attendance}% attendance</span>
                <span>•</span>
                <span>{student.activities}% activities</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-success opacity-0 transition-opacity group-hover:opacity-100">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
