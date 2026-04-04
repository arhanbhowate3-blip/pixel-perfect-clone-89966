import { Activity, Pill, Flame, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main content */}
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

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
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

              {/* Chart + Tip */}
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
                    <Button size="sm" className="bg-primary text-primary-foreground rounded-full">Set Reminder</Button>
                    <Button size="sm" variant="outline" className="rounded-full text-primary border-primary">Remind later</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Last sync: Mar 28, 2026 • Next check-in: Mar 29</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">Summary: Average adherence 92% • Next goal: 95%</p>

              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" className="rounded-full">View full insights</Button>
                <Button className="bg-primary text-primary-foreground rounded-full">Share report</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
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
                <div className="bg-primary/5 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Avg Sleep</p>
                  <p className="font-bold">7.4 hrs</p>
                </div>
                <div className="bg-warning/10 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Mood Avg</p>
                  <p className="font-bold">4.1 / 5</p>
                </div>
                <div className="bg-primary/5 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Hydration</p>
                  <p className="font-bold">1.9 L/day</p>
                </div>
                <div className="bg-warning/10 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Exercise</p>
                  <p className="font-bold">3 sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 WellTrack Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Help</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
