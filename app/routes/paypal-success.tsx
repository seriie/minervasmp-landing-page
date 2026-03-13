import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
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
          body: JSON.stringify({ orderID: token })
        });

        const data = await res.json();
        if (data.status === "success" || data.data?.status === "COMPLETED") {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Failed to capture payment. It may have already been processed or expired.");
        }
      } catch (error) {
        console.error("Capture error:", error);
        setStatus("error");
        setErrorMessage("An error occurred while confirming the payment.");
      }
    };

    capturePayment();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed bg-black/50 bg-blend-overlay">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
        
        {status === "processing" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500 relative z-10">
            <Loader2 className="w-20 h-20 text-indigo-400 animate-spin mb-6" />
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Processing Payment</h1>
            <p className="text-gray-400 text-lg">Please wait while we confirm your donation...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Payment Successful!</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Thank you for supporting Minerva SMP. Your donation helps keep the server running.
            </p>
            <a 
              href="/"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all w-full border border-white/10 hover:-translate-y-0.5"
            >
              Return Home
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <XCircle className="w-16 h-16 text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Payment Failed</h1>
            <p className="text-gray-400 text-lg mb-8 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
              {errorMessage}
            </p>
            <div className="flex gap-4 w-full">
              <a 
                href="/donate"
                className="flex-1 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 hover:-translate-y-0.5"
              >
                Try Again
              </a>
              <a 
                href="/"
                className="flex-1 px-6 py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
              >
                Go Home
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
