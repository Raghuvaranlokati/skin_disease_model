"use client";

import { useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

const CLINICAL_FEATURES = [
  { id: "Age", label: "Age", type: "number", min: 0, max: 120 },
  { id: "erythema", label: "Erythema", type: "range", min: 0, max: 3 },
  { id: "scaling", label: "Scaling", type: "range", min: 0, max: 3 },
  { id: "definite_borders", label: "Definite Borders", type: "range", min: 0, max: 3 },
  { id: "itching", label: "Itching", type: "range", min: 0, max: 3 },
  { id: "koebner_phenomenon", label: "Koebner Phenomenon", type: "range", min: 0, max: 3 },
  { id: "polygonal_papules", label: "Polygonal Papules", type: "range", min: 0, max: 3 },
  { id: "follicular_papules", label: "Follicular Papules", type: "range", min: 0, max: 3 },
  { id: "oral_mucosal_involvement", label: "Oral Mucosal Involvement", type: "range", min: 0, max: 3 },
  { id: "knee_and_elbow_involvement", label: "Knee and Elbow Involvement", type: "range", min: 0, max: 3 },
  { id: "scalp_involvement", label: "Scalp Involvement", type: "range", min: 0, max: 3 },
  { id: "family_history", label: "Family History", type: "range", min: 0, max: 1 },
];

const HISTO_FEATURES = [
  { id: "melanin_incontinence", label: "Melanin Incontinence", type: "range", min: 0, max: 3 },
  { id: "eosinophils_in_the_infiltrate", label: "Eosinophils in Infiltrate", type: "range", min: 0, max: 3 },
  { id: "PNL_infiltrate", label: "PNL Infiltrate", type: "range", min: 0, max: 3 },
  { id: "fibrosis_of_the_papillary_dermis", label: "Fibrosis of Papillary Dermis", type: "range", min: 0, max: 3 },
  { id: "exocytosis", label: "Exocytosis", type: "range", min: 0, max: 3 },
  { id: "acanthosis", label: "Acanthosis", type: "range", min: 0, max: 3 },
  { id: "hyperkeratosis", label: "Hyperkeratosis", type: "range", min: 0, max: 3 },
  { id: "parakeratosis", label: "Parakeratosis", type: "range", min: 0, max: 3 },
  { id: "clubbing_of_the_rete_ridges", label: "Clubbing of Rete Ridges", type: "range", min: 0, max: 3 },
  { id: "elongation_of_the_rete_ridges", label: "Elongation of Rete Ridges", type: "range", min: 0, max: 3 },
  { id: "thinning_of_the_suprapapillary_epidermis", label: "Thinning of Suprapapillary Epidermis", type: "range", min: 0, max: 3 },
  { id: "spongiform_pustule", label: "Spongiform Pustule", type: "range", min: 0, max: 3 },
  { id: "munro_microabcess", label: "Munro Microabcess", type: "range", min: 0, max: 3 },
  { id: "focal_hypergranulosis", label: "Focal Hypergranulosis", type: "range", min: 0, max: 3 },
  { id: "disappearance_of_the_granular_layer", label: "Disappearance of Granular Layer", type: "range", min: 0, max: 3 },
  { id: "vacuolisation_and_damage_of_basal_layer", label: "Vacuolisation & Damage of Basal Layer", type: "range", min: 0, max: 3 },
  { id: "spongiosis", label: "Spongiosis", type: "range", min: 0, max: 3 },
  { id: "saw_tooth_appearance_of_retes", label: "Saw-tooth Appearance of Retes", type: "range", min: 0, max: 3 },
  { id: "follicular_horn_plug", label: "Follicular Horn Plug", type: "range", min: 0, max: 3 },
  { id: "perifollicular_parakeratosis", label: "Perifollicular Parakeratosis", type: "range", min: 0, max: 3 },
  { id: "inflammatory_monoluclear_inflitrate", label: "Inflammatory Mononuclear Infiltrate", type: "range", min: 0, max: 3 },
  { id: "band_like_infiltrate", label: "Band-like Infiltrate", type: "range", min: 0, max: 3 },
];

export default function PredictPage() {
  const [formData, setFormData] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    CLINICAL_FEATURES.forEach(f => { initial[f.id] = 0; });
    HISTO_FEATURES.forEach(f => { initial[f.id] = 0; });
    initial["Age"] = 30; // default age
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: number; disease: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: parseInt(value, 10) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await axios.post(`${apiUrl}/predict`, formData);
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "An error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
  };

  const renderField = (field: any) => {
    return (
      <div key={field.id} className="flex flex-col space-y-1">
        <label htmlFor={field.id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {field.label} {field.type === "range" && <span className="text-primary font-bold ml-1">({formData[field.id]})</span>}
        </label>
        {field.type === "range" ? (
          <input
            type="range"
            id={field.id}
            min={field.min}
            max={field.max}
            value={formData[field.id]}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-primary"
          />
        ) : (
          <input
            type="number"
            id={field.id}
            min={field.min}
            max={field.max}
            value={formData[field.id]}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-600 dark:text-white sm:text-sm"
          />
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Patient Diagnosis Form</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Enter the patient's symptoms below to predict the skin disease classification.
            <br />
            Most symptoms use a 0-3 scale. For easy understanding:
            <br />
            <span className="inline-block mt-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-sm">
              0 = Absent &nbsp;|&nbsp; 1 = Mild &nbsp;|&nbsp; 2 = Moderate &nbsp;|&nbsp; 3 = Severe
            </span>
          </p>
        </div>

        {result ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center max-w-lg mx-auto transform transition-all animate-in fade-in zoom-in">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Prediction Complete</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Based on the provided patient features.</p>
            
            <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-6 mb-8 border border-sky-100 dark:border-sky-800">
              <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1">Predicted Disease Class {result.prediction}</div>
              <div className="text-3xl font-bold text-sky-900 dark:text-sky-100">{result.disease}</div>
            </div>

            <button
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200 dark:text-sky-100 dark:bg-sky-900/50 dark:hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              New Prediction
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
            
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/30 border-b border-red-100 dark:border-red-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Prediction Failed</h3>
                  <div className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</div>
                </div>
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                  Clinical Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CLINICAL_FEATURES.map(renderField)}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                  Histopathological Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {HISTO_FEATURES.map(renderField)}
                </div>
              </div>
            </div>

            <div className="px-6 md:px-8 py-5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Predict Disease"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
