import { useState } from "react";
import type { Route } from "./+types/donate";
import { ArrowLeft, Wallet, QrCode, CreditCard, ExternalLink, ChevronRight, Check } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Donate | Minerva SMP" },
    { name: "description", content: "Support the Minerva SMP server to keep it running!" },
  ];
}

type Gateway = "ewallet" | "qris" | "paypal" | "saweria" | "sociabuzz";

export default function Donate() {
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);

  const gateways = [
    {
      id: "ewallet" as Gateway,
      name: "E-Wallet Indonesia",
      description: "OVO, DANA, GoPay, LinkAja",
      icon: <Wallet className="w-5 h-5" />,
      iconColor: "text-emerald-400",
      gradient: "from-emerald-500/20 to-teal-600/20",
      glow: "rgba(52,211,153,0.2)",
      available: false,
    },
    {
      id: "qris" as Gateway,
      name: "QRIS",
      description: "Scan to pay with any supported app",
      icon: <QrCode className="w-5 h-5" />,
      iconColor: "text-indigo-400",
      gradient: "from-indigo-500/20 to-blue-600/20",
      glow: "rgba(99,102,241,0.2)",
      available: false,
    },
    {
      id: "paypal" as Gateway,
      name: "PayPal",
      description: "International payments · USD",
      icon: <CreditCard className="w-5 h-5" />,
      iconColor: "text-sky-400",
      gradient: "from-sky-500/20 to-blue-700/20",
      glow: "rgba(14,165,233,0.2)",
      available: true,
    },
    {
      id: "saweria" as Gateway,
      name: "Saweria",
      description: "Indonesia & Philippines · IDR",
      icon: <ExternalLink className="w-5 h-5" />,
      iconColor: "text-amber-400",
      gradient: "from-amber-500/20 to-orange-600/20",
      glow: "rgba(245,158,11,0.2)",
      available: true,
    },
    {
      id: "sociabuzz" as Gateway,
      name: "Sociabuzz",
      description: "International payments (supports SEA E-wallet)",
      icon: <ExternalLink className="w-5 h-5" />,
      iconColor: "text-emerald-400",
      gradient: "from-emerald-500/20 to-teal-600/20",
      glow: "rgba(11, 245, 23, 0.2)",
      available: true,
    }
  ];

  return (
    <div className="min-h-screen bg-[#080810] text-slate-100 selection:bg-indigo-500/30 overflow-x-hidden">

      {/* ── Animated Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="blob blob-1 top-[-80px] right-[-120px]" style={{ animationDelay: "-2s" }} />
        <div className="blob blob-2 bottom-1/3 left-[-100px]" style={{ animationDelay: "-6s" }} />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <nav className="fixed w-full z-50 glass nav-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-all duration-300">
              <ArrowLeft size={18} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </div>
            <span className="text-sm font-semibold text-slate-400 group-hover:text-white transition-colors">Back to Home</span>
          </a>

          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 rounded-lg bg-indigo-500/30 blur-sm" />
              <img
                src="/minerva-smp-icon.png"
                alt=""
                className="relative w-7 h-7 rounded-lg ring-1 ring-white/10"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Minerva <span className="gradient-text-indigo">SMP</span>
            </span>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-10 z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-4">
            Support the Server
          </span>
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up"
            style={{ opacity: 0, animationFillMode: "forwards" }}
          >
            Keep{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #ec4899)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Minerva
            </span>{" "}
            Alive
          </h1>
          <p
            className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.15s", opacity: 0, animationFillMode: "forwards" }}
          >
            100% of donations go directly towards server hosting, performance upgrades, and plugin development.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="relative pb-28 z-10">
        <div className="max-w-4xl mx-auto px-6">

          {/* Gateway selection */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {gateways.map((gw) => {
              const isSelected = selectedGateway === gw.id;
              return (
                <button
                  key={gw.id}
                  disabled={!gw.available}
                  onClick={() => setSelectedGateway(gw.id)}
                  className={`relative flex items-start gap-4 p-5 rounded-2xl text-left transition-all duration-300 border outline-none overflow-hidden ${!gw.available ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                    } ${isSelected
                      ? "border-white/20 bg-white/8"
                      : "border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/14"
                    }`}
                  style={
                    isSelected
                      ? { boxShadow: `0 0 30px ${gw.glow}, 0 0 0 1px rgba(255,255,255,0.08) inset` }
                      : {}
                  }
                >
                  {/* shine on select  */}
                  {isSelected && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${gw.glow.replace("0.2", "0.8")}, transparent)`,
                      }}
                    />
                  )}

                  {/* Icon badge */}
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${gw.gradient} flex items-center justify-center ${gw.iconColor} ring-1 ring-white/10`}
                  >
                    {gw.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-white truncate">{gw.name}</h3>
                      {!gw.available && (
                        <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-slate-700/60 text-slate-400 border border-white/5">
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm">{gw.description}</p>
                  </div>

                  {/* Radio indicator */}
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isSelected ? "bg-white border-white" : "border-slate-600"
                      }`}
                  >
                    <Check size={11} className={`text-slate-900 transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Payment panel */}
          <div
            className="glass-card p-8 md:p-10 min-h-[320px] relative overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/8 blur-3xl pointer-events-none rounded-full" />

            {!selectedGateway ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12 gap-4">
                <div className="w-16 h-16 rounded-2xl glass border border-white/8 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-slate-700" />
                </div>
                <p className="text-sm">Select a payment method above to continue</p>
              </div>
            ) : (
              <div
                className="animate-fade-in-up relative z-10"
                style={{ animationDuration: "0.4s" }}
                key={selectedGateway}
              >
                <PaymentContent gateway={selectedGateway} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Payment Content ─────────────────────────────────────────────────────────── */
function PaymentContent({ gateway }: { gateway: Gateway }) {
  const [amount, setAmount] = useState("50000");
  const [paypalAmount, setPaypalAmount] = useState("5");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ── Sociabuzz ── */
  if (gateway === "sociabuzz") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 blur-xl" />
          <ExternalLink className="w-9 h-9 text-emerald-400 relative z-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-3">Donate via Sociabuzz</h2>
        <p className="text-slate-400 mb-8 max-w-sm text-sm leading-relaxed">
          Supports international payments include SEA E-wallet
        </p>
        <a
          href="https://sociabuzz.com/zidannaxserpat/tribe"
          target="_blank"
          rel="noreferrer"
          className="relative group flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            boxShadow: "0 0 24px rgba(16,185,129,0.3)",
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          Open Sociabuzz
          <ChevronRight size={18} />
        </a>
      </div>
    );
  }

  /* ── Saweria ── */
  if (gateway === "saweria") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-2xl bg-amber-500/5 blur-xl" />
          <ExternalLink className="w-9 h-9 text-amber-400 relative z-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-3">Donate via Saweria</h2>
        <p className="text-slate-400 mb-8 max-w-sm text-sm leading-relaxed">
          Supports GoPay, OVO, DANA, LinkAja, or QRIS. Quick and easy Indonesian payment.
        </p>
        <a
          href="https://saweria.co/Youknowwhat"
          target="_blank"
          rel="noreferrer"
          className="relative group flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
            boxShadow: "0 0 24px rgba(245,158,11,0.3)",
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          Open Saweria
          <ChevronRight size={18} />
        </a>
      </div>
    );
  }

  /* ── QRIS ── */
  if (gateway === "qris") {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-white mb-2">Scan QRIS to Donate</h2>
        <p className="text-slate-400 mb-8 max-w-sm text-center text-sm leading-relaxed">
          Open any E-Wallet or Mobile Banking app and scan the QR code below.
        </p>
        <div className="relative group">
          <div className="absolute -inset-3 rounded-3xl bg-indigo-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-white p-4 rounded-3xl shadow-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02]">
            <img src="/qris.png" alt="Minerva SMP QRIS" className="w-60 max-w-full rounded-2xl" />
          </div>
        </div>
        <div className="mt-8 py-3 px-5 glass border border-indigo-500/20 rounded-xl flex items-center gap-3">
          <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span className="text-indigo-200 font-medium text-sm">Valid for all Indonesian Banking Apps & E-Wallets</span>
        </div>
      </div>
    );
  }

  /* ── E-Wallet / Midtrans ── */
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
          // @ts-ignore
          window.snap.pay(data.token, {
            onSuccess: () => { alert("Payment Success! Thank you!"); setLoading(false); },
            onPending: () => { alert("Payment Pending."); setLoading(false); },
            onError: () => { alert("Payment Failed."); setLoading(false); },
            onClose: () => setLoading(false),
          });
        } else {
          alert("Failed to create transaction token.");
          setLoading(false);
        }
      } catch {
        alert("An error occurred.");
        setLoading(false);
      }
    };

    return <DonateForm
      title="Donate via E-Wallet"
      subtitle="Payment processed securely by Midtrans."
      username={username} setUsername={setUsername}
      message={message} setMessage={setMessage}
      loading={loading}
      amountLabel="Donation Amount (Rp)"
      amountValue={amount} setAmountValue={setAmount}
      amountType="number" amountMin="10000" amountStep="1000" amountPlaceholder="50000"
      submitLabel={`Donate Rp ${parseInt(amount || "0").toLocaleString("id-ID")}`}
      accentClass="sky"
      onSubmit={handleDonate}
      btnStyle={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 0 24px rgba(99,102,241,0.3)" }}
    />;
  }

  /* ── PayPal ── */
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
            username, message,
            amount: parseInt(paypalAmount, 10),
            return_url: `${window.location.origin}/paypal-success`,
            cancel_url: `${window.location.origin}/donate`,
          }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert("Failed to initiate PayPal checkout. " + (data.error || ""));
          setLoading(false);
        }
      } catch {
        alert("An error occurred while connecting to PayPal.");
        setLoading(false);
      }
    };

    return <DonateForm
      title="Donate via PayPal"
      subtitle="Payment processed securely by PayPal."
      username={username} setUsername={setUsername}
      message={message} setMessage={setMessage}
      loading={loading}
      amountLabel="Donation Amount (USD)"
      amountValue={paypalAmount} setAmountValue={setPaypalAmount}
      amountType="number" amountMin="1" amountStep="1" amountPlaceholder="5"
      submitLabel={`Donate $${parseInt(paypalAmount || "0").toLocaleString("en-US")}`}
      accentClass="sky"
      onSubmit={handlePayPalDonate}
      btnStyle={{ background: "linear-gradient(135deg,#0ea5e9,#1d4ed8)", boxShadow: "0 0 24px rgba(14,165,233,0.3)" }}
      disabled={!username || !paypalAmount || parseInt(paypalAmount) < 1}
    />;
  }

  return null;
}

