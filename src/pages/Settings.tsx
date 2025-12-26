import { useState } from "react";
import { User, Bell, Shield, Database, Camera, Save } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "camera", label: "Camera Settings", icon: Camera },
  { id: "database", label: "Database", icon: Database },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your preferences and configurations"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <nav className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <section.icon className="h-5 w-5" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeSection === "profile" && (
            <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                Profile Settings
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground shadow-lg">
                    DR
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <Input defaultValue="Dr. Robert" className="mt-1.5" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input defaultValue="Smith" className="mt-1.5" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input defaultValue="robert.smith@university.edu" className="mt-1.5" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">Department</label>
                    <Input defaultValue="Computer Science" className="mt-1.5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                Notification Preferences
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Email notifications", description: "Receive email alerts for important events" },
                  { label: "Attendance alerts", description: "Get notified when attendance drops below threshold" },
                  { label: "Activity reminders", description: "Reminders for upcoming activities and deadlines" },
                  { label: "System updates", description: "Notifications about system updates and maintenance" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                Security Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground">Current Password</label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">New Password</label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                  <div>
                    <p className="font-medium text-foreground">Two-factor authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          )}

          {activeSection === "camera" && (
            <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                Camera & Recognition Settings
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                  <div>
                    <p className="font-medium text-foreground">High-resolution capture</p>
                    <p className="text-sm text-muted-foreground">Use higher quality for better recognition</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                  <div>
                    <p className="font-medium text-foreground">Auto-capture mode</p>
                    <p className="text-sm text-muted-foreground">Automatically capture when face is detected</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Recognition Confidence Threshold</label>
                  <Input type="number" defaultValue="85" min="50" max="100" className="mt-1.5 w-32" />
                  <p className="mt-1 text-xs text-muted-foreground">Minimum confidence level (50-100%)</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "database" && (
            <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                Database Configuration
              </h3>
              <div className="space-y-6">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Database Status</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    <span className="font-medium text-success">Connected</span>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">Host</label>
                    <Input defaultValue="localhost" className="mt-1.5" disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Port</label>
                    <Input defaultValue="5432" className="mt-1.5" disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Database Name</label>
                    <Input defaultValue="edutrack_db" className="mt-1.5" disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Records</label>
                    <Input defaultValue="12,847" className="mt-1.5" disabled />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Backup Data</Button>
                  <Button variant="outline">Export Reports</Button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
