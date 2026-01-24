export const metadata = {
  title: 'Hotel Management Dashboard',
  description: 'Manage your hotels',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}