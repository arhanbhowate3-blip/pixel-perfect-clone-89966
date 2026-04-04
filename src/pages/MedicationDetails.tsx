import { Check, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const timelineEntries = [
  { status: "taken", label: "Taken • 2 tablets", date: "Today • Apr 14, 2026 — 6:02 PM", note: "Note: Taken with dinner", icon: <Check className="w-4 h-4" />, color: "bg-success text-success-foreground" },
  { status: "snoozed", label: "Snoozed • 1 tablet", date: "Apr 14, 2026 — 2:00 PM (snoozed 15m)", note: "Note: Delayed due to meeting", icon: <AlertCircle className="w-4 h-4" />, color: "bg-warning text-warning-foreground" },
  { status: "missed", label: "Missed • 1 tablet", date: "Apr 13, 2026 — 10:00 PM", note: "Missed: Forgot after travel", icon: <X className="w-4 h-4" />, color: "bg-destructive text-destructive-foreground" },
  { status: "taken", label: "Taken • 2 tablets", date: "Apr 13, 2026 — 6:01 PM", note: "Note: With snack", icon: <Check className="w-4 h-4" />, color: "bg-success text-success-foreground" },
  { status: "taken", label: "Taken • 1 tablet", date: "Apr 12, 2026 — 8:00 AM", note: "Note: Morning dose", icon: <Check className="w-4 h-4" />, color: "bg-success text-success-foreground" },
];

const reminders = [
  { label: "Morning", schedule: "Every day • 8:00 AM", snooze: "Snooze 10m", enabled: false },
  { label: "Evening", schedule: "Mon-Fri • 6:00 PM", snooze: "Snooze 15m", enabled: true },
  { label: "Bedtime", schedule: "Daily • 10:30 PM", snooze: "Snooze 5m", enabled: true },
  { label: "Midday", schedule: "Sat-Sun • 1:00 PM", snooze: "Snooze 10m", enabled: true },
];

const repeatDays = [
  { day: "Mon", active: true },
  { day: "Tue", active: true },
  { day: "Wed", active: true },
  { day: "Thu", active: true },
  { day: "Fri", active: true },
  { day: "Sat", active: false },
  { day: "Sun", active: false },
];

export default function MedicationDetails() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {/* Med header */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&h=120&fit=crop"
                  alt="Metformin"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">Metformin</h1>
                  <p className="text-muted-foreground">500 mg — Oral tablet</p>
                  <p className="text-sm text-muted-foreground mt-1">Prescribed by Dr. Elena Park · Started Jan 10, 2026</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-foreground text-card">Edit</Button>
                    <Button size="sm" variant="outline">Duplicate</Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Next dose</p>
                  <p className="font-bold text-lg">Today • 6:00 PM</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="font-semibold text-sm mb-1">Notes</h3>
                <p className="text-sm text-muted-foreground">Take with food to reduce stomach upset. Avoid alcohol within 24 hours of dose. Keep medication in a cool, dry place.</p>
              </div>
            </div>

            {/* Dosage History */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Dosage History Summary</h2>
                  <p className="text-sm text-muted-foreground">Overview of the last 7 days</p>
                </div>
                <span className="text-sm text-muted-foreground">Showing 7 days</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Taken</p>
                  <p className="text-3xl font-bold text-primary">20</p>
                  <p className="text-xs text-muted-foreground">doses</p>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Missed</p>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">doses</p>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Adherence</p>
                  <p className="text-3xl font-bold">91%</p>
                  <p className="text-xs text-muted-foreground">average</p>
                </div>
              </div>
            </div>

            {/* Medication Details */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold mb-3">Medication Details</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Metformin is used to control high blood sugar in people with type 2 diabetes mellitus. It decreases hepatic glucose production and improves insulin sensitivity. Typical side effects include mild gastrointestinal upset during initiation. Contact your provider if you experience severe abdominal pain or symptoms of lactic acidosis.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Form</p>
                  <p className="font-semibold">Tablet</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Frequency</p>
                  <p className="font-semibold">Twice daily (morning & evening)</p>
                </div>
              </div>
            </div>

            {/* Dosage Timeline */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Dosage Timeline</h2>
                  <p className="text-sm text-muted-foreground">Recent doses with status and notes</p>
                </div>
                <span className="text-sm text-muted-foreground">All times local</span>
              </div>
              <div className="space-y-4">
                {timelineEntries.map((entry, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${entry.color}`}>
                      {entry.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{entry.label}</p>
                      <p className="text-xs text-muted-foreground">{entry.date}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{entry.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Reminders */}
            <div className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Reminders & Schedule</h3>
                  <p className="text-xs text-muted-foreground">Manage reminder times and snooze settings</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">All reminders</span>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-3">
                {reminders.map((r) => (
                  <div key={r.label} className="flex items-center justify-between bg-secondary rounded-lg p-3">
                    <div>
                      <p className="font-semibold text-sm">{r.label}</p>
                      <p className="text-xs text-muted-foreground">{r.schedule}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked={r.enabled} />
                      <span className="text-xs text-muted-foreground">{r.snooze}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Default snooze duration</p>
                <div className="flex items-center gap-3">
                  <Slider defaultValue={[15]} max={30} step={5} className="flex-1" />
                  <span className="text-sm font-medium">15 min</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-foreground text-card">Add Reminder</Button>
            </div>

            {/* Repeat on */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-3">Repeat on</h3>
              <div className="flex gap-2">
                {repeatDays.map((d) => (
                  <div
                    key={d.day}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-medium ${
                      d.active ? "bg-foreground text-card" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {d.active ? <Check className="w-4 h-4" /> : d.day.charAt(0)}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                {repeatDays.map((d) => (
                  <span key={d.day} className="w-10 text-center">{d.day}</span>
                ))}
              </div>
            </div>

            {/* Refill status */}
            <div className="bg-card rounded-lg border border-border p-5">
              <p className="text-xs text-muted-foreground">Refill status</p>
              <p className="text-lg font-bold">30 tablets remaining</p>
              <p className="text-sm text-muted-foreground mb-4">Estimated 15 days left</p>
              <div className="flex gap-2">
                <Button className="bg-foreground text-card flex-1">Edit Medication</Button>
                <Button variant="outline" className="flex-1 border-destructive text-destructive">Delete Medication</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Deleting will remove all reminders and history for this medication from your account. This action cannot be undone.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
