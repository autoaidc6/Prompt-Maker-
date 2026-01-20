
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import GuidedMaker from './components/GuidedMaker';
import FAQ from './components/FAQ';
import OutputDrawer from './components/OutputDrawer';
import { ToolId } from './types';
import { TOOLS } from './constants';
import { User, Bell, ChevronRight, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<ToolId | 'faq'>('architect');
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  const handleGenerate = (prompt: string) => {
    setGeneratedPrompt(prompt);
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-50 overflow-x-hidden">
      <Sidebar activeToolId={activeToolId} onSelectTool={setActiveToolId} />

      <main className="flex-1 flex flex-col">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 bg-slate-900/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Tools</span>
            <ChevronRight size={14} />
            <span className="text-slate-200 font-medium">
              {activeToolId === 'faq' ? 'FAQ' : activeTool?.name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 transition-colors">
              <Sparkles size={14} />
              UPGRADE PRO
            </button>
            <div className="w-px h-6 bg-slate-800"></div>
            <button className="p-2 text-slate-400 hover:text-slate-100 transition-colors">
              <Bell size={20} />
            </button>
            <button className="flex items-center gap-3 p-1 pl-3 pr-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors border border-slate-700/50">
              <span className="text-sm font-medium">Alex Chen</span>
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                AC
              </div>
            </button>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          {activeToolId === 'faq' ? (
            <FAQ />
          ) : (
            activeTool && (
              <GuidedMaker tool={activeTool} onGenerate={handleGenerate} />
            )
          )}
        </div>

        {/* Footer info */}
        <footer className="p-8 text-center text-slate-500 text-sm border-t border-slate-800/50">
          <p>© 2024 Prompt Maker AI. Engineering prompts for the next generation of creative builders.</p>
        </footer>
      </main>

      {/* Output Side Drawer */}
      <OutputDrawer
        prompt={generatedPrompt}
        onClose={() => setGeneratedPrompt(null)}
      />
    </div>
  );
};

export default App;
