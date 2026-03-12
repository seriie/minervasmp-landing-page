import { useState } from "react";
import type { Route } from "./+types/donate";
import { ArrowLeft, Wallet, QrCode, CreditCard, ExternalLink, ChevronRight, Check } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Donate | Minerva SMP" },
    { name: "description", content: "Support the Minerva SMP server to keep it running!" },
  ];
}

type Gateway = "ewallet" | "qris" | "paypal" | "saweria";

export default function Donate() {
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);

  const gateways = [
    {
      id: "ewallet" as Gateway,
      name: "E-Wallet Indonesia",
      description: "OVO, DANA, GoPay, LinkAja",
      icon: <Wallet className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "qris" as Gateway,
      name: "QRIS",
      description: "Scan to pay with any supported app",
      icon: <QrCode className="w-6 h-6 text-indigo-400" />,
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: "paypal" as Gateway,
      name: "PayPal",
      description: "International payments",
      icon: <CreditCard className="w-6 h-6 text-sky-400" />,
      color: "from-sky-500 to-blue-700"
    },
    {
      id: "saweria" as Gateway,
      name: "Saweria",
      description: "Support via Saweria (Alerts on Stream/Discord)",
      icon: <ExternalLink className="w-6 h-6 text-amber-400" />,
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span className="font-bold text-gray-300 group-hover:text-white transition-colors">Back to Home</span>
          </a>
          <div className="flex items-center gap-3">
             <span className="font-bold text-xl tracking-tight">Minerva SMP</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Support the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Server</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            100% of donations go directly towards server hosting, performance upgrades, and plugin development. Choose a payment method below.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {gateways.map((gw) => (
              <button
                key={gw.id}
                onClick={() => setSelectedGateway(gw.id)}
                className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all ${
                  selectedGateway === gw.id 
                    ? `bg-white/10 border-white/30 ring-2 ring-white/20 translate-y-[-2px]` 
                    : `bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20`
                }`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${gw.color} flex items-center justify-center shadow-lg bg-opacity-20`}>
                  {gw.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white mb-1">{gw.name}</h3>
                  <p className="text-gray-400 text-sm">{gw.description}</p>
                </div>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                  selectedGateway === gw.id ? "bg-white border-white text-gray-900" : "border-gray-700 text-transparent"
                }`}>
                  <Check size={14} className={selectedGateway === gw.id ? "opacity-100" : "opacity-0"} />
                </div>
              </button>
            ))}
          </div>

          {/* Dynamic Payment Content Panel */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[300px]">
            {!selectedGateway ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                <Wallet className="w-16 h-16 text-gray-800 mb-4" />
                <p>Select a payment method above to continue</p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <PaymentContent gateway={selectedGateway} />
              </div>
            )}
          </div>
        </div>
      </section>
      
    </div>
  );
}

function PaymentContent({ gateway }: { gateway: Gateway }) {
  if (gateway === "saweria") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6 border border-amber-500/30">
          <ExternalLink className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Support via Saweria</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Donations made through Saweria will trigger an alert on the Discord server! You can use GoPay, OVO, DANA, LinkAja, or QRIS via Saweria.
        </p>
        <a 
          href="https://saweria.co/Youknowwhat" // Placeholder URL
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-bold text-white shadow-xl shadow-amber-500/20 hover:-translate-y-0.5 transition-all"
        >
          Open Saweria
          <ChevronRight size={18} />
        </a>
      </div>
    );
  }

  // Placeholder for direct integrations
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30">
        <img src="https://via.placeholder.com/80/transparent/FFF?text=DEV" alt="Integration coming soon" className="opacity-50" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Direct {gateway.toUpperCase()} integration is currently in development. Our Discord bot will automatically process these payments soon.
      </p>
      <button disabled className="px-8 py-4 bg-white/5 text-gray-500 rounded-xl font-bold cursor-not-allowed">
        Integration Unavailable
      </button>
    </div>
  );
}
