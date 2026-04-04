import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { MessageCircle, FileText, HelpCircle } from "lucide-react";

const devices = [
  { name: "FitTrack Pro A1", sync: "Apr 3, 2026", battery: "78%" },
  { name: "PulseBand 2", sync: "Mar 31, 2026", battery: "42%" },
  { name: "Maya's iPhone", sync: "Apr 2, 2026", battery: "56%" },
  { name: "Pixel 6", sync: "Apr 1, 2026", battery: "89%" },
];

export default function ProfileSettings() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Profile & Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account, preferences and connected devices</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-foreground text-card gap-2"><FileText className="w-4 h-4" /> Export Health Data</Button>
            <Button variant="outline" className="gap-2"><HelpCircle className="w-4 h-4" /> Help & Support</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Profile card */}
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" />
                <AvatarFallback>MT</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Maya Thompson</p>
                <p className="text-xs text-muted-foreground">maya.thompson@welltrack.com</p>
                <p className="text-xs text-muted-foreground">Pro subscriber</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {["Daily Medication Checklist", "Habit Streak Calendar", "Health Insights Summary", "Medication Details & Reminders", "Profile & Settings"].map((item) => (
                <div key={item} className="px-3 py-2 rounded-lg border border-border text-sm">{item}</div>
              ))}
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Member since: <strong>Feb 2021</strong></p>
              <p>Subscription: <strong>WellTrack Pro</strong> <span className="ml-1 px-2 py-0.5 rounded bg-secondary text-xs">Active</span></p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Quick Export</p>
                <p className="text-xs text-muted-foreground">Recent export: Apr 2, 2026</p>
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground">Export</Button>
            </div>
          </div>

          {/* Account */}
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Account</h3>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Manage account details and security</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Full name</label>
                <Input defaultValue="Maya Thompson" className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <Input defaultValue="maya.thompson@welltrack.com" className="mt-1" />
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Time Zone & Default Reminders</h3>
              <span className="text-xs text-muted-foreground">Device timezone: Pacific Time</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Set your timezone and default reminder windows</p>
            <div>
              <label className="text-xs text-muted-foreground">Time zone</label>
              <Input defaultValue="America/Los_Angeles (PDT)" className="mt-1" readOnly />
            </div>
            <p className="text-xs text-muted-foreground mt-3 mb-2">Default reminder windows</p>
            <div className="flex gap-2 text-xs">
              {["Morning (6am-10)", "Noon (12pm-)", "Evening (6pm-9)", "30 minutes before"].map((w) => (
                <div key={w} className="px-2 py-1 rounded border border-border bg-secondary text-muted-foreground">{w}</div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Notification Preferences</h3>
              <span className="text-xs text-muted-foreground">Last changed Apr 1, 2026</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Control push, sound and vibration alerts</p>
            <div className="space-y-3">
              {[
                { label: "Push Notifications", desc: "Receive reminders and updates" },
                { label: "Sound", desc: "Play notification sounds" },
                { label: "Vibration", desc: "Vibrate on reminders (mobile only)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
              <div>
                <p className="text-sm font-medium">Do Not Disturb</p>
                <p className="text-xs text-muted-foreground mb-2">Schedule a quiet window for reminders</p>
                <div className="flex items-center gap-2 text-sm">
                  <Input defaultValue="22:00" className="w-20" /> <span>to</span> <Input defaultValue="07:00" className="w-20" />
                  <span className="text-xs text-muted-foreground ml-2">Repeat: Every day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Theme</h3>
              <span className="text-xs text-muted-foreground">Preview</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Choose app appearance</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="border-2 border-foreground rounded-lg p-3 text-center">
                <div className="w-full h-16 bg-card rounded mb-2 border border-border" />
                <p className="text-sm font-medium">Light</p>
                <p className="text-xs text-muted-foreground">Default bright friendly interface</p>
              </div>
              <div className="border border-border rounded-lg p-3 text-center">
                <div className="w-full h-16 bg-foreground rounded mb-2" />
                <p className="text-sm font-medium">Dark</p>
                <p className="text-xs text-muted-foreground">Low-light friendly interface</p>
              </div>
            </div>
          </div>

          {/* Calendar Sync */}
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Calendar Sync</h3>
              <span className="text-xs text-muted-foreground">Connected accounts</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Keep reminders in your calendar</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Google Calendar</p>
                  <p className="text-xs text-muted-foreground">Synced as maya.thompson@gmail.com</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Refresh</Button>
                  <Button size="sm" className="bg-foreground text-card">Disconnect</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Apple Calendar</p>
                  <p className="text-xs text-muted-foreground">Not connected</p>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Privacy Options</h3>
              <span className="text-xs text-muted-foreground">Last reviewed Mar 28, 2026</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Control data sharing and security features</p>
            <div className="space-y-3">
              {[
                { label: "Share anonymized data", desc: "Help improve WellTrack features", checked: false },
                { label: "Allow analytics", desc: "Send usage stats", checked: true },
                { label: "Biometric unlock", desc: "Use fingerprint or face to open the app", checked: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Checkbox defaultChecked={item.checked} />
                </div>
              ))}
            </div>
          </div>

          {/* Connected Devices */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Connected Devices</h3>
                <p className="text-xs text-muted-foreground">Manage devices that sync with your account</p>
              </div>
              <span className="text-sm text-muted-foreground">{devices.length} devices</span>
            </div>
            <div className="space-y-3">
              {devices.map((d) => (
                <div key={d.name} className="flex items-center justify-between bg-secondary rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <p className="text-sm font-medium">{d.name}</p>
                      <p className="text-xs text-muted-foreground">Last sync: {d.sync} • Battery {d.battery}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Rename</Button>
                    <Button size="sm" className="bg-foreground text-card">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Data Export */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="font-semibold mb-1">Health Data Export</h3>
            <p className="text-xs text-muted-foreground mb-4">Download a zip with your metrics, meds and logs</p>
            <div className="flex gap-2 mb-3">
              <Button size="sm" className="bg-primary text-primary-foreground">Create Export</Button>
              <Button size="sm" variant="outline">View Exports</Button>
            </div>
            <p className="text-xs text-muted-foreground">Last export: Apr 2, 2026 • 12.4 MB</p>
          </div>

          {/* Help & Support */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="font-semibold mb-1">Help & Support</h3>
            <p className="text-xs text-muted-foreground mb-4">Quick access to guides, chat and support tickets</p>
            <div className="flex flex-col items-center gap-3">
              <FileText className="w-8 h-8 text-muted-foreground" />
              <Button variant="outline" className="w-full">Documentation & FAQs</Button>
              <Button className="w-full bg-foreground text-card gap-2"><MessageCircle className="w-4 h-4" /> Start Support Chat</Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="lg:col-span-3 bg-card rounded-lg border border-border p-5">
            <h3 className="font-semibold mb-1">Danger Zone</h3>
            <p className="text-xs text-muted-foreground mb-4">Actions below are irreversible and will require confirmation</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Reset progress data</p>
                  <p className="text-xs text-muted-foreground">Clear streaks, logs and habit progress. This does not delete your account.</p>
                </div>
                <Button variant="outline" size="sm">Reset</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Log out</p>
                  <p className="text-xs text-muted-foreground">Sign out of this device</p>
                </div>
                <Button variant="outline" size="sm">Log out</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
