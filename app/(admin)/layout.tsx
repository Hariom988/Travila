export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-theme bg-gray-900 text-white min-h-screen">
      {children}
    </div>
  );
}
