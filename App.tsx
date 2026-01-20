
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import GuidedMaker from './GuidedMaker';
import FAQ from './FAQ';
import OutputDrawer from './OutputDrawer';
import type { ToolId } from './types';
import { TOOLS } from './constants';
import { Bell, ChevronRight, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<ToolId | 'faq'>('architect');
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  const handleGenerate = (prompt: string) => {
    setGeneratedPrompt(prompt);
  };

  return (
    <div className="flex w-full min-h-screen bg-slate-900 text-slate-50 overflow-hidden">
      <Sidebar activeToolId={activeToolId} onSelectTool={setActiveToolId} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-900/80 backdrop-blur-md z-40 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Tools</span>
            <ChevronRight size={14} className="text-slate-600" />
            <span className="text-indigo-400">
              {activeToolId === 'faq' ? 'FAQ' : activeTool?.name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 px-3 py-1.5 rounded-lg text-[10px] font-black text-indigo-400 transition-colors border border-indigo-500/20 tracking-tighter">
              <Sparkles size={12} />
              UPGRADE PRO
            </button>
            <div className="w-px h-4 bg-slate-800"></div>
            <button className="p-2 text-slate-500 hover:text-slate-200 transition-colors">
              <Bell size={18} />
            </button>
            <button className="flex items-center gap-3 p-1 pl-3 pr-2 bg-slate-800/50 rounded-full hover:bg-slate-700 transition-colors border border-slate-700/50">
              <span className="text-xs font-bold text-slate-300">Alex Chen</span>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                AC
              </div>
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          {activeToolId === 'faq' ? (
            <FAQ />
          ) : (
            activeTool && (
              <GuidedMaker tool={activeTool} onGenerate={handleGenerate} />
            )
          )}
          <footer className="mt-20 py-8 text-center text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em] border-t border-slate-800/30">
            Prompt Maker AI • Version 1.0.4-MVP
          </footer>
        </div>
      </main>

      <OutputDrawer
        prompt={generatedPrompt}
        onClose={() => setGeneratedPrompt(null)}
      />
    </div>
  );
};

export default App;
