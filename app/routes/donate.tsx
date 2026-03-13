import { useState } from "react";
import type { Route } from "./+types/donate";
import { ArrowLeft, Wallet, QrCode, CreditCard, ExternalLink, ChevronRight, Check } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
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
      color: "from-emerald-500 to-teal-600",
      available: false
    },
    {
      id: "qris" as Gateway,
      name: "QRIS",
      description: "Scan to pay with any supported app",
      icon: <QrCode className="w-6 h-6 text-indigo-400" />,
      color: "from-indigo-500 to-blue-600",
      available: true
    },
    {
      id: "paypal" as Gateway,
      name: "PayPal",
      description: "International payments",
      icon: <CreditCard className="w-6 h-6 text-sky-400" />,
      color: "from-sky-500 to-blue-700",
      available: true
    },
    {
      id: "saweria" as Gateway,
      name: "Saweria (Indonesia & Philippines)",
      description: "Support via Saweria",
      icon: <ExternalLink className="w-6 h-6 text-amber-400" />,
      color: "from-amber-500 to-orange-600",
      available: true
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
                disabled={!gw.available}
                key={gw.id}
                onClick={() => setSelectedGateway(gw.id)}
                className={`${!gw.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} flex items-start gap-4 p-5 rounded-2xl border text-left transition-all ${selectedGateway === gw.id
                  ? `bg-white/10 border-white/30 ring-2 ring-white/20 translate-y-[-2px]`
                  : `bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20`
                  }`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${gw.color} flex items-center justify-center shadow-lg bg-opacity-20`}>
                  {gw.icon}
                </div>
                <div className="flex-1">
                  {gw.available ? (
                    <h3 className="font-bold text-lg text-white mb-1">{gw.name}</h3>
                  ) : (
                    <h3 className="font-bold text-lg text-white mb-1">{gw.name} <span className="text-red-500">| Soon</span></h3>
                  )}
                  <p className="text-gray-400 text-sm">{gw.description}</p>
                </div>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${selectedGateway === gw.id ? "bg-white border-white text-gray-900" : "border-gray-700 text-transparent"
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

  // Native Midtrans Form
  const [amount, setAmount] = useState("50000");
  const [paypalAmount, setPaypalAmount] = useState("5");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  if (gateway === "saweria") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6 border border-amber-500/30">
          <ExternalLink className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Support via Saweria</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Donations made through, You can use GoPay, OVO, DANA, LinkAja, or QRIS via Saweria.
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

  if (gateway === "qris") {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-2">Scan QRIS to Donate</h2>
        <p className="text-gray-400 mb-8 max-w-sm text-center">
          Support Minerva SMP by scanning this QR code with your E-Wallet or Mobile Banking app.
        </p>

        <div className="bg-white p-4 justify-center items-center flex rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-white/20 relative group transition-all hover:scale-105 duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <img
            src="/qris.png"
            alt="Minerva SMP QRIS"
            className="w-64 max-w-full rounded-2xl relative z-10"
          />
        </div>

        <div className="mt-8 py-3 px-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-3">
          <Check className="w-5 h-5 text-indigo-400" />
          <span className="text-indigo-200 font-medium text-sm">Valid for all Indonesian Banking Apps & E-Wallets</span>
        </div>
      </div>
    );
  }

  if (gateway === "ewallet") {
    const handleDonate = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!username || !amount) return;

      setLoading(true);
      try {
        const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || "";
        const res = await fetch(`${apiBaseUrl}/api/donate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, message, amount: parseInt(amount, 10) }),
        });

        const data = await res.json();
        if (data.token) {
          // Trigger the Midtrans Snap Popup
          // @ts-ignore
          window.snap.pay(data.token, {
            onSuccess: function (result: any) {
              alert("Payment Success! Thank you for supporting Minerva SMP!");
              setLoading(false);
            },
            onPending: function (result: any) {
              alert("Payment Pending. Please complete your payment.");
              setLoading(false);
            },
            onError: function (result: any) {
              alert("Payment Failed. Please try again.");
              setLoading(false);
            },
            onClose: function () {
              setLoading(false);
            }
          });
        } else {
          alert("Failed to create transaction token.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Payment error:", error);
        alert("An error occurred. Check console for details.");
        setLoading(false);
      }
    };

    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-2">Donate with {gateway.toUpperCase()}</h2>
        <p className="text-gray-400 mb-8 max-w-sm text-center">
          Payment processed securely by Midtrans.
        </p>

        <form onSubmit={handleDonate} className="w-full max-w-sm flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="username">
              Minecraft Username
            </label>
            <input
              required
              id="username"
              type="text"
              placeholder="e.g. Notch"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="amount">
              Donation Amount (Rp)
            </label>
            <input
              required
              id="amount"
              type="number"
              min="10000"
              step="1000"
              placeholder="50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="message">
              Message (Optional)
            </label>
            <textarea
              id="message"
              placeholder="Your support message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 cursor-pointer w-full flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : `Donate Rp ${parseInt(amount || "0").toLocaleString("id-ID")}`}
          </button>
        </form>
      </div>
    );
  }

  if (gateway === "paypal") {
    const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || "";

    const handlePayPalDonate = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!username || !paypalAmount) return;

      setLoading(true);
      try {
        const res = await fetch(`${apiBaseUrl}/api/paypal/donate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            username, 
            message,
            amount: parseInt(paypalAmount, 10),
            return_url: `${window.location.origin}/paypal-success`,
            cancel_url: `${window.location.origin}/donate`
          }),
        });
        
        const data = await res.json();
        if (data.url) {
           // Redirect User to the PayPal Checkout URL
           window.location.href = data.url;
        } else {
           alert("Failed to initiate PayPal checkout. " + (data.error || ""));
           setLoading(false);
        }
      } catch (err) {
        console.error("PayPal Error:", err);
        alert("An error occurred while connecting to PayPal.");
        setLoading(false);
      }
    };

    return (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-2">Donate with {gateway.toUpperCase()}</h2>
          <p className="text-gray-400 mb-8 max-w-sm text-center">
            Payment processed securely by PayPal.
          </p>

          <form className="w-full max-w-sm flex flex-col gap-4 mb-4" onSubmit={handlePayPalDonate}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="paypal-username">
                Minecraft Username
              </label>
              <input
                required
                id="paypal-username"
                type="text"
                placeholder="e.g. Notch"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="paypal-amount">
                Donation Amount (USD)
              </label>
              <input
                required
                id="paypal-amount"
                type="number"
                min="1"
                step="1"
                placeholder="5"
                value={paypalAmount}
                onChange={(e) => setPaypalAmount(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="paypal-message">
                Message (Optional)
              </label>
              <textarea
                id="paypal-message"
                placeholder="Your support message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 h-24 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !username || !paypalAmount || parseInt(paypalAmount) < 1}
              className="mt-4 cursor-pointer w-full flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-700 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : `Donate $${parseInt(paypalAmount || "0").toLocaleString("en-US")}`}
            </button>
          </form>
        </div>
    );
  }

  return null;
}
