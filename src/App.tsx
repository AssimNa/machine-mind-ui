
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

// Import path placeholders for future pages
// These will need to be created as separate files for each route
const MachineDetailPage = () => <div>Machine Detail Page - Coming Soon</div>;
const MaintenancePage = () => <div>Maintenance Page - Coming Soon</div>;
const MaintenanceTasksPage = () => <div>Maintenance Tasks Page - Coming Soon</div>;
const MaintenanceSchedulesPage = () => <div>Maintenance Schedules Page - Coming Soon</div>;
const InventoryPage = () => <div>Inventory Page - Coming Soon</div>;
const ReportsPage = () => <div>Reports Page - Coming Soon</div>;
const AlertsPage = () => <div>Alerts Page - Coming Soon</div>;
const AnalyticsPage = () => <div>Analytics Page - Coming Soon</div>;
const UsersPage = () => <div>Users Page - Coming Soon</div>;
const SettingsPage = () => <div>Settings Page - Coming Soon</div>;
const HelpPage = () => <div>Help Page - Coming Soon</div>;
const ProfilePage = () => <div>Profile Page - Coming Soon</div>;

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
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/machines" element={<MachinesPage />} />
                <Route path="/machines/:id" element={<MachineDetailPage />} />
                <Route path="/maintenance" element={<MaintenancePage />} />
                <Route path="/maintenance/tasks" element={<MaintenanceTasksPage />} />
                <Route path="/maintenance/schedules" element={<MaintenanceSchedulesPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
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
