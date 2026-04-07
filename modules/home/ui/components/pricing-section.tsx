import { PricingTable } from "@clerk/nextjs";

export const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-white/5  py-32"
    >
      {/* Flares */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-150 w-150 -translate-y-1/2 rounded-full bg-[#d84b67]/8 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-150 w-150 translate-y-1/2 rounded-full bg-violet-500/8 blur-[140px]" />

      <div className="container relative  mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6">

        {/* Label pill */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-[#d84b67]/25 bg-[#d84b67]/10 px-4 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#d84b67]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#d84b67]">
            Pricing
          </span>
        </div>

        {/* Heading */}
        <div className="mb-16 max-w-xl text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight  md:text-5xl" style={{ letterSpacing: "-1px" }}>
            Everything you need.{" "}
            <span className="bg-linear-to-r from-zinc-400 to-[#d84b67] bg-clip-text text-transparent">
              Nothing you don't.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-zinc-500">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Clerk PricingTable wrapper */}
        <div className="w-full rounded-2xl border border-white/6 bg-white/2 p-1.5 backdrop-blur-sm">
          <PricingTable />
        </div>

        {/* Footer trust row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
          <span>No credit card required</span>
          <span className="h-3 w-px bg-zinc-800" />
          <span>Cancel anytime</span>
          <span className="h-3 w-px bg-zinc-800" />
          <span>Secure payments via Stripe</span>
        </div>

      </div>
    </section>
  );
};