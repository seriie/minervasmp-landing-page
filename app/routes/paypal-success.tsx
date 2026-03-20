import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import { CheckCircle, XCircle, Loader2, Home, RefreshCw } from "lucide-react";
import type { Route } from "./+types/paypal-success";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Payment Status | Minerva SMP" },
    { name: "description", content: "Payment processing status." },
  ];
}

export default function PayPalSuccess() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("Missing payment token.");
      return;
    }
    if (hasFetched.current) return;
    hasFetched.current = true;

    const capturePayment = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || "";
        const res = await fetch(`${apiBaseUrl}/api/paypal/capture`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: token }),
        });
        const data = await res.json();
        if (data.status === "success" || data.data?.status === "COMPLETED") {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(
            data.error || "Failed to capture payment. It may have already been processed or expired."
          );
        }
      } catch {
        setStatus("error");
        setErrorMessage("An error occurred while confirming the payment.");
      }
    };

    capturePayment();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#080810] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden selection:bg-indigo-500/30">

      {/* ── Animated Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="blob blob-1 top-[-100px] left-[-100px]" />
        <div className="blob blob-2 bottom-[-80px] right-[-120px]" style={{ animationDelay: "-4s" }} />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Card ── */}
      <div
        className="relative z-10 max-w-md w-full"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.75rem",
          padding: "3rem 2.5rem",
          boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* Top glow orb */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 blur-3xl rounded-full pointer-events-none transition-all duration-1000 ${
            status === "success"
              ? "bg-emerald-500/15"
              : status === "error"
              ? "bg-red-500/15"
              : "bg-indigo-500/15"
          }`}
        />

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-lg bg-indigo-500/30 blur-sm" />
            <img
              src="/minerva-smp-icon.png"
              alt="Minerva SMP"
              className="relative w-7 h-7 rounded-lg ring-1 ring-white/10"
            />
          </div>
          <span className="font-bold text-base text-white tracking-tight">
            Minerva <span className="gradient-text-indigo">SMP</span>
          </span>
        </div>

        {/* ── Processing ── */}
        {status === "processing" && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl animate-pulse scale-150" />
              <Loader2 className="w-16 h-16 text-indigo-400 animate-spin relative z-10" />
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">Processing Payment</h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Please wait while we confirm your donation…
            </p>
            <div className="mt-6 w-full h-1 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full animate-shimmer-bg rounded-full" />
            </div>
          </div>
        )}

        {/* ── Success ── */}
        {status === "success" && (
          <div className="flex flex-col items-center text-center animate-fade-in-up">
            <div className="relative mb-6">
              <div className="absolute inset-0 scale-150 rounded-full bg-emerald-500/15 blur-2xl" />
              <div className="relative w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle
                  className="w-12 h-12 text-emerald-400"
                  style={{ filter: "drop-shadow(0 0 12px rgba(52,211,153,0.6))" }}
                />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-3">Payment Successful!</h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
              Thank you for supporting Minerva SMP. Your donation helps keep the server running for everyone. 💚
            </p>
            <a
              href="/"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg,#10b981,#059669)",
                boxShadow: "0 0 24px rgba(16,185,129,0.3)",
              }}
            >
              <Home size={17} />
              Return Home
            </a>
          </div>
        )}

        {/* ── Error ── */}
        {status === "error" && (
          <div className="flex flex-col items-center text-center animate-fade-in-up">
            <div className="relative mb-6">
              <div className="absolute inset-0 scale-150 rounded-full bg-red-500/15 blur-2xl" />
              <div className="relative w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <XCircle
                  className="w-12 h-12 text-red-400"
                  style={{ filter: "drop-shadow(0 0 12px rgba(248,113,113,0.6))" }}
                />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-3">Payment Failed</h1>
            {errorMessage && (
              <div className="w-full mb-6 p-4 rounded-xl bg-red-500/8 border border-red-500/20 text-left">
                <p className="text-red-300 text-sm leading-relaxed">{errorMessage}</p>
              </div>
            )}
            <div className="flex gap-3 w-full">
              <a
                href="/donate"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white btn-glass text-sm"
              >
                <RefreshCw size={15} />
                Try Again
              </a>
              <a
                href="/"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  boxShadow: "0 0 20px rgba(99,102,241,0.25)",
                }}
              >
                <Home size={15} />
                Go Home
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
