import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, X, Star, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type DayStatus = "complete" | "partial" | "missed" | "milestone" | "future" | "empty";

interface CalendarDay {
  day: number;
  status: DayStatus;
  isCurrentMonth: boolean;
}

const aprilData: CalendarDay[] = [
  // Week 1 (Mon-Sun): Mar 29-30, Apr 1-4 (with Sun Apr 4)
  { day: 29, status: "empty", isCurrentMonth: false },
  { day: 30, status: "empty", isCurrentMonth: false },
  { day: 31, status: "partial", isCurrentMonth: false },
  { day: 1, status: "complete", isCurrentMonth: true },
  { day: 2, status: "partial", isCurrentMonth: true },
  { day: 3, status: "missed", isCurrentMonth: true },
  { day: 4, status: "complete", isCurrentMonth: true },
  // Week 2
  { day: 5, status: "complete", isCurrentMonth: true },
  { day: 6, status: "complete", isCurrentMonth: true },
  { day: 7, status: "partial", isCurrentMonth: true },
  { day: 8, status: "complete", isCurrentMonth: true },
  { day: 9, status: "milestone", isCurrentMonth: true },
  { day: 10, status: "complete", isCurrentMonth: true },
  { day: 11, status: "missed", isCurrentMonth: true },
  // Week 3
  { day: 12, status: "complete", isCurrentMonth: true },
  { day: 13, status: "complete", isCurrentMonth: true },
  { day: 14, status: "complete", isCurrentMonth: true },
  { day: 15, status: "partial", isCurrentMonth: true },
  { day: 16, status: "missed", isCurrentMonth: true },
  { day: 17, status: "complete", isCurrentMonth: true },
  { day: 18, status: "complete", isCurrentMonth: true },
  // Week 4
  { day: 19, status: "complete", isCurrentMonth: true },
  { day: 20, status: "partial", isCurrentMonth: true },
  { day: 21, status: "missed", isCurrentMonth: true },
  { day: 22, status: "complete", isCurrentMonth: true },
  { day: 23, status: "complete", isCurrentMonth: true },
  { day: 24, status: "complete", isCurrentMonth: true },
  { day: 25, status: "milestone", isCurrentMonth: true },
  // Week 5
  { day: 26, status: "complete", isCurrentMonth: true },
  { day: 27, status: "complete", isCurrentMonth: true },
  { day: 28, status: "partial", isCurrentMonth: true },
  { day: 29, status: "missed", isCurrentMonth: true },
  { day: 30, status: "complete", isCurrentMonth: true },
  { day: 1, status: "future", isCurrentMonth: false },
  { day: 2, status: "future", isCurrentMonth: false },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

export default function HabitStreakCalendar() {
  const [selectedDay] = useState(10);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main calendar area */}
          <div>
            {/* Month header */}
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="icon"><ChevronLeft className="w-5 h-5" /></Button>
              <h1 className="text-2xl font-bold">April 2026</h1>
              <Button variant="ghost" size="icon"><ChevronRight className="w-5 h-5" /></Button>
              <span className="ml-2 px-3 py-1 rounded-full border border-primary text-primary text-sm font-medium">
                Current streak: <strong>7 days</strong>
              </span>
              <div className="flex-1" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ChevronLeft className="w-4 h-4" />
                <span>Swipe or use arrows to move between months</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-4 text-sm flex-wrap">
              <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-success" /> Fully completed</div>
              <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-warning" /> Partial completion</div>
              <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-missed" /> Missed</div>
              <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-milestone" /> Milestone</div>
              <div className="flex-1" />
              <span className="text-muted-foreground">Week starts Mon</span>
            </div>

            {/* Calendar grid */}
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((d) => (
                  <div key={d} className="text-center text-sm font-medium text-muted-foreground py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {aprilData.map((day, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-1 text-sm font-medium ${statusColor(day.status)} ${!day.isCurrentMonth ? "opacity-50" : ""}`}
                  >
                    <span>{day.day}</span>
                    {statusIcon(day.status)}
                  </div>
                ))}
              </div>
            </div>

            {/* Day summary */}
            <div className="bg-card rounded-lg border border-border p-5 mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Apr 10, 2026 — Summary</h3>
                <span className="text-sm text-muted-foreground">Updated 8:12 AM</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm">Morning run</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Done</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-warning" />
                    <span className="text-sm">Meditate 10m</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Partial</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Read 20 pages</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Missed</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Completion: 67%</span>
                <Button size="sm" className="bg-foreground text-card rounded-full">Open checklist</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Month Overview */}
            <div className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Month Overview</h3>
                <CalendarCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-xl font-bold text-primary">18</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Partial</p>
                  <p className="text-xl font-bold text-destructive">5</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Missed</p>
                  <p className="text-xl font-bold">7</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Milestones</p>
                  <p className="text-xl font-bold text-primary">2</p>
                </div>
              </div>
            </div>

            {/* Streak Progress */}
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

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Quick Actions</h3>
                <span className="text-warning">⚡</span>
              </div>
              <Button className="w-full bg-foreground text-card mb-3">Mark Today as Complete</Button>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Daily reminder</span>
                <div className="w-10 h-5 bg-foreground rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-card rounded-full" />
                </div>
              </div>
              <Button variant="outline" className="w-full">View full checklist</Button>
            </div>

            {/* Recent Highlights */}
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
