import { Link, useLocation } from "react-router-dom";
import { Bell, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { label: "Daily Medication Checklist", path: "/" },
  { label: "Habit Streak Calendar", path: "/streak" },
  { label: "Health Insights Summary", path: "/insights" },
  { label: "Medication Details", path: "/medication" },
];

export default function AppHeader() {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
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
        <span className="text-sm text-muted-foreground hidden sm:block">
          Today • Apr 12, 2026
        </span>
        <Bell className="w-5 h-5 text-muted-foreground" />
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
