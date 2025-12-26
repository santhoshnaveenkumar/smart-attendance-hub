import { Clock, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "attendance",
    status: "present",
    student: "John Smith",
    time: "2 mins ago",
    subject: "Computer Science",
  },
  {
    id: 2,
    type: "attendance",
    status: "present",
    student: "Emma Wilson",
    time: "5 mins ago",
    subject: "Computer Science",
  },
  {
    id: 3,
    type: "activity",
    status: "completed",
    student: "Michael Brown",
    time: "10 mins ago",
    subject: "Assignment #3",
  },
  {
    id: 4,
    type: "attendance",
    status: "absent",
    student: "Sarah Davis",
    time: "15 mins ago",
    subject: "Computer Science",
  },
  {
    id: 5,
    type: "activity",
    status: "completed",
    student: "James Johnson",
    time: "20 mins ago",
    subject: "Quiz #2",
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Recent Activity
          </h3>
          <p className="text-sm text-muted-foreground">
            Latest attendance and activity updates
          </p>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                activity.type === "attendance" && activity.status === "present" && "bg-success/10",
                activity.type === "attendance" && activity.status === "absent" && "bg-destructive/10",
                activity.type === "activity" && "bg-primary/10"
              )}
            >
              {activity.type === "attendance" && activity.status === "present" && (
                <CheckCircle2 className="h-5 w-5 text-success" />
              )}
              {activity.type === "attendance" && activity.status === "absent" && (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
              {activity.type === "activity" && (
                <BookOpen className="h-5 w-5 text-primary" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {activity.student}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {activity.type === "attendance" 
                  ? `Marked ${activity.status} - ${activity.subject}`
                  : `Completed ${activity.subject}`
                }
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
