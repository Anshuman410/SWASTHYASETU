import { TopNav } from "@/components/landing/TopNav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-emerald-500/25 selection:text-emerald-300">
      <TopNav />
      <main className="flex-1">{children}</main>
      
      {/* Sleek Minimal Footer */}
      <footer className="border-t border-white/5 bg-slate-950/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">SwasthyaSetu</span>
            <span>• Universal Healthcare Coordination Ecosystem</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              National Health Stack Ready (ABHA / ABDM)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
