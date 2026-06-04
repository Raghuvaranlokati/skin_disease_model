import Link from "next/link";
import { ArrowRight, Activity, Shield, Microscope } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative py-20 lg:py-32 overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-sky-100 dark:from-slate-900 dark:to-slate-800 -z-10" />
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white/40 dark:from-slate-950/40 to-transparent -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Powered by Machine Learning
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Advanced Skin Disease <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">
              Prediction Tool
            </span>
          </h1>
          
          <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
            DermAI utilizes clinical and histopathological features to accurately classify skin conditions. 
            Input 34 patient features and get instant predictions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/predict" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 hover:-translate-y-1"
            >
              Start Prediction
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why use DermAI?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our model is trained on the comprehensive UCI Dermatology dataset to distinguish between 6 common and complex skin diseases.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                <Microscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">34 Data Points</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Analyzes both clinical features like erythema and scaling, and histopathological features like acanthosis for high accuracy.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-6">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Fast Results</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Powered by a FastAPI backend optimized for quick inference, giving you predictions in milliseconds.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6 Classifications</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Accurately distinguishes between Psoriasis, Seborrheic dermatitis, Lichen planus, Pityriasis rosea, Chronic dermatitis, and Pityriasis rubra pilaris.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
