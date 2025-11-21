import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { ScanInput } from "@/components/home/ScanInput";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="-mt-10 relative z-20 mb-20">
          <ScanInput />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-soft-blue/30">
            <h3 className="text-xl font-bold text-dark-text mb-2">Track Assets</h3>
            <p className="text-muted-text">View all your tokens, NFTs, and DeFi positions in one place.</p>
          </div>
          <div className="p-6 rounded-2xl bg-soft-blue/30">
            <h3 className="text-xl font-bold text-dark-text mb-2">Get Scored</h3>
            <p className="text-muted-text">Our engine analyzes your onchain history to generate a unique score.</p>
          </div>
          <div className="p-6 rounded-2xl bg-soft-blue/30">
            <h3 className="text-xl font-bold text-dark-text mb-2">Compete</h3>
            <p className="text-muted-text">Publish your score onchain and climb the global leaderboard.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
