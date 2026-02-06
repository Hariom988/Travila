export const metadata = {
  title: "My Bookings - Travila",
  description: "View and manage your hotel and activity reservations",
};

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
