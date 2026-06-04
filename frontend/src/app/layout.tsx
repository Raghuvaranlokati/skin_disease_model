import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DermAI - Skin Disease Prediction",
  description: "Advanced machine learning tool for predicting skin diseases based on clinical features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  D
                </div>
                <span className="font-bold text-xl text-slate-800 dark:text-slate-100">DermAI</span>
              </div>
              <nav>
                <a href="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Home</a>
              </nav>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-slate-50 dark:bg-slate-950 py-8 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
              <p>&copy; {new Date().getFullYear()} DermAI. For educational purposes only.</p>
              <p className="mt-2 text-xs">Not a substitute for professional medical advice.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
