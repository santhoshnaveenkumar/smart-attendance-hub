import { useState } from "react";
import { Search, Filter, Grid3X3, List, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentCard } from "@/components/students/StudentCard";
import { AddStudentDialog } from "@/components/dialogs/AddStudentDialog";
import { useStudents } from "@/hooks/useStudents";
import { cn } from "@/lib/utils";

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { data: students, isLoading, error } = useStudents();

  const filteredStudents = students?.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <DashboardLayout title="Students" subtitle="Manage student enrollments and records">
      {/* Actions Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or student ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-border bg-muted/30 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-md p-2 transition-colors",
                viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded-md p-2 transition-colors",
                viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <AddStudentDialog />
        </div>
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
          <p className="text-destructive">Failed to load students</p>
        </div>
      )}

      {/* Students Grid */}
      {!isLoading && !error && (
        <div className={cn(
          "grid gap-6",
          viewMode === "grid" 
            ? "sm:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        )}>
          {filteredStudents.map((student, index) => (
            <div
              key={student.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <StudentCard student={student} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && filteredStudents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            No students found
          </h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? "Try adjusting your search query" : "Add your first student to get started"}
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
