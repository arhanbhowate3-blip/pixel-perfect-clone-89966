import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import AddMedicineDialog from "@/components/AddMedicineDialog";
import { getMedications, logDose, getDoseLogs, type StoredMedication } from "@/lib/medicationStore";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

const timeBlocks = [
  { label: "Morning", subtitle: "After breakfast • 6:30 AM – 10:00 AM" },
  { label: "Midday", subtitle: "Lunch window • 11:30 AM – 2:00 PM" },
  { label: "Evening", subtitle: "After dinner • 6:00 PM – 9:00 PM" },
  { label: "Night", subtitle: "Before bed • 10:00 PM – 11:59 PM" },
];

const pillImages = [
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=80&h=80&fit=crop",
];

const TODAY = "2026-04-12";

export default function DailyChecklist() {
  const [medications, setMedications] = useState<StoredMedication[]>(() => getMedications());
  const [doseLogs, setDoseLogs] = useState(() => getDoseLogs());
  const [addMedOpen, setAddMedOpen] = useState(false);
  const [quickAddName, setQuickAddName] = useState("");
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const refresh = useCallback(() => {
    setMedications(getMedications());
    setDoseLogs(getDoseLogs());
  }, []);

  const isTaken = (medId: string) => {
    return doseLogs.some((l) => l.medicationId === medId && l.date === TODAY && l.status === "taken");
  };

  const takenCount = medications.filter((m) => isTaken(m.id)).length;

  const toggleMed = (med: StoredMedication) => {
    const taken = isTaken(med.id);
    logDose({
      id: `log-${TODAY}-${med.id}`,
      medicationId: med.id,
      date: TODAY,
      status: taken ? "missed" : "taken",
      time: new Date().toTimeString().slice(0, 5),
      note: "",
    });
    refresh();
    toast({
      title: taken ? `${med.name} unmarked` : `${med.name} taken ✓`,
      description: taken ? "Dose status reverted" : "Great job staying on track!",
    });
  };

  const markAll = () => {
    medications.forEach((med) => {
      logDose({
        id: `log-${TODAY}-${med.id}`,
        medicationId: med.id,
        date: TODAY,
        status: "taken",
        time: new Date().toTimeString().slice(0, 5),
        note: "",
      });
    });
    refresh();
    toast({ title: "All medications marked as taken ✓", description: `${medications.length} doses completed.` });
  };

  const quickAdd = () => {
    if (!quickAddName.trim()) {
      toast({ title: "Enter a medication name", variant: "destructive" });
      return;
    }
    setQuickAddName("");
    setAddMedOpen(true);
  };

  let imgIdx = 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold">Daily Medication Checklist</h1>
            <p className="text-muted-foreground text-sm">Manage today's doses and stay on track</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Wednesday, April 7, 2026</p>
            <p className="text-sm text-muted-foreground">Week 14 • Day 97 of routine</p>
          </div>
          <div className="text-sm font-semibold">{takenCount} of {medications.length} taken</div>
        </div>

        <div className="space-y-4">
          {timeBlocks.map((block) => {
            const blockMeds = medications.filter((m) => m.timeBlock === block.label);
            if (blockMeds.length === 0) return null;
            return (
              <div key={block.label} className="bg-card rounded-lg border border-border p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">{block.label}</h2>
                    <p className="text-sm text-muted-foreground">{block.subtitle}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{blockMeds.length} items</span>
                </div>
                <div className="space-y-3">
                  {blockMeds.map((med) => {
                    const currentImg = pillImages[imgIdx % pillImages.length];
                    imgIdx++;
                    const taken = isTaken(med.id);
                    return (
                      <div key={med.id} className="flex items-center gap-4">
                        <img
                          src={currentImg}
                          alt={med.name}
                          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                          onClick={() => navigate("/medication")}
                          title="View medication details"
                        />
                        <div className="flex-1 cursor-pointer" onClick={() => navigate("/medication")}>
                          <p className="font-semibold text-sm hover:text-primary transition-colors">{med.name}</p>
                          <p className="text-xs text-muted-foreground">{med.dosage} • {med.frequency}</p>
                          <p className="text-xs text-muted-foreground">{med.instructions}</p>
                        </div>
                        <Checkbox
                          checked={taken}
                          onCheckedChange={() => toggleMed(med)}
                          className="w-10 h-10 rounded-lg border-2 data-[state=checked]:bg-primary/20 data-[state=checked]:border-primary"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Tip: Tap the pill icon to view Medication Details. Green checks indicate completed doses. Use 'Quick Add' to add ad-hoc medications.
        </p>

        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex items-center justify-center gap-3 flex-wrap">
          <Button variant="outline" size="icon" onClick={() => setAddMedOpen(true)}><Plus className="w-4 h-4" /></Button>
          <Input
            placeholder="Add medication name"
            className="max-w-xs"
            value={quickAddName}
            onChange={(e) => setQuickAddName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && quickAdd()}
          />
          <Button variant="outline" onClick={() => setAddMedOpen(true)}>Quick Add Medication</Button>
          <Button className="bg-primary text-primary-foreground" onClick={markAll}>Mark all taken</Button>
          <Button variant="outline" onClick={() => setReminderDialogOpen(true)}>Manage reminders</Button>
        </div>
      </div>

      <AddMedicineDialog open={addMedOpen} onOpenChange={setAddMedOpen} onSaved={refresh} />

      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Reminders</DialogTitle>
            <DialogDescription>Configure your daily medication reminders.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {["Morning (8:00 AM)", "Midday (12:00 PM)", "Evening (6:00 PM)", "Night (10:00 PM)"].map((r) => (
              <div key={r} className="flex items-center justify-between">
                <span className="text-sm">{r}</span>
                <Checkbox defaultChecked />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setReminderDialogOpen(false); toast({ title: "Reminders updated ✓" }); }}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
