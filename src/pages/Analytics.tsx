import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Users, BookOpen, Clock, Award } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const monthlyAttendance = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 87 },
  { month: "Jun", attendance: 94 },
  { month: "Jul", attendance: 89 },
  { month: "Aug", attendance: 93 },
  { month: "Sep", attendance: 96 },
  { month: "Oct", attendance: 90 },
  { month: "Nov", attendance: 92 },
  { month: "Dec", attendance: 91 },
];

const departmentData = [
  { name: "Computer Science", students: 450, attendance: 94 },
  { name: "Electronics", students: 380, attendance: 89 },
  { name: "Mechanical", students: 320, attendance: 87 },
  { name: "Civil", students: 280, attendance: 91 },
  { name: "Chemical", students: 220, attendance: 88 },
];

const activityCompletion = [
  { name: "Assignments", value: 85, color: "hsl(226 70% 50%)" },
  { name: "Quizzes", value: 92, color: "hsl(38 92% 50%)" },
  { name: "Labs", value: 78, color: "hsl(152 69% 40%)" },
  { name: "Projects", value: 65, color: "hsl(172 66% 40%)" },
];

const performanceTrend = [
  { week: "W1", score: 72 },
  { week: "W2", score: 75 },
  { week: "W3", score: 78 },
  { week: "W4", score: 74 },
  { week: "W5", score: 82 },
  { week: "W6", score: 85 },
  { week: "W7", score: 88 },
  { week: "W8", score: 86 },
];

const metrics = [
  { title: "Overall Attendance", value: "91.2%", change: "+2.4%", trend: "up", icon: Users },
  { title: "Activity Completion", value: "84.6%", change: "+5.1%", trend: "up", icon: BookOpen },
  { title: "Avg. Class Duration", value: "1h 24m", change: "-3m", trend: "down", icon: Clock },
  { title: "Top Performer Score", value: "98.5%", change: "+1.2%", trend: "up", icon: Award },
];

export default function Analytics() {
  return (
    <DashboardLayout
      title="Analytics & Reports"
      subtitle="Comprehensive insights and performance metrics"
    >
      {/* Metrics Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.title}
            className="rounded-xl border border-border bg-card p-5 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <metric.icon className="h-5 w-5 text-primary" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                metric.trend === "up" ? "text-success" : "text-destructive"
              )}>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Attendance */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-6 font-display text-lg font-semibold text-foreground">
            Monthly Attendance Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  className="text-xs fill-muted-foreground"
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  className="text-xs fill-muted-foreground"
                  domain={[80, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                  }}
                />
                <Bar 
                  dataKey="attendance" 
                  fill="hsl(226 70% 50%)" 
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-6 font-display text-lg font-semibold text-foreground">
            Weekly Performance Score
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false}
                  className="text-xs fill-muted-foreground"
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  className="text-xs fill-muted-foreground"
                  domain={[60, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(172 66% 40%)" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(172 66% 40%)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Completion */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-6 font-display text-lg font-semibold text-foreground">
            Activity Completion Rate
          </h3>
          <div className="flex items-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityCompletion}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {activityCompletion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {activityCompletion.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="ml-auto font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Stats */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-6 font-display text-lg font-semibold text-foreground">
            Department Overview
          </h3>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div 
                key={dept.name} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-foreground">{dept.name}</span>
                  <span className="text-muted-foreground">{dept.students} students</span>
                </div>
                <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full rounded-full gradient-primary transition-all duration-500"
                    style={{ width: `${dept.attendance}%` }}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-muted-foreground">{dept.attendance}% attendance</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
