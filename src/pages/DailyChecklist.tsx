import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  taken: boolean;
}

interface TimeBlock {
  label: string;
  subtitle: string;
  meds: Medication[];
}

const initialBlocks: TimeBlock[] = [
  {
    label: "Morning",
    subtitle: "After breakfast • 6:30 AM – 10:00 AM",
    meds: [
      { id: "1", name: "Atorvastatin", dosage: "20 mg", frequency: "once daily", instructions: "Take with food • Avoid grapefruit", taken: false },
      { id: "2", name: "Lisinopril", dosage: "10 mg", frequency: "once daily", instructions: "Monitor blood pressure • avoid sudden standing", taken: true },
      { id: "3", name: "Vitamin D3", dosage: "2000 IU", frequency: "once daily", instructions: "Take with fat-containing meal", taken: false },
    ],
  },
  {
    label: "Midday",
    subtitle: "Lunch window • 11:30 AM – 2:00 PM",
    meds: [
      { id: "4", name: "Omeprazole", dosage: "20 mg", frequency: "as needed", instructions: "Take 30 minutes before meal if reflux occurs", taken: false },
      { id: "5", name: "Probiotic Blend", dosage: "1 capsule", frequency: "daily", instructions: "Take with food • keep refrigerated", taken: false },
    ],
  },
  {
    label: "Evening",
    subtitle: "After dinner • 6:00 PM – 9:00 PM",
    meds: [
      { id: "6", name: "Melatonin", dosage: "3 mg", frequency: "as needed", instructions: "Take 30 minutes before bedtime", taken: false },
      { id: "7", name: "Metformin XR", dosage: "500 mg", frequency: "twice daily", instructions: "Take with dinner • monitor blood glucose", taken: true },
    ],
  },
  {
    label: "Night",
    subtitle: "Before bed • 10:00 PM – 11:59 PM",
    meds: [
      { id: "8", name: "Low-dose Aspirin", dosage: "81 mg", frequency: "nightly", instructions: "Take with water • report unusual bruising", taken: false },
    ],
  },
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

export default function DailyChecklist() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [newMedName, setNewMedName] = useState("");
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const takenCount = blocks.reduce((acc, b) => acc + b.meds.filter((m) => m.taken).length, 0);
  const totalCount = blocks.reduce((acc, b) => acc + b.meds.length, 0);

  const toggleMed = (blockIdx: number, medId: string) => {
    let medName = "";
    setBlocks((prev) =>
      prev.map((b, i) =>
        i === blockIdx
          ? {
              ...b,
              meds: b.meds.map((m) => {
                if (m.id === medId) {
                  medName = m.name;
                  return { ...m, taken: !m.taken };
                }
                return m;
              }),
            }
          : b
      )
    );
    const med = blocks[blockIdx].meds.find((m) => m.id === medId);
    if (med) {
      toast({
        title: med.taken ? `${med.name} unmarked` : `${med.name} taken ✓`,
        description: med.taken ? "Dose status reverted" : "Great job staying on track!",
      });
    }
  };

  const markAll = () => {
    setBlocks((prev) =>
      prev.map((b) => ({ ...b, meds: b.meds.map((m) => ({ ...m, taken: true })) }))
    );
    toast({ title: "All medications marked as taken ✓", description: `${totalCount} doses completed for today.` });
  };

  const quickAdd = () => {
    if (!newMedName.trim()) {
      toast({ title: "Enter a medication name", description: "Please type a name before adding.", variant: "destructive" });
      return;
    }
    const newId = String(Date.now());
    setBlocks((prev) => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        meds: [
          ...updated[0].meds,
          { id: newId, name: newMedName.trim(), dosage: "—", frequency: "as needed", instructions: "Added via Quick Add", taken: false },
        ],
      };
      return updated;
    });
    toast({ title: `${newMedName.trim()} added`, description: "Added to Morning block." });
    setNewMedName("");
  };

  const handleMedClick = (medName: string) => {
    navigate("/medication");
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
          <div className="text-sm font-semibold">{takenCount} of {totalCount} taken</div>
        </div>

        <div className="space-y-4">
          {blocks.map((block, bIdx) => (
            <div key={block.label} className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{block.label}</h2>
                  <p className="text-sm text-muted-foreground">{block.subtitle}</p>
                </div>
                <span className="text-sm text-muted-foreground">{block.meds.length} items</span>
              </div>
              <div className="space-y-3">
                {block.meds.map((med) => {
                  const currentImg = pillImages[imgIdx % pillImages.length];
                  imgIdx++;
                  return (
                    <div key={med.id} className="flex items-center gap-4">
                      <img
                        src={currentImg}
                        alt={med.name}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                        onClick={() => handleMedClick(med.name)}
                        title="View medication details"
                      />
                      <div className="flex-1 cursor-pointer" onClick={() => handleMedClick(med.name)}>
                        <p className="font-semibold text-sm hover:text-primary transition-colors">{med.name}</p>
                        <p className="text-xs text-muted-foreground">{med.dosage} • {med.frequency}</p>
                        <p className="text-xs text-muted-foreground">{med.instructions}</p>
                      </div>
                      <Checkbox
                        checked={med.taken}
                        onCheckedChange={() => toggleMed(bIdx, med.id)}
                        className="w-10 h-10 rounded-lg border-2 data-[state=checked]:bg-primary/20 data-[state=checked]:border-primary"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Tip: Tap the pill icon to view Medication Details. Green checks indicate completed doses. Use 'Quick Add' to add ad-hoc medications.
        </p>

        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex items-center justify-center gap-3 flex-wrap">
          <Button variant="outline" size="icon" onClick={quickAdd}><Plus className="w-4 h-4" /></Button>
          <Input
            placeholder="Add medication name"
            className="max-w-xs"
            value={newMedName}
            onChange={(e) => setNewMedName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && quickAdd()}
          />
          <Button variant="outline" onClick={quickAdd}>Quick Add Medication</Button>
          <Button className="bg-primary text-primary-foreground" onClick={markAll}>Mark all taken</Button>
          <Button variant="outline" onClick={() => setReminderDialogOpen(true)}>Manage reminders</Button>
        </div>
      </div>

      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Reminders</DialogTitle>
            <DialogDescription>Configure your daily medication reminders.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Morning reminder (8:00 AM)</span>
              <Checkbox defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Midday reminder (12:00 PM)</span>
              <Checkbox defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Evening reminder (6:00 PM)</span>
              <Checkbox defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Night reminder (10:00 PM)</span>
              <Checkbox />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setReminderDialogOpen(false); toast({ title: "Reminders updated", description: "Your reminder preferences have been saved." }); }}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
