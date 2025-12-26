import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: boolean;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  gradient = false 
}: StatCardProps) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
        gradient 
          ? "gradient-primary text-primary-foreground" 
          : "bg-card border border-border"
      )}
    >
      {/* Background decoration */}
      <div className={cn(
        "absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 transition-transform duration-300 group-hover:scale-150",
        gradient ? "bg-white" : "gradient-primary"
      )} />
      
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            gradient 
              ? "bg-white/20 backdrop-blur-sm" 
              : "bg-primary/10"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              gradient ? "text-primary-foreground" : "text-primary"
            )} />
          </div>
          {change && (
            <span className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              changeType === "positive" && "bg-success/20 text-success",
              changeType === "negative" && "bg-destructive/20 text-destructive",
              changeType === "neutral" && (gradient ? "bg-white/20" : "bg-muted"),
              gradient && "bg-white/20 text-primary-foreground"
            )}>
              {change}
            </span>
          )}
        </div>
        
        <div className="mt-4">
          <p className={cn(
            "text-sm font-medium",
            gradient ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <p className={cn(
            "mt-1 text-3xl font-bold tracking-tight",
            gradient ? "text-primary-foreground" : "text-foreground"
          )}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
