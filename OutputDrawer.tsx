
import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Terminal, Zap } from 'lucide-react';

interface OutputDrawerProps {
  prompt: string | null;
  onClose: () => void;
}

const OutputDrawer: React.FC<OutputDrawerProps> = ({ prompt, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-slate-900 h-full shadow-2xl border-l border-slate-800 transform transition-transform duration-300 ease-out animate-slide-left">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">Generated Prompt</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-0.5">Ready for Deployment</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden font-mono text-sm group">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                  </div>
                  <span className="text-slate-500 text-[10px] font-bold ml-2 uppercase tracking-tighter">prompt.md</span>
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    copied ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-indigo-600 text-slate-200'
                  }`}
                >
                  {copied ? <><Check size={12} /> COPIED</> : <><Copy size={12} /> COPY</>}
                </button>
              </div>
              <pre className="p-6 text-indigo-300/90 whitespace-pre-wrap break-words leading-relaxed text-[13px]">
                {prompt}
              </pre>
            </div>

            <div className="mt-8 space-y-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Next Steps</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-800/20 border border-slate-800">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm mb-1">Execute Prompt</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Paste into your preferred LLM as the initial context-setter for best results.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-800 bg-slate-950/30">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.99]"
            >
              <Copy size={18} />
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default OutputDrawer;
