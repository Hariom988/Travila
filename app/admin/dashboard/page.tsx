// app/admin/dashboard/page.tsx
import HotelManagementDashboard from "./dashboard-client";

export const metadata = {
  title: "Hotel Management Dashboard",
  description: "Manage your hotels",
};

export default function DashboardPage() {
  return <HotelManagementDashboard />;
}
