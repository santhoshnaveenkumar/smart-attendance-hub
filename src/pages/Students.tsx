import { useState } from "react";
import { Search, Plus, Filter, Grid3X3, List } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentCard } from "@/components/students/StudentCard";
import { cn } from "@/lib/utils";

const studentsData = [
  { id: 1, name: "Emma Wilson", rollNo: "CS2024001", email: "emma.w@university.edu", phone: "+1 234-567-8901", department: "Computer Science", attendance: 98, activities: 95, avatar: "EW" },
  { id: 2, name: "John Smith", rollNo: "CS2024002", email: "john.s@university.edu", phone: "+1 234-567-8902", department: "Computer Science", attendance: 92, activities: 88, avatar: "JS" },
  { id: 3, name: "Michael Brown", rollNo: "CS2024003", email: "michael.b@university.edu", phone: "+1 234-567-8903", department: "Computer Science", attendance: 85, activities: 90, avatar: "MB" },
  { id: 4, name: "Sarah Davis", rollNo: "CS2024004", email: "sarah.d@university.edu", phone: "+1 234-567-8904", department: "Computer Science", attendance: 78, activities: 75, avatar: "SD" },
  { id: 5, name: "James Johnson", rollNo: "CS2024005", email: "james.j@university.edu", phone: "+1 234-567-8905", department: "Computer Science", attendance: 95, activities: 92, avatar: "JJ" },
  { id: 6, name: "Emily Chen", rollNo: "CS2024006", email: "emily.c@university.edu", phone: "+1 234-567-8906", department: "Computer Science", attendance: 88, activities: 85, avatar: "EC" },
  { id: 7, name: "David Lee", rollNo: "CS2024007", email: "david.l@university.edu", phone: "+1 234-567-8907", department: "Computer Science", attendance: 90, activities: 88, avatar: "DL" },
  { id: 8, name: "Anna Martinez", rollNo: "CS2024008", email: "anna.m@university.edu", phone: "+1 234-567-8908", department: "Computer Science", attendance: 72, activities: 68, avatar: "AM" },
  { id: 9, name: "Chris Taylor", rollNo: "CS2024009", email: "chris.t@university.edu", phone: "+1 234-567-8909", department: "Computer Science", attendance: 94, activities: 91, avatar: "CT" },
];

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredStudents = studentsData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Students" subtitle="Manage student enrollments and records">
      {/* Actions Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or roll number..."
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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Students Grid */}
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

      {filteredStudents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            No students found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search query
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
