import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { saveMedication, type StoredMedication } from "@/lib/medicationStore";

interface AddMedicineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

export default function AddMedicineDialog({ open, onOpenChange, onSaved }: AddMedicineDialogProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("once daily");
  const [form, setForm] = useState("Tablet");
  const [timeBlock, setTimeBlock] = useState<StoredMedication["timeBlock"]>("Morning");
  const [instructions, setInstructions] = useState("");
  const [prescribedBy, setPrescribedBy] = useState("");

  const resetForm = () => {
    setName(""); setDosage(""); setFrequency("once daily"); setForm("Tablet");
    setTimeBlock("Morning"); setInstructions(""); setPrescribedBy("");
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    if (!dosage.trim()) {
      toast({ title: "Dosage is required", variant: "destructive" });
      return;
    }

    const med: StoredMedication = {
      id: String(Date.now()),
      name: name.trim(),
      dosage: dosage.trim(),
      frequency,
      form,
      timeBlock,
      instructions: instructions.trim(),
      prescribedBy: prescribedBy.trim(),
      startedDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    saveMedication(med);
    toast({ title: `${med.name} saved ✓`, description: `Added to ${timeBlock} block.` });
    resetForm();
    onOpenChange(false);
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Medicine</DialogTitle>
          <DialogDescription>Fill out the details below and tap Save to store your medication.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium">Medication Name *</label>
            <Input placeholder="e.g., Metformin" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Dosage *</label>
              <Input placeholder="e.g., 500 mg" value={dosage} onChange={(e) => setDosage(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Form</label>
              <Select value={form} onValueChange={setForm}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tablet">Tablet</SelectItem>
                  <SelectItem value="Capsule">Capsule</SelectItem>
                  <SelectItem value="Liquid">Liquid</SelectItem>
                  <SelectItem value="Injection">Injection</SelectItem>
                  <SelectItem value="Patch">Patch</SelectItem>
                  <SelectItem value="Inhaler">Inhaler</SelectItem>
                  <SelectItem value="Drops">Drops</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Frequency</label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="once daily">Once daily</SelectItem>
                  <SelectItem value="twice daily">Twice daily</SelectItem>
                  <SelectItem value="three times daily">Three times daily</SelectItem>
                  <SelectItem value="as needed">As needed</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Time Block</label>
              <Select value={timeBlock} onValueChange={(v) => setTimeBlock(v as StoredMedication["timeBlock"])}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Midday">Midday</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Instructions</label>
            <Textarea placeholder="e.g., Take with food, avoid grapefruit" value={instructions} onChange={(e) => setInstructions(e.target.value)} className="mt-1" rows={2} />
          </div>
          <div>
            <label className="text-sm font-medium">Prescribed by</label>
            <Input placeholder="e.g., Dr. Smith" value={prescribedBy} onChange={(e) => setPrescribedBy(e.target.value)} className="mt-1" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => { resetForm(); onOpenChange(false); }}>Cancel</Button>
          <Button onClick={handleSave}>Save Medicine</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
