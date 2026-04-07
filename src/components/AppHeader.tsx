import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Heart, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { label: "Daily Medication Checklist", path: "/" },
  { label: "Habit Streak Calendar", path: "/streak" },
  { label: "Health Insights Summary", path: "/insights" },
  { label: "Medication Details", path: "/medication" },
  { label: "Consistency Report", path: "/report" },
];

export default function AppHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('Apr 8, 2026');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <header className="border-b border-border bg-card">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <span>WellTrack Daily</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-foreground text-card"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground hidden sm:flex items-center gap-1">
  <span>Today •</span>
  {isEditing ? (
    <input
      type="text"
      value={currentDate}
      onChange={(e) => setCurrentDate(e.target.value)}
      onBlur={() => setIsEditing(false)}
      onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
      className="border rounded px-1 w-28 bg-background text-foreground outline-none ring-1 ring-primary"
      autoFocus
    />
  ) : (
    <span 
      onClick={() => setIsEditing(true)} 
      className="font-medium cursor-pointer hover:text-primary transition-colors hover:underline"
    >
      {currentDate}
    </span>
  )}
</div>
          <Bell className="w-5 h-5 text-muted-foreground" />
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden border-t border-border px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-foreground text-card"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
