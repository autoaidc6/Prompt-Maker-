
import React from 'react';
import { ToolId, ToolConfig } from '../types';
import { TOOLS } from '../constants';
import { Cpu, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activeToolId: ToolId | 'faq';
  onSelectTool: (id: ToolId | 'faq') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeToolId, onSelectTool }) => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-indigo-500 font-bold text-xl">
          <Cpu size={28} />
          <span>Prompt Maker</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 py-4">
        <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tools</p>
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              activeToolId === tool.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <tool.icon size={20} />
            <span className="font-medium">{tool.name}</span>
          </button>
        ))}

        <div className="pt-6">
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Support</p>
          <button
            onClick={() => onSelectTool('faq')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              activeToolId === 'faq'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <HelpCircle size={20} />
            <span className="font-medium">FAQ & Help</span>
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-1">Free Tier</p>
          <p className="text-sm font-semibold text-slate-200">10 Prompts Remaining</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full w-2/3"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
