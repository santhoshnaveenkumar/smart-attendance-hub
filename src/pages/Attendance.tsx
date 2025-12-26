import { useState } from "react";
import { Calendar, Download, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { FaceScanner } from "@/components/attendance/FaceScanner";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { toast } from "@/hooks/use-toast";

export default function Attendance() {
  const [showScanner, setShowScanner] = useState(true);

  const handleScanComplete = (success: boolean, studentName?: string) => {
    if (success && studentName) {
      toast({
        title: "Attendance Marked",
        description: `${studentName} has been marked present.`,
      });
    } else {
      toast({
        title: "Recognition Failed",
        description: "Please try again or contact the administrator.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout
      title="Attendance"
      subtitle="Face recognition based attendance tracking"
    >
      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <span className="text-lg font-bold text-success">86%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Present Today</p>
              <p className="text-xs text-muted-foreground">1,082 / 1,248 students</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <span className="text-lg font-bold text-warning">24</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Late Arrivals</p>
              <p className="text-xs text-muted-foreground">After 9:30 AM</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <span className="text-lg font-bold text-destructive">142</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Absent</p>
              <p className="text-xs text-muted-foreground">Not marked yet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Face Scanner */}
        <div className="lg:col-span-1">
          <FaceScanner onScanComplete={handleScanComplete} />
        </div>

        {/* Today's Summary */}
        <div className="lg:col-span-1 rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Session Details
              </h3>
              <p className="text-sm text-muted-foreground">
                Computer Science - CS301
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <Calendar className="h-4 w-4" />
              Live Session
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
              <span className="text-sm text-muted-foreground">Subject</span>
              <span className="font-medium text-foreground">Database Systems</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
              <span className="text-sm text-muted-foreground">Faculty</span>
              <span className="font-medium text-foreground">Dr. Robert Smith</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
              <span className="text-sm text-muted-foreground">Time Slot</span>
              <span className="font-medium text-foreground">09:00 AM - 10:30 AM</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
              <span className="text-sm text-muted-foreground">Room</span>
              <span className="font-medium text-foreground">Lab 301-B</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="outline" className="flex-1 gap-2">
              <Filter className="h-4 w-4" />
              Manual Entry
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Today's Attendance Record
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last updated: Just now</span>
          </div>
        </div>
        <AttendanceTable />
      </div>
    </DashboardLayout>
  );
}
