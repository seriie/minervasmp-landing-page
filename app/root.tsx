import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/minerva-smp-icon.png" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script 
          src="https://app.sandbox.midtrans.com/snap/snap.js" 
          data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY || ""}
        ></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    message = is404 ? "404" : "Error";
    details = is404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen w-full bg-gray-950 text-gray-100 font-sans flex items-center justify-center p-4 selection:bg-indigo-500/30">
      {is404 ? (
        <div className="relative text-center max-w-2xl mx-auto flex flex-col items-center">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <h1 className="text-[150px] md:text-[200px] leading-none font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600 drop-shadow-2xl mb-2">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lost in the Void</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-md">
            The coordinates you're looking for don't lead anywhere. Best head back to the spawn area before night falls.
          </p>
          <a
            href="/"
            className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1"
          >
            Return to Spawn
          </a>
        </div>
      ) : (
        <div className="container mx-auto p-8 relative z-10 w-full max-w-4xl">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 backdrop-blur-md">
            <h1 className="text-4xl font-bold text-red-400 mb-4">{message}</h1>
            <p className="text-xl text-red-200/70 mb-8">{details}</p>
            {stack && (
              <pre className="w-full p-6 bg-black/60 border border-red-500/20 rounded-xl overflow-x-auto text-red-300 text-sm font-mono shadow-inner shadow-black/50">
                <code>{stack}</code>
              </pre>
            )}
            <div className="mt-8">
              <a href="/" className="inline-flex px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors">
                Go Back Home
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
