import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LineChart, Line, Tooltip, CartesianGrid, PieChart, Pie } from "recharts";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Award, Pill, Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAdherenceByDate, getWeeklyAdherence, getMedicationAdherence, getStreakInfo, getMedications, getDoseLogs } from "@/lib/medicationStore";

export default function ConsistencyReport() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(30);

  const dailyData = useMemo(() => getAdherenceByDate(timeRange), [timeRange]);
  const weeklyData = useMemo(() => getWeeklyAdherence(), []);
  const medAdherence = useMemo(() => getMedicationAdherence(), []);
  const streak = useMemo(() => getStreakInfo(), []);
  const medications = useMemo(() => getMedications(), []);
  const allLogs = useMemo(() => getDoseLogs(), []);

  const avgAdherence = dailyData.length > 0 ? Math.round(dailyData.reduce((s, d) => s + d.adherence, 0) / dailyData.length) : 0;
  const totalDoses = dailyData.reduce((s, d) => s + d.taken, 0);
  const totalMissed = allLogs.filter((l) => l.status === "missed").length;
  const bestDay = dailyData.reduce((best, d) => d.adherence > best.adherence ? d : best, dailyData[0] || { date: "-", adherence: 0 });
  const worstDay = dailyData.reduce((worst, d) => d.adherence < worst.adherence ? d : worst, dailyData[0] || { date: "-", adherence: 100 });

  const pieData = [
    { name: "Taken", value: totalDoses, fill: "hsl(152 69% 31%)" },
    { name: "Missed", value: totalMissed, fill: "hsl(0 84% 60%)" },
    { name: "Snoozed", value: allLogs.filter((l) => l.status === "snoozed").length, fill: "hsl(45 93% 58%)" },
  ];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Consistency Report</h1>
              <p className="text-sm text-muted-foreground">Your medication adherence progress and trends</p>
            </div>
          </div>
          <div className="flex gap-2">
            {([7, 14, 30] as const).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={timeRange === r ? "default" : "outline"}
                onClick={() => setTimeRange(r)}
                className={timeRange === r ? "bg-foreground text-card" : ""}
              >
                {r}D
              </Button>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Avg Adherence</span>
            </div>
            <p className="text-3xl font-bold text-primary">{avgAdherence}%</p>
            <p className="text-xs text-muted-foreground mt-1">Last {timeRange} days</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Pill className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Doses Taken</span>
            </div>
            <p className="text-3xl font-bold text-success">{totalDoses}</p>
            <p className="text-xs text-muted-foreground mt-1">of {medications.length * timeRange} scheduled</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Current Streak</span>
            </div>
            <p className="text-3xl font-bold">{streak.current} <span className="text-base font-normal">days</span></p>
            <p className="text-xs text-muted-foreground mt-1">Best: {streak.best} days</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Medications</span>
            </div>
            <p className="text-3xl font-bold">{medications.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Active prescriptions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-6">
            {/* Daily adherence chart */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h2 className="font-semibold mb-1">Daily Adherence Trend</h2>
              <p className="text-xs text-muted-foreground mb-4">Percentage of doses taken each day</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                  <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v: number) => [`${v}%`, "Adherence"]} labelFormatter={(l) => `Date: ${l}`} />
                  <Line type="monotone" dataKey="adherence" stroke="hsl(152 69% 31%)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly comparison */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h2 className="font-semibold mb-1">Weekly Comparison</h2>
              <p className="text-xs text-muted-foreground mb-4">Average adherence per week</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v: number) => [`${v}%`, "Adherence"]} />
                  <Bar dataKey="adherence" radius={[6, 6, 0, 0]}>
                    {weeklyData.map((entry, i) => (
                      <Cell key={i} fill={entry.adherence >= 80 ? "hsl(152 69% 31%)" : entry.adherence >= 60 ? "hsl(45 93% 58%)" : "hsl(0 84% 60%)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Per-medication breakdown */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h2 className="font-semibold mb-1">Per-Medication Adherence</h2>
              <p className="text-xs text-muted-foreground mb-4">How consistently you take each medication</p>
              <div className="space-y-3">
                {medAdherence.map((med) => (
                  <div key={med.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{med.name}</span>
                      <span className={`text-sm font-bold ${med.adherence >= 80 ? "text-primary" : med.adherence >= 60 ? "text-warning" : "text-destructive"}`}>
                        {med.adherence}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${med.adherence >= 80 ? "bg-primary" : med.adherence >= 60 ? "bg-warning" : "bg-destructive"}`}
                        style={{ width: `${med.adherence}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{med.taken} taken · {med.missed} missed</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Dose distribution pie */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-1">Dose Distribution</h3>
              <p className="text-xs text-muted-foreground mb-4">Overall dose outcomes</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {pieData.map((p) => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.fill }} />
                    <span className="text-xs text-muted-foreground">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-3">Key Insights</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Best Day</p>
                    <p className="text-xs text-muted-foreground">{bestDay?.date} — {bestDay?.adherence}% adherence</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Needs Improvement</p>
                    <p className="text-xs text-muted-foreground">{worstDay?.date} — {worstDay?.adherence}% adherence</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Streak Goal</p>
                    <p className="text-xs text-muted-foreground">Current {streak.current} days — aim for {streak.best + 7}!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-3">Recommendations</h3>
              <div className="space-y-2">
                {avgAdherence < 80 && (
                  <p className="text-sm text-muted-foreground">⚠️ Your adherence is below 80%. Try setting additional reminders for missed time blocks.</p>
                )}
                {avgAdherence >= 80 && avgAdherence < 95 && (
                  <p className="text-sm text-muted-foreground">👍 Good progress! You're close to 95%. Focus on the medications with lowest adherence.</p>
                )}
                {avgAdherence >= 95 && (
                  <p className="text-sm text-muted-foreground">🌟 Excellent! Keep up the amazing consistency.</p>
                )}
                {medAdherence.filter((m) => m.adherence < 70).length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    💊 {medAdherence.filter((m) => m.adherence < 70).map((m) => m.name).join(", ")} need{medAdherence.filter((m) => m.adherence < 70).length === 1 ? "s" : ""} attention — consider adjusting timing.
                  </p>
                )}
              </div>
            </div>

            <Button className="w-full bg-foreground text-card" onClick={() => navigate("/")}>
              Back to Checklist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
