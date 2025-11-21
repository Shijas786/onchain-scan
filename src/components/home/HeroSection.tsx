export function HeroSection() {
  return (
    <section className="rounded-3xl bg-hero-gradient text-white p-6 md:p-10 shadow-card">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Track Base onchain profiles.
          <br />
          Score them. Flex on the leaderboard.
        </h1>
        <p className="text-sm md:text-base text-white/80">
          Enter any Base address or ENS to analyze tokens, NFTs, liquidity positions,
          and transactions — then turn it into a single onchain score.
        </p>
      </div>
    </section>
  );
}
