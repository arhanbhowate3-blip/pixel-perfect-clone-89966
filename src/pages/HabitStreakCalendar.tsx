import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, X, Star, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type DayStatus = "complete" | "partial" | "missed" | "milestone" | "future" | "empty";

interface CalendarDay {
  day: number;
  status: DayStatus;
  isCurrentMonth: boolean;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const aprilData: CalendarDay[] = [
  { day: 29, status: "empty", isCurrentMonth: false },
  { day: 30, status: "empty", isCurrentMonth: false },
  { day: 31, status: "partial", isCurrentMonth: false },
  { day: 1, status: "complete", isCurrentMonth: true },
  { day: 2, status: "partial", isCurrentMonth: true },
  { day: 3, status: "missed", isCurrentMonth: true },
  { day: 4, status: "complete", isCurrentMonth: true },
  { day: 5, status: "complete", isCurrentMonth: true },
  { day: 6, status: "complete", isCurrentMonth: true },
  { day: 7, status: "partial", isCurrentMonth: true },
  { day: 8, status: "complete", isCurrentMonth: true },
  { day: 9, status: "milestone", isCurrentMonth: true },
  { day: 10, status: "complete", isCurrentMonth: true },
  { day: 11, status: "missed", isCurrentMonth: true },
  { day: 12, status: "complete", isCurrentMonth: true },
  { day: 13, status: "complete", isCurrentMonth: true },
  { day: 14, status: "complete", isCurrentMonth: true },
  { day: 15, status: "partial", isCurrentMonth: true },
  { day: 16, status: "missed", isCurrentMonth: true },
  { day: 17, status: "complete", isCurrentMonth: true },
  { day: 18, status: "complete", isCurrentMonth: true },
  { day: 19, status: "complete", isCurrentMonth: true },
  { day: 20, status: "partial", isCurrentMonth: true },
  { day: 21, status: "missed", isCurrentMonth: true },
  { day: 22, status: "complete", isCurrentMonth: true },
  { day: 23, status: "complete", isCurrentMonth: true },
  { day: 24, status: "complete", isCurrentMonth: true },
  { day: 25, status: "milestone", isCurrentMonth: true },
  { day: 26, status: "complete", isCurrentMonth: true },
  { day: 27, status: "complete", isCurrentMonth: true },
  { day: 28, status: "partial", isCurrentMonth: true },
  { day: 29, status: "missed", isCurrentMonth: true },
  { day: 30, status: "complete", isCurrentMonth: true },
  { day: 1, status: "future", isCurrentMonth: false },
  { day: 2, status: "future", isCurrentMonth: false },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const daySummaries: Record<number, { tasks: { name: string; status: string }[]; completion: number }> = {
  1: { tasks: [{ name: "Morning run", status: "Done" }, { name: "Meditate 10m", status: "Done" }, { name: "Read 20 pages", status: "Done" }], completion: 100 },
  2: { tasks: [{ name: "Morning run", status: "Done" }, { name: "Meditate 10m", status: "Partial" }, { name: "Read 20 pages", status: "Missed" }], completion: 50 },
  3: { tasks: [{ name: "Morning run", status: "Missed" }, { name: "Meditate 10m", status: "Missed" }, { name: "Read 20 pages", status: "Missed" }], completion: 0 },
  10: { tasks: [{ name: "Morning run", status: "Done" }, { name: "Meditate 10m", status: "Partial" }, { name: "Read 20 pages", status: "Missed" }], completion: 67 },
  14: { tasks: [{ name: "Morning run", status: "Done" }, { name: "Meditate 10m", status: "Done" }, { name: "Read 20 pages", status: "Done" }], completion: 100 },
  25: { tasks: [{ name: "Morning run", status: "Done" }, { name: "Meditate 10m", status: "Done" }, { name: "Read 20 pages", status: "Done" }], completion: 100 },
};

function statusColor(status: DayStatus) {
  switch (status) {
    case "complete": return "bg-success text-success-foreground";
    case "partial": return "bg-warning text-warning-foreground";
    case "missed": return "bg-missed text-muted-foreground";
    case "milestone": return "bg-milestone text-milestone-foreground";
    case "future": return "bg-card text-muted-foreground";
    case "empty": return "bg-card text-muted-foreground";
  }
}

function statusIcon(status: DayStatus) {
  switch (status) {
    case "complete": return <Check className="w-3.5 h-3.5" />;
    case "partial": return <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />;
    case "missed": return <X className="w-3.5 h-3.5" />;
    case "milestone": return <Star className="w-3.5 h-3.5" />;
    default: return null;
  }
}

function taskStatusIcon(status: string) {
  if (status === "Done") return <Check className="w-4 h-4 text-success" />;
  if (status === "Partial") return <Check className="w-4 h-4 text-warning" />;
  return <X className="w-4 h-4 text-muted-foreground" />;
}

export default function HabitStreakCalendar() {
  const [selectedDay, setSelectedDay] = useState(10);
  const [monthIndex, setMonthIndex] = useState(3); // April = 3
  const [dailyReminder, setDailyReminder] = useState(true);
  const [todayMarked, setTodayMarked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const summary = daySummaries[selectedDay] || {
    tasks: [{ name: "Morning run", status: "Done" }, { name: "Meditate 10m", status: "Partial" }, { name: "Read 20 pages", status: "Missed" }],
    completion: 67,
  };

  const prevMonth = () => {
    setMonthIndex((p) => (p === 0 ? 11 : p - 1));
    toast({ title: `Viewing ${months[monthIndex === 0 ? 11 : monthIndex - 1]} 2026` });
  };

  const nextMonth = () => {
    setMonthIndex((p) => (p === 11 ? 0 : p + 1));
    toast({ title: `Viewing ${months[monthIndex === 11 ? 0 : monthIndex + 1]} 2026` });
  };

  const handleDayClick = (day: CalendarDay, idx: number) => {
    if (!day.isCurrentMonth) return;
    setSelectedDay(day.day);
  };

  const markTodayComplete = () => {
    setTodayMarked(true);
    toast({ title: "Today marked as complete ✓", description: "All habits recorded for today." });
  };

  const toggleReminder = (checked: boolean) => {
    setDailyReminder(checked);
    toast({ title: checked ? "Daily reminder enabled" : "Daily reminder disabled" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Button variant="ghost" size="icon" onClick={prevMonth}><ChevronLeft className="w-5 h-5" /></Button>
              <h1 className="text-2xl font-bold">{months[monthIndex]} 2026</h1>
              <Button variant="ghost" size="icon" onClick={nextMonth}><ChevronRight className="w-5 h-5" /></Button>
              <span className="ml-2 px-3 py-1 rounded-full border border-primary text-primary text-sm font-medium">
                Current streak: <strong>7 days</strong>
              </span>
              <div className="flex-1" />
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <ChevronLeft className="w-4 h-4" />
                <span>Swipe or use arrows to move between months</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm flex-wrap">
              <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-success" /> Fully completed</div>
              <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-warning" /> Partial completion</div>
              <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-missed" /> Missed</div>
              <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-milestone" /> Milestone</div>
              <div className="flex-1" />
              <span className="text-muted-foreground">Week starts Mon</span>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((d) => (
                  <div key={d} className="text-center text-sm font-medium text-muted-foreground py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {aprilData.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => handleDayClick(day, i)}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-1 text-sm font-medium transition-all ${statusColor(day.status)} ${!day.isCurrentMonth ? "opacity-50 cursor-default" : "cursor-pointer hover:ring-2 hover:ring-primary"} ${day.isCurrentMonth && day.day === selectedDay ? "ring-2 ring-foreground" : ""}`}
                  >
                    <span>{day.day}</span>
                    {statusIcon(day.status)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-5 mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Apr {selectedDay}, 2026 — Summary</h3>
                <span className="text-sm text-muted-foreground">Updated 8:12 AM</span>
              </div>
              <div className="space-y-2">
                {summary.tasks.map((task, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {taskStatusIcon(task.status)}
                      <span className="text-sm">{task.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{task.status}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Completion: {summary.completion}%</span>
                <Button size="sm" className="bg-foreground text-card rounded-full" onClick={() => navigate("/")}>Open checklist</Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Month Overview</h3>
                <CalendarCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Completed</p><p className="text-xl font-bold text-primary">18</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Partial</p><p className="text-xl font-bold text-destructive">5</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Missed</p><p className="text-xl font-bold">7</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Milestones</p><p className="text-xl font-bold text-primary">2</p></div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Streak Progress</h3>
                <span className="text-lg">🔥</span>
              </div>
              <p className="text-sm">Current streak: <strong>7 days</strong></p>
              <div className="w-full bg-secondary rounded-full h-2 mt-3 mb-6">
                <div className="bg-primary h-2 rounded-full" style={{ width: "33%" }} />
              </div>
              <p className="text-sm">Best streak: <strong>21 days</strong></p>
            </div>

            <div className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Quick Actions</h3>
                <span className="text-warning">⚡</span>
              </div>
              <Button
                className={`w-full mb-3 ${todayMarked ? "bg-success text-success-foreground" : "bg-foreground text-card"}`}
                onClick={markTodayComplete}
                disabled={todayMarked}
              >
                {todayMarked ? "Today Complete ✓" : "Mark Today as Complete"}
              </Button>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Daily reminder</span>
                <Switch checked={dailyReminder} onCheckedChange={toggleReminder} />
              </div>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>View full checklist</Button>
            </div>

            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-4">Recent Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-lg">🏆</div>
                  <div>
                    <p className="text-sm font-semibold">Milestone: 7-day streak</p>
                    <p className="text-xs text-muted-foreground">Achieved on Apr 9, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-milestone/20 flex items-center justify-center text-lg">⬆️</div>
                  <div>
                    <p className="text-sm font-semibold">Last missed day</p>
                    <p className="text-xs text-muted-foreground">Apr 16, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
