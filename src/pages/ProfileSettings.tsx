import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { MessageCircle, FileText, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const initialDevices = [
  { name: "FitTrack Pro A1", sync: "Apr 3, 2026", battery: "78%" },
  { name: "PulseBand 2", sync: "Mar 31, 2026", battery: "42%" },
  { name: "Maya's iPhone", sync: "Apr 2, 2026", battery: "56%" },
  { name: "Pixel 6", sync: "Apr 1, 2026", battery: "89%" },
];

export default function ProfileSettings() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("Maya Thompson");
  const [email, setEmail] = useState("maya.thompson@welltrack.com");
  const [pushNotif, setPushNotif] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [dndFrom, setDndFrom] = useState("22:00");
  const [dndTo, setDndTo] = useState("07:00");
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");
  const [googleConnected, setGoogleConnected] = useState(true);
  const [appleConnected, setAppleConnected] = useState(false);
  const [shareData, setShareData] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [devices, setDevices] = useState(initialDevices);

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [newDeviceName, setNewDeviceName] = useState("");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleExportHealth = () => {
    setExportDialogOpen(true);
  };

  const confirmExport = () => {
    setExportDialogOpen(false);
    toast({ title: "Export started", description: "Your health data is being prepared. You'll be notified when ready." });
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      toast({ title: "Fill in both fields", variant: "destructive" });
      return;
    }
    setPasswordDialogOpen(false);
    toast({ title: "Password changed ✓" });
    setOldPassword("");
    setNewPassword("");
  };

  const handleReset = () => {
    setResetDialogOpen(false);
    toast({ title: "Progress data reset", description: "All streaks and logs have been cleared.", variant: "destructive" });
  };

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    toast({ title: "Logged out", description: "You have been signed out." });
  };

  const handleRenameDevice = (deviceName: string) => {
    setSelectedDevice(deviceName);
    setNewDeviceName(deviceName);
    setRenameDialogOpen(true);
  };

  const confirmRename = () => {
    setDevices((prev) => prev.map((d) => d.name === selectedDevice ? { ...d, name: newDeviceName } : d));
    setRenameDialogOpen(false);
    toast({ title: "Device renamed", description: `${selectedDevice} → ${newDeviceName}` });
  };

  const handleManageDevice = (deviceName: string) => {
    setSelectedDevice(deviceName);
    setManageDialogOpen(true);
  };

  const removeDevice = () => {
    setDevices((prev) => prev.filter((d) => d.name !== selectedDevice));
    setManageDialogOpen(false);
    toast({ title: "Device removed", description: `${selectedDevice} has been disconnected.` });
  };

  const toggleGoogleCalendar = () => {
    setGoogleConnected(!googleConnected);
    toast({ title: googleConnected ? "Google Calendar disconnected" : "Google Calendar connected ✓" });
  };

  const refreshGoogle = () => {
    toast({ title: "Google Calendar refreshed ✓", description: "Synced just now." });
  };

  const toggleAppleCalendar = () => {
    setAppleConnected(!appleConnected);
    toast({ title: appleConnected ? "Apple Calendar disconnected" : "Apple Calendar connected ✓" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-bold">Profile & Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account, preferences and connected devices</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-foreground text-card gap-2" onClick={handleExportHealth}><FileText className="w-4 h-4" /> Export Health Data</Button>
            <Button variant="outline" className="gap-2" onClick={() => setSupportDialogOpen(true)}><HelpCircle className="w-4 h-4" /> Help & Support</Button>
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
                <p className="font-semibold">{fullName}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
                <p className="text-xs text-muted-foreground">Pro subscriber</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {[
                { label: "Daily Medication Checklist", path: "/" },
                { label: "Habit Streak Calendar", path: "/streak" },
                { label: "Health Insights Summary", path: "/insights" },
                { label: "Medication Details & Reminders", path: "/medication" },
                { label: "Profile & Settings", path: "/settings" },
              ].map((item) => (
                <Link key={item.label} to={item.path} className="block px-3 py-2 rounded-lg border border-border text-sm hover:bg-secondary transition-colors">
                  {item.label}
                </Link>
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
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={handleExportHealth}>Export</Button>
            </div>
          </div>

          {/* Account */}
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Account</h3>
              <Button variant="outline" size="sm" onClick={() => setPasswordDialogOpen(true)}>Change Password</Button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Manage account details and security</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Full name</label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1" onBlur={() => toast({ title: "Name updated" })} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" onBlur={() => toast({ title: "Email updated" })} />
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
            <div className="flex gap-2 text-xs flex-wrap">
              {["Morning (6am-10)", "Noon (12pm-)", "Evening (6pm-9)", "30 min before"].map((w) => (
                <button key={w} className="px-2 py-1 rounded border border-border bg-secondary text-muted-foreground hover:bg-muted transition-colors" onClick={() => toast({ title: `${w} selected` })}>
                  {w}
                </button>
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
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Push Notifications</p><p className="text-xs text-muted-foreground">Receive reminders and updates</p></div>
                <Switch checked={pushNotif} onCheckedChange={(c) => { setPushNotif(c); toast({ title: c ? "Push notifications enabled" : "Push notifications disabled" }); }} />
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Sound</p><p className="text-xs text-muted-foreground">Play notification sounds</p></div>
                <Switch checked={sound} onCheckedChange={(c) => { setSound(c); toast({ title: c ? "Sound enabled" : "Sound muted" }); }} />
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Vibration</p><p className="text-xs text-muted-foreground">Vibrate on reminders (mobile only)</p></div>
                <Switch checked={vibration} onCheckedChange={(c) => { setVibration(c); toast({ title: c ? "Vibration enabled" : "Vibration disabled" }); }} />
              </div>
              <div>
                <p className="text-sm font-medium">Do Not Disturb</p>
                <p className="text-xs text-muted-foreground mb-2">Schedule a quiet window for reminders</p>
                <div className="flex items-center gap-2 text-sm">
                  <Input value={dndFrom} onChange={(e) => setDndFrom(e.target.value)} className="w-20" />
                  <span>to</span>
                  <Input value={dndTo} onChange={(e) => setDndTo(e.target.value)} className="w-20" />
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
              <button onClick={() => { setSelectedTheme("light"); toast({ title: "Light theme selected" }); }} className={`rounded-lg p-3 text-center transition-all ${selectedTheme === "light" ? "border-2 border-foreground" : "border border-border"}`}>
                <div className="w-full h-16 bg-card rounded mb-2 border border-border" />
                <p className="text-sm font-medium">Light</p>
                <p className="text-xs text-muted-foreground">Default bright friendly interface</p>
              </button>
              <button onClick={() => { setSelectedTheme("dark"); toast({ title: "Dark theme selected" }); }} className={`rounded-lg p-3 text-center transition-all ${selectedTheme === "dark" ? "border-2 border-foreground" : "border border-border"}`}>
                <div className="w-full h-16 bg-foreground rounded mb-2" />
                <p className="text-sm font-medium">Dark</p>
                <p className="text-xs text-muted-foreground">Low-light friendly interface</p>
              </button>
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
                  <p className="text-xs text-muted-foreground">{googleConnected ? "Synced as maya.thompson@gmail.com" : "Not connected"}</p>
                </div>
                <div className="flex gap-2">
                  {googleConnected && <Button variant="outline" size="sm" onClick={refreshGoogle}>Refresh</Button>}
                  <Button size="sm" className={googleConnected ? "bg-foreground text-card" : ""} variant={googleConnected ? "default" : "outline"} onClick={toggleGoogleCalendar}>
                    {googleConnected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Apple Calendar</p>
                  <p className="text-xs text-muted-foreground">{appleConnected ? "Connected" : "Not connected"}</p>
                </div>
                <Button variant="outline" size="sm" onClick={toggleAppleCalendar}>{appleConnected ? "Disconnect" : "Connect"}</Button>
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
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Share anonymized data</p><p className="text-xs text-muted-foreground">Help improve WellTrack features</p></div>
                <Checkbox checked={shareData} onCheckedChange={(c) => { setShareData(!!c); toast({ title: c ? "Data sharing enabled" : "Data sharing disabled" }); }} />
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Allow analytics</p><p className="text-xs text-muted-foreground">Send usage stats</p></div>
                <Checkbox checked={allowAnalytics} onCheckedChange={(c) => { setAllowAnalytics(!!c); toast({ title: c ? "Analytics enabled" : "Analytics disabled" }); }} />
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Biometric unlock</p><p className="text-xs text-muted-foreground">Use fingerprint or face to open the app</p></div>
                <Checkbox checked={biometric} onCheckedChange={(c) => { setBiometric(!!c); toast({ title: c ? "Biometric unlock enabled" : "Biometric unlock disabled" }); }} />
              </div>
            </div>
          </div>

          {/* Connected Devices */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div><h3 className="font-semibold">Connected Devices</h3><p className="text-xs text-muted-foreground">Manage devices that sync with your account</p></div>
              <span className="text-sm text-muted-foreground">{devices.length} devices</span>
            </div>
            <div className="space-y-3">
              {devices.map((d) => (
                <div key={d.name} className="flex items-center justify-between bg-secondary rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div><p className="text-sm font-medium">{d.name}</p><p className="text-xs text-muted-foreground">Last sync: {d.sync} • Battery {d.battery}</p></div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleRenameDevice(d.name)}>Rename</Button>
                    <Button size="sm" className="bg-foreground text-card" onClick={() => handleManageDevice(d.name)}>Manage</Button>
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
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={handleExportHealth}>Create Export</Button>
              <Button size="sm" variant="outline" onClick={() => toast({ title: "Exports", description: "Showing previous exports: Apr 2, Mar 15, Feb 28" })}>View Exports</Button>
            </div>
            <p className="text-xs text-muted-foreground">Last export: Apr 2, 2026 • 12.4 MB</p>
          </div>

          {/* Help & Support */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="font-semibold mb-1">Help & Support</h3>
            <p className="text-xs text-muted-foreground mb-4">Quick access to guides, chat and support tickets</p>
            <div className="flex flex-col items-center gap-3">
              <FileText className="w-8 h-8 text-muted-foreground" />
              <Button variant="outline" className="w-full" onClick={() => toast({ title: "Documentation", description: "Opening FAQs and user guide..." })}>Documentation & FAQs</Button>
              <Button className="w-full bg-foreground text-card gap-2" onClick={() => setSupportDialogOpen(true)}><MessageCircle className="w-4 h-4" /> Start Support Chat</Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="lg:col-span-3 bg-card rounded-lg border border-border p-5">
            <h3 className="font-semibold mb-1">Danger Zone</h3>
            <p className="text-xs text-muted-foreground mb-4">Actions below are irreversible and will require confirmation</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Reset progress data</p><p className="text-xs text-muted-foreground">Clear streaks, logs and habit progress. This does not delete your account.</p></div>
                <Button variant="outline" size="sm" onClick={() => setResetDialogOpen(true)}>Reset</Button>
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">Log out</p><p className="text-xs text-muted-foreground">Sign out of this device</p></div>
                <Button variant="outline" size="sm" onClick={() => setLogoutDialogOpen(true)}>Log out</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Change Password</DialogTitle><DialogDescription>Enter your current and new password.</DialogDescription></DialogHeader>
          <div className="space-y-3 py-4">
            <div><label className="text-sm font-medium">Current password</label><Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="mt-1" /></div>
            <div><label className="text-sm font-medium">New password</label><Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>Cancel</Button><Button onClick={handleChangePassword}>Update Password</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Dialog */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reset Progress Data?</DialogTitle><DialogDescription>This will clear all streaks, logs and habit progress. Your medications and account will remain intact. This cannot be undone.</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setResetDialogOpen(false)}>Cancel</Button><Button variant="destructive" onClick={handleReset}>Reset All Data</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Log Out?</DialogTitle><DialogDescription>You'll need to sign in again to access your account.</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>Cancel</Button><Button onClick={handleLogout}>Log Out</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Device Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Rename Device</DialogTitle><DialogDescription>Enter a new name for {selectedDevice}.</DialogDescription></DialogHeader>
          <div className="py-4"><Input value={newDeviceName} onChange={(e) => setNewDeviceName(e.target.value)} /></div>
          <DialogFooter><Button variant="outline" onClick={() => setRenameDialogOpen(false)}>Cancel</Button><Button onClick={confirmRename}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Device Dialog */}
      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Manage {selectedDevice}</DialogTitle><DialogDescription>View device details or remove it from your account.</DialogDescription></DialogHeader>
          <div className="py-4 space-y-2">
            <p className="text-sm">Device: <strong>{selectedDevice}</strong></p>
            <p className="text-sm text-muted-foreground">Removing will stop syncing data from this device.</p>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setManageDialogOpen(false)}>Close</Button><Button variant="destructive" onClick={removeDevice}>Remove Device</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Export Health Data</DialogTitle><DialogDescription>Create a downloadable zip with your metrics, medications and logs.</DialogDescription></DialogHeader>
          <div className="py-4"><p className="text-sm text-muted-foreground">This will include all data from your account. The export typically takes 1-2 minutes.</p></div>
          <DialogFooter><Button variant="outline" onClick={() => setExportDialogOpen(false)}>Cancel</Button><Button onClick={confirmExport}>Start Export</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Support Dialog */}
      <Dialog open={supportDialogOpen} onOpenChange={setSupportDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Help & Support</DialogTitle><DialogDescription>How can we help you today?</DialogDescription></DialogHeader>
          <div className="py-4 space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => { setSupportDialogOpen(false); toast({ title: "Opening documentation..." }); }}>📖 Documentation & FAQs</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => { setSupportDialogOpen(false); toast({ title: "Support chat started", description: "A support agent will be with you shortly." }); }}>💬 Live Chat Support</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => { setSupportDialogOpen(false); toast({ title: "Support ticket created", description: "Ticket #4821 — we'll respond within 24 hours." }); }}>🎫 Submit a Ticket</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