/* ─── Shared Donate Form ──────────────────────────────────────────────────────── */
function DonateForm({
  title, subtitle,
  username, setUsername,
  message, setMessage,
  loading,
  amountLabel, amountValue, setAmountValue,
  amountType, amountMin, amountStep, amountPlaceholder,
  submitLabel,
  onSubmit,
  btnStyle,
  disabled,
}: {
  title: string; subtitle: string;
  username: string; setUsername: (v: string) => void;
  message: string; setMessage: (v: string) => void;
  loading: boolean;
  amountLabel: string; amountValue: string; setAmountValue: (v: string) => void;
  amountType: string; amountMin: string; amountStep: string; amountPlaceholder: string;
  submitLabel: string;
  accentClass: string;
  onSubmit: (e: React.FormEvent) => void;
  btnStyle: React.CSSProperties;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-extrabold text-white mb-1">{title}</h2>
      <p className="text-slate-400 mb-8 text-sm">{subtitle}</p>

      <form onSubmit={onSubmit} className="w-full max-w-sm flex flex-col gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Minecraft Username
          </label>
          <input
            required
            type="text"
            placeholder="e.g. Notch"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-glass"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {amountLabel}
          </label>
          <input
            required
            type={amountType}
            min={amountMin}
            step={amountStep}
            placeholder={amountPlaceholder}
            value={amountValue}
            onChange={(e) => setAmountValue(e.target.value)}
            className="input-glass"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Message <span className="normal-case text-slate-600 font-normal">(optional)</span>
          </label>
          <textarea
            placeholder="Your support message…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-glass h-24 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading || disabled}
          className="relative group mt-1 w-full flex justify-center items-center gap-2 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          style={btnStyle}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Processing…
            </span>
          ) : submitLabel}
        </button>
      </form>
    </div>
  );
}
