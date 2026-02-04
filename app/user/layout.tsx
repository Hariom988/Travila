import { GoogleOAuthProvider } from "@react-oauth/google";
import { Suspense } from "react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-theme bg-gray-900 text-white min-h-screen">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <Suspense>{children}</Suspense>
      </GoogleOAuthProvider>
    </div>
  );
}
