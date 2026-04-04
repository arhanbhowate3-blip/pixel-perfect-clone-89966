import { useState } from "react";
import { Activity, Pill, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const chartData = [
  { day: "Mon", value: 95 },
  { day: "Tue", value: 88 },
  { day: "Wed", value: 92 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 100 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 90 },
];

export default function HealthInsights() {
  const { toast } = useToast();
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [insightsDialogOpen, setInsightsDialogOpen] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const [shareEmail, setShareEmail] = useState("");

  const handleSetReminder = () => {
    setReminderSet(true);
    setReminderDialogOpen(false);
    toast({ title: "Evening reminder set ✓", description: "You'll receive a reminder at 8:00 PM daily." });
  };

  const handleRemindLater = () => {
    toast({ title: "Reminder snoozed", description: "We'll remind you again next week." });
  };

  const handleShareReport = () => {
    setShareDialogOpen(true);
  };

  const sendReport = () => {
    if (!shareEmail.trim()) {
      toast({ title: "Enter an email", variant: "destructive" });
      return;
    }
    setShareDialogOpen(false);
    toast({ title: "Report shared ✓", description: `Sent to ${shareEmail}` });
    setShareEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <h1 className="text-xl font-bold">Weekly Health Insights</h1>
                </div>
                <span className="text-sm text-muted-foreground">Week view</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Your medication adherence overview and quick wins</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-primary/10 rounded-full px-4 py-3">
                  <Activity className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Adherence</p>
                    <p className="font-bold">92%</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto">vs last week +4%</span>
                </div>
                <div className="flex items-center gap-3 bg-warning/10 rounded-full px-4 py-3">
                  <Pill className="w-5 h-5 text-warning" />
                  <div>
                    <p className="text-xs text-muted-foreground">Avg meds/day</p>
                    <p className="font-bold">3.2</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto">consistent</span>
                </div>
                <div className="flex items-center gap-3 bg-destructive/10 rounded-full px-4 py-3">
                  <Flame className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="text-xs text-muted-foreground">Longest streak</p>
                    <p className="font-bold">15 days</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto">keep going</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4 mb-6">
                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Adherence Trend</h3>
                    <span className="text-xs text-muted-foreground">Mon → Sun</span>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((_, i) => (
                          <Cell key={i} fill={i === 3 ? "hsl(0 0% 60%)" : "hsl(0 0% 20%)"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-milestone" />
                    <span className="text-xs text-muted-foreground">Adherence (%) each day</span>
                  </div>
                </div>
                <div className="bg-secondary rounded-lg p-4 flex flex-col">
                  <h3 className="text-sm font-semibold mb-2">Tip of the week</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    Great job — try setting an evening reminder to keep your streak! A short 5-minute routine after dinner can make taking meds automatic.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      className={`rounded-full ${reminderSet ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"}`}
                      onClick={() => reminderSet ? toast({ title: "Reminder already set" }) : setReminderDialogOpen(true)}
                    >
                      {reminderSet ? "Reminder Set ✓" : "Set Reminder"}
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-full text-primary border-primary" onClick={handleRemindLater}>Remind later</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Last sync: Mar 28, 2026 • Next check-in: Mar 29</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">Summary: Average adherence 92% • Next goal: 95%</p>

              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" className="rounded-full" onClick={() => setInsightsDialogOpen(true)}>View full insights</Button>
                <Button className="bg-primary text-primary-foreground rounded-full" onClick={handleShareReport}>Share report</Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-secondary text-sm font-medium transition-colors">
                  Daily Medication Checklist Open
                </Link>
                <Link to="/streak" className="block w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-secondary text-sm font-medium transition-colors">
                  Habit Streak Calendar Track
                </Link>
                <Link to="/medication" className="block w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-secondary text-sm font-medium bg-warning/10">
                  Medication Details & Reminders Manage
                </Link>
                <Link to="/settings" className="block w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-secondary text-sm font-medium transition-colors">
                  Profile & Settings Edit
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Pro tip: Enable bedtime reminders to keep daily adherence consistent.</p>
            </div>

            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-3">Weekly Snapshot</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-primary/5 rounded-lg p-3"><p className="text-xs text-muted-foreground">Avg Sleep</p><p className="font-bold">7.4 hrs</p></div>
                <div className="bg-warning/10 rounded-lg p-3"><p className="text-xs text-muted-foreground">Mood Avg</p><p className="font-bold">4.1 / 5</p></div>
                <div className="bg-primary/5 rounded-lg p-3"><p className="text-xs text-muted-foreground">Hydration</p><p className="font-bold">1.9 L/day</p></div>
                <div className="bg-warning/10 rounded-lg p-3"><p className="text-xs text-muted-foreground">Exercise</p><p className="font-bold">3 sessions</p></div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 py-6 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 WellTrack Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); toast({ title: "Privacy Policy", description: "Opening privacy policy..." }); }}>Privacy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); toast({ title: "Terms of Service", description: "Opening terms..." }); }}>Terms</a>
            <a href="#" onClick={(e) => { e.preventDefault(); toast({ title: "Help Center", description: "Opening help center..." }); }}>Help</a>
          </div>
        </footer>
      </div>

      {/* Set Reminder Dialog */}
      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Evening Reminder</DialogTitle>
            <DialogDescription>We'll send you a daily reminder to take your medications.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm mb-2">Reminder time: <strong>8:00 PM</strong> daily</p>
            <p className="text-sm text-muted-foreground">You can change this later in Medication Details → Reminders.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSetReminder}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Report Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Health Report</DialogTitle>
            <DialogDescription>Send your weekly insights to a doctor or care provider.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium">Recipient email</label>
            <Input className="mt-1" placeholder="doctor@clinic.com" value={shareEmail} onChange={(e) => setShareEmail(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>Cancel</Button>
            <Button onClick={sendReport}>Send Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Full Insights Dialog */}
      <Dialog open={insightsDialogOpen} onOpenChange={setInsightsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Full Health Insights</DialogTitle>
            <DialogDescription>Detailed breakdown of your weekly health data.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Mon</p><p className="font-bold text-primary">95%</p></div>
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Tue</p><p className="font-bold text-primary">88%</p></div>
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Wed</p><p className="font-bold text-primary">92%</p></div>
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Thu</p><p className="font-bold text-destructive">78%</p></div>
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Fri</p><p className="font-bold text-primary">100%</p></div>
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Sat</p><p className="font-bold text-primary">85%</p></div>
            </div>
            <p className="text-sm text-muted-foreground">Thursday had the lowest adherence. Consider setting an extra midday reminder.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setInsightsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
