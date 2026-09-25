import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingAiChat } from "@/components/ui/FloatingAiChat";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuroraBackground>
      <div className="flex min-h-screen w-full">
        {/* Modern Collapsible / Responsive Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24">
            {children}
          </main>
        </div>

        {/* Global Floating AI Health Assistant (Gemini + Voice) */}
        <FloatingAiChat />
      </div>
    </AuroraBackground>
  );
}
