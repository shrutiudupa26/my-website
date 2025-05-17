import type { Metadata } from "next";
import { Sora, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import { getProfileData } from "@/lib/notion";
import FloatingElements from "@/components/FloatingElements";
import { Analytics } from '@vercel/analytics/react';

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Shruti Udupa",
  description: "My personal website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getProfileData();

  return (
    <html lang="en" className={`${sora.variable} ${montserrat.variable}`}>
      <body className="bg-dark text-light" suppressHydrationWarning>
        {/* Background Layers */}
        <div className="fixed inset-0 -z-20">
          <div 
            className="w-full h-full"
            style={{
              background: `
                linear-gradient(
                  180deg, 
                  #4d1852 0%,    /* Lighter Violet for header */
                  #4d1852 15%,   /* Lighter Violet */
                  #3d1442 30%,   /* Darker Violet */
                  #3d1442 100%   /* Darker Violet for body */
                )
              `
            }}
          />
        </div>
        
        {/* Floating Elements Layer */}
        <div className="fixed inset-0 -z-10">
          <FloatingElements />
        </div>

        {/* Content Layer */}
        <div className="relative z-10">
          <Navigation name={profile.name} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
