import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Zap, Sparkles, Wand2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface OutputDrawerProps {
  prompt: string | null;
  onClose: () => void;
}

const OutputDrawer: React.FC<OutputDrawerProps> = ({ prompt: initialPrompt, onClose }) => {
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(initialPrompt);
  const [copied, setCopied] = useState(false);
  const [isRefining, setIsRefining] = useState(false);

  React.useEffect(() => {
    setCurrentPrompt(initialPrompt);
  }, [initialPrompt]);

  if (!currentPrompt) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefine = async () => {
    setIsRefining(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Please refine this prompt to be more effective for LLMs.
        Use professional prompt engineering techniques. Return ONLY the refined prompt text.
        
        CURRENT PROMPT:
        ${currentPrompt}`,
        config: {
          systemInstruction: "You are an elite Prompt Engineer.",
          temperature: 0.7,
        }
      });

      if (response.text) {
        setCurrentPrompt(response.text);
      }
    } catch (error) {
      console.error("AI Refinement failed:", error);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-slate-950 h-full shadow-2xl border-l border-slate-800 animate-slide-left">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-8 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Generated Prompt</h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-black mt-1">Digital Product Blueprint</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Terminal size={14} /> 
                System Prompt Content
              </h3>
              <button
                onClick={handleRefine}
                disabled={isRefining}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full text-xs font-bold hover:bg-indigo-500/20 transition-all"
              >
                <Sparkles size={14} className={isRefining ? 'animate-spin' : ''} />
                {isRefining ? 'Refining...' : 'Refine with Gemini AI'}
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    copied ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-blue-600 text-slate-300'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
              <div className="p-8 font-mono text-sm text-indigo-200/80 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                {currentPrompt}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <Wand2 size={20} className="text-blue-500 mb-4" />
                <h4 className="font-bold text-sm mb-2">Prompt Engineering</h4>
                <p className="text-xs text-slate-500 leading-relaxed">This output uses advanced instruction hierarchies optimized for deep reasoning models.</p>
              </div>
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <Zap size={20} className="text-amber-500 mb-4" />
                <h4 className="font-bold text-sm mb-2">Instant Blueprint</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Copy the text above into your AI of choice to begin generating your digital product instantly.</p>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-slate-800 bg-slate-950">
            <button
              onClick={handleCopy}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-500/20"
            >
              Copy Final Blueprint
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default OutputDrawer;