import { Users, UserCheck, BookOpen, TrendingUp, Calendar } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TopStudents } from "@/components/dashboard/TopStudents";
import { useStudents } from "@/hooks/useStudents";
import { useActivities } from "@/hooks/useActivities";
import { useAttendanceStats } from "@/hooks/useAttendance";

const Index = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { data: students } = useStudents();
  const { data: activities } = useActivities();
  const { data: stats } = useAttendanceStats();

  const totalStudents = students?.length || 0;
  const activeActivities = activities?.filter(a => a.status === "active").length || 0;
  const presentToday = stats?.present || 0;
  const attendancePercentage = stats?.percentage || 0;

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={today}
    >
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Students"
          value={totalStudents.toString()}
          change="+12%"
          changeType="positive"
          icon={Users}
          gradient
        />
        <StatCard
          title="Present Today"
          value={presentToday.toString()}
          change={`${attendancePercentage}%`}
          changeType="positive"
          icon={UserCheck}
        />
        <StatCard
          title="Active Activities"
          value={activeActivities.toString()}
          change={`${activeActivities} ongoing`}
          changeType="neutral"
          icon={BookOpen}
        />
        <StatCard
          title="Avg. Attendance"
          value={`${attendancePercentage}%`}
          change="+2.4%"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>

        {/* Top Students */}
        <div className="lg:col-span-1">
          <TopStudents />
        </div>

        {/* Recent Activity - Takes full width */}
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-xl gradient-primary p-6 text-primary-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold">Ready to take attendance?</h3>
            <p className="text-primary-foreground/80">
              Start a face recognition session for quick and accurate attendance tracking.
            </p>
          </div>
          <a
            href="/attendance"
            className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-6 py-3 font-medium text-primary-foreground backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105"
          >
            <Calendar className="h-5 w-5" />
            Start Session
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
