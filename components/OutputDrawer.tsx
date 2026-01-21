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
        contents: `Please refine this prompt to be more effective for LLMs. Use professional prompt engineering techniques. Return ONLY the refined prompt text.
        
        CURRENT PROMPT:
        ${currentPrompt}`,
        config: {
          systemInstruction: "You are an elite Prompt Engineer for high-end digital creation workflows.",
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
      <div className="absolute inset-0 bg-[#05010d]/90 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#0b041a] h-full shadow-[0_0_100px_rgba(99,102,241,0.15)] border-l border-white/10 animate-slide-left">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-8 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">System Blueprint</h2>
                <p className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-black mt-1">Refined by Prompt Maker</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-white/40 hover:text-white bg-white/5 rounded-full transition-all">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
                <Terminal size={14} /> 
                Optimized Output
              </h3>
              <button
                onClick={handleRefine}
                disabled={isRefining}
                className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600/10 border border-fuchsia-500/30 text-fuchsia-400 rounded-full text-xs font-bold hover:bg-fuchsia-600/20 transition-all shadow-lg shadow-fuchsia-500/10"
              >
                <Sparkles size={14} className={isRefining ? 'animate-spin' : ''} />
                {isRefining ? 'Polishing Blueprint...' : 'AI Refinement'}
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden relative group">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                </div>
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${
                    copied ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-indigo-600 text-white/80'
                  }`}
                >
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
              </div>
              <div className="p-8 font-mono text-[13px] text-indigo-100/70 leading-relaxed whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
                {currentPrompt}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-start gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                  <Wand2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">How to use</h4>
                  <p className="text-xs text-indigo-200/30 leading-relaxed">Paste this instruction into your AI model as the "System Message" or the initial starting prompt for the best contextual results.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-white/5 bg-[#05010d]/50">
            <button
              onClick={handleCopy}
              className="w-full bg-indigo-600 hover:bg-fuchsia-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-indigo-500/40 active:scale-[0.98]"
            >
              Export Full Blueprint
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