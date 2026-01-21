import React, { useState, useEffect } from 'react';
import type { ToolConfig } from './types.ts';
import { Sparkles, Check, Terminal } from 'lucide-react';

interface GuidedMakerProps {
  tool: ToolConfig;
  onGenerate: (prompt: string) => void;
}

const GuidedMaker: React.FC<GuidedMakerProps> = ({ tool, onGenerate }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const initialData: Record<string, string> = {};
    tool.fields.forEach(field => initialData[field.id] = '');
    setFormData(initialData);
  }, [tool]);

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedPrompt = tool.template(formData);
      onGenerate(generatedPrompt);
      setIsGenerating(false);
    }, 600);
  };

  const isFormValid = tool.fields.every(f => formData[f.id]?.trim()?.length > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2 text-indigo-400">
           <tool.icon size={32} />
           <h1 className="text-3xl font-bold text-slate-50">{tool.name}</h1>
        </div>
        <p className="text-slate-400 text-lg">{tool.description}</p>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
        <div className="space-y-6">
          {tool.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="block text-sm font-semibold text-slate-300">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  rows={4}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              ) : (
                <input
                  id={field.id}
                  type="text"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
            </div>
          ))}

          <button
            onClick={handleGenerate}
            disabled={!isFormValid || isGenerating}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
              isFormValid && !isGenerating
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 active:scale-[0.98]'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
            ) : (
              <>
                <Sparkles size={20} />
                Generate Expert Prompt
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="bg-green-500/10 p-2 rounded-lg text-green-400">
            <Check size={16} />
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Optimized Architectures</span>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
            <Terminal size={16} />
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Multi-Shot Logic</span>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400">
            <Sparkles size={16} />
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Tone Synchronization</span>
        </div>
      </div>
    </div>
  );
};

export default GuidedMaker;