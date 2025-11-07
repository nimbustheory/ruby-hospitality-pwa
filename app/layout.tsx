import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UnifiedBottomNav } from "@/components/ui/UnifiedBottomNav";
import { AppHeader } from "@/components/ui/AppHeader";
import { AdminProvider } from "@/lib/admin-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ruby Hospitality | Spokane's Premier Dining & Entertainment",
  description: "Discover exceptional dining, live entertainment, and luxury hospitality across Spokane. From craft cocktails to riverside dining, experience the best of Ruby Hospitality.",
  manifest: "/manifest.json",
  themeColor: "#8B0000",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ruby Hospitality",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AdminProvider>
          {/* Phone-sized container centered on screen */}
          <div className="mx-auto max-w-[430px] min-h-screen bg-charcoal relative shadow-2xl">
            {/* Universal Header with Admin Toggle */}
            <AppHeader />
            
            <div className="min-h-screen bg-charcoal pb-24 pt-24">
              {children}
            </div>
            
            {/* Unified Bottom Nav (switches between consumer/admin) */}
            <UnifiedBottomNav />
          </div>
        </AdminProvider>
      </body>
    </html>
  );
}