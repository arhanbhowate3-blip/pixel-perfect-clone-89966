import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppHeader from "@/components/AppHeader";
import DailyChecklist from "./pages/DailyChecklist";
import HabitStreakCalendar from "./pages/HabitStreakCalendar";
import HealthInsights from "./pages/HealthInsights";
import MedicationDetails from "./pages/MedicationDetails";
import ProfileSettings from "./pages/ProfileSettings";
import ConsistencyReport from "./pages/ConsistencyReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<DailyChecklist />} />
          <Route path="/streak" element={<HabitStreakCalendar />} />
          <Route path="/insights" element={<HealthInsights />} />
          <Route path="/medication" element={<MedicationDetails />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/report" element={<ConsistencyReport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
