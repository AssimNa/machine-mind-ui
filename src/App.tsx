
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { MachinesPage } from "@/pages/machines/MachinesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected routes */}
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/machines" element={<MachinesPage />} />
                {/* Add more routes as you build them */}
                {/* <Route path="/machines/:id" element={<MachineDetailPage />} /> */}
                {/* <Route path="/maintenance" element={<MaintenancePage />} /> */}
                {/* <Route path="/maintenance/tasks" element={<MaintenanceTasksPage />} /> */}
                {/* <Route path="/maintenance/schedules" element={<MaintenanceSchedulesPage />} /> */}
                {/* <Route path="/inventory" element={<InventoryPage />} /> */}
                {/* <Route path="/reports" element={<ReportsPage />} /> */}
                {/* <Route path="/alerts" element={<AlertsPage />} /> */}
                {/* <Route path="/analytics" element={<AnalyticsPage />} /> */}
                {/* <Route path="/users" element={<UsersPage />} /> */}
                {/* <Route path="/settings" element={<SettingsPage />} /> */}
                {/* <Route path="/help" element={<HelpPage />} /> */}
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
              </Route>
              
              {/* Redirect to dashboard if accessing root */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
