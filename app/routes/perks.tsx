import { useState, useEffect } from "react";
import type { Route } from "./+types/perks";
import { Crown, Star, Zap, Check, ChevronRight, Sparkles } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Perks – Minerva SMP" },
    {
      name: "description",
      content:
        "Support Minerva SMP and unlock exclusive in-game roles: Donator, VIP, and VIP+.",
    },
  ];
}

const tiers = [
  {
    id: "donator",
    name: "Donator",
    price: "$0.70",
    priceUSD: 0.7,
    emoji: "💎",
    icon: Star,
    color: "indigo",
    gradient: "from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.35)",
    glowSoft: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.4)",
    tag: null,
    perks: [
      "Donator role on Discord & ingame",
      "Access to exclusive Donator channel",
      "+15 sethomes ingame",
      "+$20000 balance ingame",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: "$2",
    priceUSD: 2,
    emoji: "⭐",
    icon: Crown,
    color: "amber",
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.35)",
    glowSoft: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.4)",
    tag: "Popular",
    perks: [
      "All Donator benefits",
      "VIP role on Discord & in-game",
      "Access to VIP lounge on Discord",
      "Extra home sets (25 homes)",

    ],
  },
  {
    id: "vip-plus",
    name: "VIP+",
    price: "$5",
    priceUSD: 5,
    emoji: "✨",
    icon: Sparkles,
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    glow: "rgba(168,85,247,0.35)",
    glowSoft: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.4)",
    tag: "Best Value",
    perks: [
      "All VIP benefits",
      "Exclusive VIP+ role",
      "Access to private VIP+ channel",
      "Unlimited home sets",
      "Custom join/leave message",
    ],
  },
];

const colorMap: Record<string, Record<string, string>> = {
  indigo: {
    tag: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    check: "text-indigo-400",
    btn: "from-indigo-500 to-violet-500",
    btnShadow: "rgba(99,102,241,0.4)",
  },
  amber: {
    tag: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    check: "text-amber-400",
    btn: "from-amber-400 to-orange-500",
    btnShadow: "rgba(245,158,11,0.4)",
  },
  purple: {
    tag: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    check: "text-purple-400",
    btn: "from-purple-500 to-pink-500",
    btnShadow: "rgba(168,85,247,0.4)",
  },
};

export default function Perks() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080810] text-slate-100 selection:bg-indigo-500/30 overflow-x-hidden">

      {/* ── Animated Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="blob blob-1 top-[-100px] left-[-100px]" />
        <div className="blob blob-2 top-1/3 right-[-150px]" />
        <div className="blob blob-3 bottom-1/4 left-1/4" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "glass nav-border shadow-2xl"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-indigo-500/30 blur-md animate-pulse" />
              <img
                className="relative rounded-xl w-10 h-10 object-cover ring-1 ring-white/10"
                src="/minerva-smp-icon.png"
                alt="Minerva SMP"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Minerva <span className="gradient-text-indigo">SMP</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a
              href="/"
              className="text-slate-400 hover:text-white transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
            </a>
            <a
              href="https://discord.gg/kEDZWHXqqm"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors relative group"
            >
              Discord
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
            </a>
            <a href="/perks" className="text-white relative group">
              Perks
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400 rounded-full scale-x-100 origin-left transition-transform" />
            </a>
          </div>

          <a
            href="/donate"
            className="relative group flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              boxShadow: "0 0 20px rgba(245,158,11,0.3)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            🔥 Support Server
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-16 lg:pt-52 lg:pb-20 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Minerva SMP Store
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            Unlock Your
            <br />
            <span className="shimmer-text">In-Game Perks</span>
          </h1>

          <p
            className="max-w-xl text-slate-400 text-lg leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.35s", opacity: 0, animationFillMode: "forwards" }}
          >
            Support the server and get exclusive roles along with in-game perks
            that make your experience even better.
          </p>
        </div>
      </section>

      {/* ── Tier Cards ── */}
      <section className="relative z-10 pb-32">
        {/* Top glow divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-indigo-500/40 to-transparent" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {tiers.map((tier, i) => {
              const c = colorMap[tier.color];
              return (
                <div
                  key={tier.id}
                  className="glass-card p-8 relative overflow-hidden group animate-fade-in-up flex flex-col"
                  style={{
                    animationDelay: `${0.1 * i}s`,
                    opacity: 0,
                    animationFillMode: "forwards",
                    boxShadow: tier.tag
                      ? `0 0 0 1px ${tier.border}, 0 0 40px ${tier.glowSoft}`
                      : undefined,
                  }}
                >
                  {/* Background glow on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top, ${tier.glowSoft} 0%, transparent 60%)`,
                    }}
                  />

                  {/* "Popular" / "Best Value" badge */}
                  {tier.tag && (
                    <span
                      className={`absolute top-5 right-5 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${c.tag}`}
                    >
                      {tier.tag}
                    </span>
                  )}

                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ring-1 ring-white/10"
                      style={{ background: tier.glowSoft }}
                    >
                      {tier.emoji}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                        Role
                      </p>
                      <h3
                        className={`text-xl font-extrabold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}
                      >
                        {tier.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8 relative z-10">
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-black text-white leading-none">
                        {tier.price}
                      </span>
                      <span className="text-slate-500 text-sm mb-1 font-medium">/Month</span>
                    </div>
                  </div>

                  {/* Perks list */}
                  <ul className="space-y-3 mb-10 flex-1 relative z-10">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-slate-300">
                        <Check
                          size={16}
                          className={`mt-0.5 shrink-0 ${c.check}`}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="/donate"
                    className="relative group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 z-10"
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      backgroundImage: `linear-gradient(135deg, ${
                        tier.gradient.includes("indigo")
                          ? "#6366f1, #8b5cf6"
                          : tier.gradient.includes("amber")
                          ? "#f59e0b, #f97316"
                          : "#a855f7, #ec4899"
                      })`,
                      boxShadow: `0 0 24px ${tier.glowSoft}`,
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                    Get {tier.name}
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Notice */}
          <div
            className="mt-12 glass border border-white/5 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
          >
            <div className="text-2xl shrink-0">ℹ️</div>
            <div>
              <p className="text-sm text-slate-300 font-semibold mb-0.5">
                Purchase Info
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Roles are <strong className="text-slate-400">monthly</strong>. After completing your payment,
                click the button above and enter your Minecraft username so your role can be applied right away.
                Need help? Reach us on{" "}
                <a
                  href="https://discord.gg/kEDZWHXqqm"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Discord
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <img src="/minerva-smp-icon.png" alt="" className="w-5 h-5 rounded opacity-60" />
            <span>© {new Date().getFullYear()} Minerva SMP</span>
          </div>
          <span>Not affiliated with Mojang AB.</span>
          <a
            href="https://discord.gg/kEDZWHXqqm"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-indigo-400 transition-colors"
          >
            Discord →
          </a>
        </div>
      </footer>
    </div>
  );
}
