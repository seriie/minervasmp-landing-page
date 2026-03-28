import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { Server, Shield, Zap, Copy, Check, ChevronRight } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Minerva SMP - The Ultimate Minecraft Experience" },
    { name: "description", content: "Join Minerva SMP, a premium survival multiplayer Minecraft server." },
  ];
}

interface ServerStatus {
  online: boolean;
  players?: { online: number; max: number };
  version?: string;
}

export default function Home() {
  const SERVER_IP = "soon";
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const url = `https://api.mcsrvstat.us/3/minervasmp.raznar.net:25080`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Status API failed");
        
        const data = await res.json();
        console.log("Server Status:", data);
        
        setStatus({
          online: data.online,
          version: data.version || "1.21.11",
          players: data.players
        });
      } catch (err) {
        console.error("Failed to fetch status:", err);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="flex items-center gap-3">
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
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="/" className="text-white relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400 rounded-full scale-x-100 origin-left transition-transform" />
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
            <a
              href="#features"
              className="text-slate-400 hover:text-white transition-colors relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
            </a>
            <a
              href="/perks"
              className="text-slate-400 hover:text-white transition-colors relative group"
            >
              Perks
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
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
      <section className="relative pt-36 pb-24 lg:pt-52 lg:pb-36 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">

          {/* Server status pill */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 text-sm font-semibold mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
          >
            <span className="relative flex h-2.5 w-2.5">
              {loading ? (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
              ) : status?.online ? (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              ) : null}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  loading ? "bg-yellow-500" : status?.online ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
            </span>
            <span className="text-slate-300">
              {loading
                ? "Checking Status…"
                : status?.online ? "Online" : "Offline"
              }
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            The Ultimate<br />
            <span className="shimmer-text">Minecraft Experience</span>
          </h1>

          <p
            className="max-w-2xl text-lg sm:text-xl text-slate-400 mb-14 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.35s", opacity: 0, animationFillMode: "forwards" }}
          >
            Join a passionate community of builders, explorers, and survivors.
            Experience custom features, a balanced economy, and dedicated staff on Minerva SMP.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
          >
            <button
              onClick={copyIp}
              className="btn-primary group relative flex items-center gap-3 cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-[0.875rem]" />
              <span className="font-mono text-sm tracking-widest">{SERVER_IP}</span>
              <div className="w-px h-4 bg-white/25" />
              {copied ? (
                <Check size={17} className="text-emerald-300" />
              ) : (
                <Copy size={17} className="group-hover:scale-110 transition-transform" />
              )}
            </button>

            <a
              href="https://discord.gg/kEDZWHXqqm"
              target="_blank"
              rel="noreferrer"
              className="btn-glass flex items-center gap-2"
            >
              Join Discord
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative py-28 z-10">
        {/* Section glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-indigo-400 font-semibold">
              Why Minerva SMP
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
              Built for the Best Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Server className="w-6 h-6" />}
              iconColor="text-indigo-400"
              glowColor="rgba(99,102,241,0.15)"
              title="Lag-Free Performance"
              description="Hosted on premium dedicated hardware ensuring a smooth 20 TPS blocky experience, no compromises."
              delay="0s"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              iconColor="text-purple-400"
              glowColor="rgba(168,85,247,0.15)"
              title="LifeSteal Plugin"
              description="Kill players to steal their hearts and become stronger, but be careful not to lose your own."
              delay="0.1s"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              iconColor="text-cyan-400"
              glowColor="rgba(34,211,238,0.15)"
              title="Custom Experience"
              description="Enjoy balanced economy, custom enchants, and unique events tailored for every type of player."
              delay="0.2s"
            />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="glass-card p-12 relative overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(99,102,241,0.1), 0 0 0 1px rgba(255,255,255,0.06)" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
              Ready to Join the Adventure?
            </h2>
            <p className="text-slate-400 text-lg mb-8 relative z-10">
              Connect today and discover a world built by the community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button onClick={copyIp} className="btn-primary flex items-center gap-2 cursor-pointer">
                {copied ? <Check size={17} className="text-emerald-300" /> : <Copy size={17} />}
                Copy IP: {SERVER_IP}
              </button>
              <a href="/donate" className="btn-glass flex items-center gap-2">
                🔥 Support Us
              </a>
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

function FeatureCard({
  icon,
  iconColor,
  glowColor,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  iconColor: string;
  glowColor: string;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className="glass-card p-8 group relative overflow-hidden animate-fade-in-up"
      style={{ animationDelay: delay, opacity: 0, animationFillMode: "forwards" }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: glowColor }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${glowColor.replace("0.15", "0.8")}, transparent)` }}
      />

      <div
        className={`w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/10 ${iconColor}`}
        style={{ background: glowColor.replace("0.15", "0.1") }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
