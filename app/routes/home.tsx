import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { Server, Users, Shield, Zap, ChevronRight, Copy, Check } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Minerva SMP - The Ultimate Minecraft Experience" },
    { name: "description", content: "Join Minerva SMP, a premium survival multiplayer Minecraft server." },
  ];
}

interface ServerStatus {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
  version: string;
}

export default function Home() {
  const SERVER_IP = "soon";
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fetch server status from a public API
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
        const data = await res.json();
        setStatus({
          online: data.online,
          players: {
            online: data.players?.online || 0,
            max: data.players?.max || 0,
          },
          version: data.version || "1.20.4",
        });
      } catch (error) {
        console.error("Failed to fetch server status:", error);
        setStatus({ online: false, players: { online: 0, max: 0 }, version: "Unknown" });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <img className="rounded-md" src="/minerva-smp-icon.png" alt="Minerva SMP" width={40} height={40} />
            </div>
            <span className="font-bold text-xl tracking-tight">Minerva SMP</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="/" className="text-white">Home</a>
            <a href="https://discord.gg/kEDZWHXqqm" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Discord</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
          </div>
          <a 
            href="/donate" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
          >
            🔥 Support Server
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8">
            <span className="relative flex h-2.5 w-2.5">
              {loading ? (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              ) : status?.online ? (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              ) : (
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${loading ? 'bg-yellow-500' : status?.online ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="text-gray-300">
              {loading ? "Checking Status..." : status?.online ? `${status.players.online} Players Online` : "Server Offline"}
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
            The Ultimate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Minecraft Experience
            </span>
          </h1>
          
          <p className="max-w-2xl text-lg text-gray-400 mb-12 leading-relaxed">
            Join a passionate community of builders, explorers, and survivors. 
            Experience custom features, a balanced economy, and dedicated staff on Minerva SMP.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={copyIp}
              className="group cursor-pointer relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5"
            >
              <span>{SERVER_IP}</span>
              <div className="w-px h-4 bg-white/20" />
              {copied ? <Check size={18} /> : <Copy size={18} className="group-hover:scale-110 transition-transform" />}
            </button>
            <a 
              href="https://discord.gg/kEDZWHXqqm" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5"
            >
              Join Discord
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Server className="w-6 h-6 text-indigo-400" />}
              title="Lag-Free Performance"
              description="Hosted on premium dedicated hardware ensuring a smooth 20 TPS blocky experience."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-purple-400" />}
              title="Grief Protection"
              description="Advanced claiming tools and active staff keep your builds and items 100% secure."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-emerald-400" />}
              title="Custom Experience"
              description="Enjoy balanced economy, custom enchants, and unique events tailored for players."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/5 mt-auto">
        <p>© {new Date().getFullYear()} Minerva SMP. Not affiliated with Mojang AB.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
