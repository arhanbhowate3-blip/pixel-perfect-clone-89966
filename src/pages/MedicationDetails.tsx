import { useState } from "react";
import { Check, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const timelineEntries = [
  { status: "taken", label: "Taken • 2 tablets", date: "Today • Apr 14, 2026 — 6:02 PM", note: "Note: Taken with dinner", icon: <Check className="w-4 h-4" />, color: "bg-success text-success-foreground" },
  { status: "snoozed", label: "Snoozed • 1 tablet", date: "Apr 14, 2026 — 2:00 PM (snoozed 15m)", note: "Note: Delayed due to meeting", icon: <AlertCircle className="w-4 h-4" />, color: "bg-warning text-warning-foreground" },
  { status: "missed", label: "Missed • 1 tablet", date: "Apr 13, 2026 — 10:00 PM", note: "Missed: Forgot after travel", icon: <X className="w-4 h-4" />, color: "bg-destructive text-destructive-foreground" },
  { status: "taken", label: "Taken • 2 tablets", date: "Apr 13, 2026 — 6:01 PM", note: "Note: With snack", icon: <Check className="w-4 h-4" />, color: "bg-success text-success-foreground" },
  { status: "taken", label: "Taken • 1 tablet", date: "Apr 12, 2026 — 8:00 AM", note: "Note: Morning dose", icon: <Check className="w-4 h-4" />, color: "bg-success text-success-foreground" },
];

export default function MedicationDetails() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [allReminders, setAllReminders] = useState(true);
  const [reminderStates, setReminderStates] = useState({ Morning: false, Evening: true, Bedtime: true, Midday: true });
  const [repeatDays, setRepeatDays] = useState({ Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false });
  const [snoozeDuration, setSnoozeDuration] = useState([15]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addReminderOpen, setAddReminderOpen] = useState(false);
  const [medName, setMedName] = useState("Metformin");
  const [medDosage, setMedDosage] = useState("500 mg");
  const [medNotes, setMedNotes] = useState("Take with food to reduce stomach upset. Avoid alcohol within 24 hours of dose. Keep medication in a cool, dry place.");
  const [newReminderLabel, setNewReminderLabel] = useState("");
  const [newReminderTime, setNewReminderTime] = useState("12:00");

  const reminders = [
    { label: "Morning", schedule: "Every day • 8:00 AM", snooze: "Snooze 10m" },
    { label: "Evening", schedule: "Mon-Fri • 6:00 PM", snooze: "Snooze 15m" },
    { label: "Bedtime", schedule: "Daily • 10:30 PM", snooze: "Snooze 5m" },
    { label: "Midday", schedule: "Sat-Sun • 1:00 PM", snooze: "Snooze 10m" },
  ];

  const toggleReminder = (label: string, checked: boolean) => {
    setReminderStates((p) => ({ ...p, [label]: checked }));
    toast({ title: `${label} reminder ${checked ? "enabled" : "disabled"}` });
  };

  const toggleAllReminders = (checked: boolean) => {
    setAllReminders(checked);
    const newStates = Object.fromEntries(Object.keys(reminderStates).map((k) => [k, checked]));
    setReminderStates(newStates as typeof reminderStates);
    toast({ title: checked ? "All reminders enabled" : "All reminders disabled" });
  };

  const toggleDay = (day: string) => {
    setRepeatDays((p) => ({ ...p, [day]: !p[day as keyof typeof p] }));
    toast({ title: `${day} ${repeatDays[day as keyof typeof repeatDays] ? "removed" : "added"}` });
  };

  const handleEdit = () => setEditDialogOpen(true);
  const handleDuplicate = () => {
    toast({ title: "Medication duplicated", description: `${medName} has been copied. Edit the new entry.` });
  };
  const handleDelete = () => setDeleteDialogOpen(true);
  const confirmDelete = () => {
    setDeleteDialogOpen(false);
    toast({ title: "Medication deleted", description: `${medName} and all associated data removed.`, variant: "destructive" });
    navigate("/");
  };
  const saveEdit = () => {
    setEditDialogOpen(false);
    toast({ title: "Medication updated ✓", description: `${medName} details saved.` });
  };
  const addReminder = () => {
    if (!newReminderLabel.trim()) {
      toast({ title: "Enter a label", variant: "destructive" });
      return;
    }
    setAddReminderOpen(false);
    toast({ title: `${newReminderLabel} reminder added`, description: `Set for ${newReminderTime} daily.` });
    setNewReminderLabel("");
    setNewReminderTime("12:00");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-4">
            {/* Med header */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start gap-4 flex-wrap">
                <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&h=120&fit=crop" alt="Metformin" className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-[200px]">
                  <h1 className="text-2xl font-bold">{medName}</h1>
                  <p className="text-muted-foreground">{medDosage} — Oral tablet</p>
                  <p className="text-sm text-muted-foreground mt-1">Prescribed by Dr. Elena Park · Started Jan 10, 2026</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-foreground text-card" onClick={handleEdit}>Edit</Button>
                    <Button size="sm" variant="outline" onClick={handleDuplicate}>Duplicate</Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Next dose</p>
                  <p className="font-bold text-lg">Today • 6:00 PM</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="font-semibold text-sm mb-1">Notes</h3>
                <p className="text-sm text-muted-foreground">{medNotes}</p>
              </div>
            </div>

            {/* Dosage History */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div><h2 className="text-lg font-semibold">Dosage History Summary</h2><p className="text-sm text-muted-foreground">Overview of the last 7 days</p></div>
                <span className="text-sm text-muted-foreground">Showing 7 days</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary rounded-lg p-4"><p className="text-xs text-muted-foreground">Taken</p><p className="text-3xl font-bold text-primary">20</p><p className="text-xs text-muted-foreground">doses</p></div>
                <div className="bg-secondary rounded-lg p-4"><p className="text-xs text-muted-foreground">Missed</p><p className="text-3xl font-bold">2</p><p className="text-xs text-muted-foreground">doses</p></div>
                <div className="bg-secondary rounded-lg p-4"><p className="text-xs text-muted-foreground">Adherence</p><p className="text-3xl font-bold">91%</p><p className="text-xs text-muted-foreground">average</p></div>
              </div>
            </div>

            {/* Medication Details */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold mb-3">Medication Details</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Metformin is used to control high blood sugar in people with type 2 diabetes mellitus. It decreases hepatic glucose production and improves insulin sensitivity. Typical side effects include mild gastrointestinal upset during initiation. Contact your provider if you experience severe abdominal pain or symptoms of lactic acidosis.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground">Form</p><p className="font-semibold">Tablet</p></div>
                <div><p className="text-xs text-muted-foreground">Frequency</p><p className="font-semibold">Twice daily (morning & evening)</p></div>
              </div>
            </div>

            {/* Dosage Timeline */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div><h2 className="text-lg font-semibold">Dosage Timeline</h2><p className="text-sm text-muted-foreground">Recent doses with status and notes</p></div>
                <span className="text-sm text-muted-foreground">All times local</span>
              </div>
              <div className="space-y-4">
                {timelineEntries.map((entry, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${entry.color}`}>{entry.icon}</div>
                    <div className="flex-1"><p className="text-sm font-semibold">{entry.label}</p><p className="text-xs text-muted-foreground">{entry.date}</p></div>
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
                <div><h3 className="font-semibold">Reminders & Schedule</h3><p className="text-xs text-muted-foreground">Manage reminder times and snooze settings</p></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">All reminders</span>
                  <Switch checked={allReminders} onCheckedChange={toggleAllReminders} />
                </div>
              </div>
              <div className="space-y-3">
                {reminders.map((r) => (
                  <div key={r.label} className="flex items-center justify-between bg-secondary rounded-lg p-3">
                    <div><p className="font-semibold text-sm">{r.label}</p><p className="text-xs text-muted-foreground">{r.schedule}</p></div>
                    <div className="flex items-center gap-2">
                      <Switch checked={reminderStates[r.label as keyof typeof reminderStates]} onCheckedChange={(c) => toggleReminder(r.label, c)} />
                      <span className="text-xs text-muted-foreground">{r.snooze}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Default snooze duration</p>
                <div className="flex items-center gap-3">
                  <Slider value={snoozeDuration} onValueChange={(v) => { setSnoozeDuration(v); }} max={30} step={5} className="flex-1" />
                  <span className="text-sm font-medium">{snoozeDuration[0]} min</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-foreground text-card" onClick={() => setAddReminderOpen(true)}>Add Reminder</Button>
            </div>

            {/* Repeat on */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-3">Repeat on</h3>
              <div className="flex gap-2">
                {Object.entries(repeatDays).map(([day, active]) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                      active ? "bg-foreground text-card" : "bg-secondary text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {active ? <Check className="w-4 h-4" /> : day.charAt(0)}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                {Object.keys(repeatDays).map((day) => (
                  <span key={day} className="w-10 text-center">{day}</span>
                ))}
              </div>
            </div>

            {/* Refill status */}
            <div className="bg-card rounded-lg border border-border p-5">
              <p className="text-xs text-muted-foreground">Refill status</p>
              <p className="text-lg font-bold">30 tablets remaining</p>
              <p className="text-sm text-muted-foreground mb-4">Estimated 15 days left</p>
              <div className="flex gap-2">
                <Button className="bg-foreground text-card flex-1" onClick={handleEdit}>Edit Medication</Button>
                <Button variant="outline" className="flex-1 border-destructive text-destructive" onClick={handleDelete}>Delete Medication</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Deleting will remove all reminders and history for this medication from your account. This action cannot be undone.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Medication</DialogTitle>
            <DialogDescription>Update medication details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div><label className="text-sm font-medium">Name</label><Input value={medName} onChange={(e) => setMedName(e.target.value)} className="mt-1" /></div>
            <div><label className="text-sm font-medium">Dosage</label><Input value={medDosage} onChange={(e) => setMedDosage(e.target.value)} className="mt-1" /></div>
            <div><label className="text-sm font-medium">Notes</label><Textarea value={medNotes} onChange={(e) => setMedNotes(e.target.value)} className="mt-1" rows={3} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {medName}?</DialogTitle>
            <DialogDescription>This will permanently remove all reminders, history and data for this medication. This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete permanently</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Reminder Dialog */}
      <Dialog open={addReminderOpen} onOpenChange={setAddReminderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Reminder</DialogTitle>
            <DialogDescription>Create a new medication reminder.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div><label className="text-sm font-medium">Label</label><Input placeholder="e.g., Afternoon" value={newReminderLabel} onChange={(e) => setNewReminderLabel(e.target.value)} className="mt-1" /></div>
            <div><label className="text-sm font-medium">Time</label><Input type="time" value={newReminderTime} onChange={(e) => setNewReminderTime(e.target.value)} className="mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddReminderOpen(false)}>Cancel</Button>
            <Button onClick={addReminder}>Add Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
