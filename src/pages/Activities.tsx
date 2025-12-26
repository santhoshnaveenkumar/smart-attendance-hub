import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { AddActivityDialog } from "@/components/dialogs/AddActivityDialog";
import { useActivities } from "@/hooks/useActivities";
import { cn } from "@/lib/utils";

const filterOptions = ["All", "Assignments", "Quizzes", "Labs", "Seminars", "Projects"];

export default function Activities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const { data: activities, isLoading, error } = useActivities();

  const filteredActivities = activities?.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (activity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    if (activeFilter === "All") return matchesSearch;
    
    const typeMap: Record<string, string> = {
      "Assignments": "assignment",
      "Quizzes": "quiz",
      "Labs": "lab",
      "Seminars": "seminar",
      "Projects": "project",
    };
    
    return matchesSearch && activity.type === typeMap[activeFilter];
  }) || [];

  return (
    <DashboardLayout
      title="Curriculum Activities"
      subtitle="Manage and track academic activities"
    >
      {/* Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <AddActivityDialog />
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeFilter === filter
                ? "gradient-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-destructive">Failed to load activities</p>
        </div>
      )}

      {/* Activities Grid */}
      {!isLoading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && filteredActivities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            No activities found
          </h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery || activeFilter !== "All" 
              ? "Try adjusting your filters or search query" 
              : "Create your first activity to get started"}
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
