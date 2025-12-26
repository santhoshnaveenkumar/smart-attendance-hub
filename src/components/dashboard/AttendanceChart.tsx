import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", present: 85, absent: 15 },
  { day: "Tue", present: 92, absent: 8 },
  { day: "Wed", present: 88, absent: 12 },
  { day: "Thu", present: 95, absent: 5 },
  { day: "Fri", present: 78, absent: 22 },
  { day: "Sat", present: 45, absent: 55 },
  { day: "Sun", present: 0, absent: 0 },
];

export function AttendanceChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Weekly Attendance
          </h3>
          <p className="text-sm text-muted-foreground">
            Attendance trends for the current week
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive/50" />
            <span className="text-sm text-muted-foreground">Absent</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(226 70% 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(226 70% 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              className="text-xs fill-muted-foreground"
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              className="text-xs fill-muted-foreground"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                boxShadow: "var(--shadow-lg)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Area
              type="monotone"
              dataKey="present"
              stroke="hsl(226 70% 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPresent)"
            />
            <Area
              type="monotone"
              dataKey="absent"
              stroke="hsl(0 84% 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAbsent)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
