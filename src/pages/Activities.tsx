import { useState } from "react";
import { Plus, Filter, Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { cn } from "@/lib/utils";

const activitiesData = [
  { id: 1, title: "Assignment #3", type: "assignment" as const, subject: "Database Systems", dueDate: "Dec 28, 2024", totalStudents: 45, completedStudents: 32, status: "ongoing" as const },
  { id: 2, title: "Quiz #2", type: "quiz" as const, subject: "Data Structures", dueDate: "Dec 26, 2024", totalStudents: 45, completedStudents: 45, status: "completed" as const },
  { id: 3, title: "Lab Session 5", type: "lab" as const, subject: "Computer Networks", dueDate: "Dec 30, 2024", totalStudents: 40, completedStudents: 15, status: "ongoing" as const },
  { id: 4, title: "Technical Seminar", type: "seminar" as const, subject: "AI & Machine Learning", dueDate: "Jan 5, 2025", totalStudents: 120, completedStudents: 0, status: "upcoming" as const },
  { id: 5, title: "Final Project", type: "project" as const, subject: "Software Engineering", dueDate: "Jan 15, 2025", totalStudents: 45, completedStudents: 12, status: "ongoing" as const },
  { id: 6, title: "Mid-term Quiz", type: "quiz" as const, subject: "Operating Systems", dueDate: "Dec 24, 2024", totalStudents: 42, completedStudents: 42, status: "completed" as const },
];

const filterOptions = ["All", "Assignments", "Quizzes", "Labs", "Seminars", "Projects"];

export default function Activities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredActivities = activitiesData.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "All") return matchesSearch;
    
    const typeMap: Record<string, string> = {
      "Assignments": "assignment",
      "Quizzes": "quiz",
      "Labs": "lab",
      "Seminars": "seminar",
      "Projects": "project",
    };
    
    return matchesSearch && activity.type === typeMap[activeFilter];
  });

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
        <Button className="gap-2 w-full lg:w-auto">
          <Plus className="h-4 w-4" />
          Create Activity
        </Button>
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

      {/* Activities Grid */}
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

      {filteredActivities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            No activities found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
