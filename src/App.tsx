import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppHeader from "@/components/AppHeader";
import DailyChecklist from "@/pages/DailyChecklist";
import HabitStreakCalendar from "@/pages/HabitStreakCalendar";
import HealthInsights from "@/pages/HealthInsights";
import MedicationDetails from "@/pages/MedicationDetails";
import ConsistencyReport from "@/pages/ConsistencyReport";
import ProfileSettings from "@/pages/ProfileSettings";
import Reports from "@/pages/Reports";

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        <p className="text-muted-foreground mt-2">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={base}>
          <AppHeader />
          <Routes>
            <Route path="/" element={<DailyChecklist />} />
            <Route path="/streak" element={<HabitStreakCalendar />} />
            <Route path="/insights" element={<HealthInsights />} />
            <Route path="/medication" element={<MedicationDetails />} />
            <Route path="/report" element={<ConsistencyReport />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
