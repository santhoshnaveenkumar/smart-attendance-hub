import { Calendar, Users, Trash2, FileText, Beaker, Presentation, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, useDeleteActivity, useUpdateActivity } from "@/hooks/useActivities";
import { format } from "date-fns";

interface ActivityCardProps {
  activity: Activity;
}

const activityIcons = {
  assignment: FileText,
  quiz: CheckSquare,
  lab: Beaker,
  seminar: Presentation,
  project: Users,
};

const activityColors = {
  assignment: "bg-primary/10 text-primary",
  quiz: "bg-warning/10 text-warning",
  lab: "bg-success/10 text-success",
  seminar: "bg-accent/10 text-accent",
  project: "bg-destructive/10 text-destructive",
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const Icon = activityIcons[activity.type];
  const deleteActivity = useDeleteActivity();
  const updateActivity = useUpdateActivity();

  const handleDelete = () => {
    if (confirm(`Delete "${activity.title}"?`)) {
      deleteActivity.mutate(activity.id);
    }
  };

  const handleComplete = () => {
    updateActivity.mutate({
      id: activity.id,
      status: activity.status === "completed" ? "active" : "completed",
    });
  };

  const getStatusDisplay = () => {
    if (activity.status === "completed") return "completed";
    if (activity.status === "cancelled") return "cancelled";
    
    if (activity.due_date) {
      const dueDate = new Date(activity.due_date);
      const now = new Date();
      if (dueDate < now) return "completed";
      if (dueDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) return "ongoing";
    }
    return "upcoming";
  };

  const status = getStatusDisplay();

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
            <p className="text-sm text-muted-foreground capitalize">{activity.type}</p>
          </div>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            status === "ongoing" && "bg-primary/10 text-primary",
            status === "completed" && "bg-success/10 text-success",
            status === "upcoming" && "bg-muted text-muted-foreground",
            status === "cancelled" && "bg-destructive/10 text-destructive"
          )}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Description */}
      {activity.description && (
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {activity.description}
        </p>
      )}

      {/* Stats */}
      <div className="mt-6 flex items-center gap-6">
        {activity.due_date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(activity.due_date), "MMM dd, yyyy")}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Max: {activity.max_score} pts</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Status</span>
          <span className="font-medium text-foreground capitalize">{activity.status}</span>
        </div>
        <Progress value={activity.status === "completed" ? 100 : activity.status === "active" ? 50 : 0} className="h-2" />
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleComplete}
        >
          {activity.status === "completed" ? "Reopen" : "Mark Complete"}
        </Button>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={handleDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
