import { HeroSection } from "@/components/home/HeroSection";
import { ScanInput } from "@/components/home/ScanInput";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <section className="card p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Scan a wallet</h2>
        <p className="text-baseMuted mb-4">
          Enter an ENS name or Base wallet address to generate an onchain profile and score.
        </p>
        <ScanInput />
      </section>
    </div>
  );
}
