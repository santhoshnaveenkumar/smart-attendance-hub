import { Calendar, Users, Clock, FileText, Beaker, Presentation, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type ActivityType = "assignment" | "quiz" | "lab" | "seminar" | "project";

interface Activity {
  id: number;
  title: string;
  type: ActivityType;
  subject: string;
  dueDate: string;
  totalStudents: number;
  completedStudents: number;
  status: "ongoing" | "completed" | "upcoming";
}

interface ActivityCardProps {
  activity: Activity;
}

const activityIcons: Record<ActivityType, typeof FileText> = {
  assignment: FileText,
  quiz: CheckSquare,
  lab: Beaker,
  seminar: Presentation,
  project: Users,
};

const activityColors: Record<ActivityType, string> = {
  assignment: "bg-primary/10 text-primary",
  quiz: "bg-warning/10 text-warning",
  lab: "bg-success/10 text-success",
  seminar: "bg-accent/10 text-accent",
  project: "bg-destructive/10 text-destructive",
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const Icon = activityIcons[activity.type];
  const progress = (activity.completedStudents / activity.totalStudents) * 100;

  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
            activityColors[activity.type]
          )}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              {activity.title}
            </h3>
            <p className="text-sm text-muted-foreground">{activity.subject}</p>
          </div>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            activity.status === "ongoing" && "bg-primary/10 text-primary",
            activity.status === "completed" && "bg-success/10 text-success",
            activity.status === "upcoming" && "bg-muted text-muted-foreground"
          )}
        >
          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
        </span>
      </div>

      {/* Stats */}
      <div className="mt-6 flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{activity.dueDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{activity.completedStudents}/{activity.totalStudents} completed</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Completion</span>
          <span className="font-medium text-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        <Button variant="outline" size="sm" className="flex-1">
          View Details
        </Button>
        <Button size="sm" className="flex-1">
          Manage
        </Button>
      </div>
    </div>
  );
}
