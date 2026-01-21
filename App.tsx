import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Cpu, 
  Globe, 
  Search, 
  Book, 
  Layout,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Lightbulb,
  Target,
  PenTool,
  Clock
} from 'lucide-react';
import OutputDrawer from './components/OutputDrawer.tsx';

type View = 'landing' | 'tool-select' | 'wizard';

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

const TOOLS: Tool[] = [
  { id: 'chatgpt', name: 'ChatGPT', icon: MessageSquare, color: 'bg-emerald-500' },
  { id: 'claude', name: 'Claude', icon: Sparkles, color: 'bg-orange-500' },
  { id: 'gemini', name: 'Gemini', icon: Zap, color: 'bg-blue-500' },
  { id: 'notebooklm', name: 'NotebookLM', icon: Book, color: 'bg-indigo-500' },
  { id: 'ai-studio', name: 'Google AI Studio', icon: Cpu, color: 'bg-blue-600' },
  { id: 'antigravity', name: 'Google Antigravity', icon: Target, color: 'bg-cyan-500' },
  { id: 'horizons', name: 'Horizons', icon: Globe, color: 'bg-sky-500' },
];

const PRODUCT_TYPES = [
  { id: 'info', label: 'AI-Powered Info Product', emoji: '🎓' },
  { id: 'planner', label: 'Digital Planner', emoji: '📓' },
  { id: 'spreadsheet', label: 'Spreadsheet', emoji: '📊' },
  { id: 'ebook', label: 'eBook', emoji: '📖' },
  { id: 'journal', label: 'Digital Journal', emoji: '📔' },
  { id: 'course', label: 'Video Course', emoji: '🎬' },
  { id: 'template', label: 'Printable Template Pack', emoji: '🎨' },
  { id: 'notion', label: 'Notion Template', emoji: '📑' },
  { id: 'audio', label: 'Audio Guide or Podcast Series', emoji: '🎧' },
  { id: 'workbook', label: 'Interactive Workbook', emoji: '📗' },
  { id: 'bundle', label: 'eBook & Audiobook Bundle', emoji: '📚' },
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const totalSteps = 4;

  const handleStart = () => setView('tool-select');
  const handleSelectTool = (tool: Tool) => {
    setSelectedTool(tool);
    setStep(1);
    setView('wizard');
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      generateFinalPrompt();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else setView('tool-select');
  };

  const generateFinalPrompt = () => {
    const prompt = `
# SYSTEM ROLE
Act as an expert prompt engineer and product architect for ${selectedTool?.name}.

# PROJECT BRIEF
You are designing a ${answers.productType || 'digital product'} for ${answers.audience || 'a general audience'}.

# CORE REQUIREMENTS
- Goal: ${answers.goal || 'General high-quality output'}
- Tone: ${answers.tone || 'Professional and clean'}

# INSTRUCTIONS
Provide a comprehensive blueprint and the necessary prompt structures to build this digital asset from scratch. 
Include module breakdowns, content hooks, and technical constraints specifically optimized for ${selectedTool?.name}'s capabilities.
    `.trim();
    setGeneratedPrompt(prompt);
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen hero-bg flex flex-col">
        <header className="p-6 px-12 flex justify-between items-center bg-slate-900/40 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Layout className="text-blue-500" />
            <span className="text-xl font-bold tracking-tight">Digital Maker<span className="text-blue-500">.AI</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Reviews</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-6">
            <button className="text-sm font-medium text-slate-400 hover:text-white">Log in</button>
            <button onClick={handleStart} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
              Get Started
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight animate-fade-in-up">
            Create Digital <br /> Products <br />
            <span className="gradient-text">In Minutes, Not Months</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Harness the power of AI to generate professional prompts, detailed blueprints, and market-ready content structures instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={handleStart}
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 group"
            >
              Get Started for Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 px-8 py-4 rounded-full font-bold text-lg transition-all">
              Explore Features
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'tool-select') {
    return (
      <div className="min-h-screen bg-slate-950 p-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <Layout className="text-blue-500" size={32} />
              <span className="text-2xl font-bold">Digital Maker</span>
            </div>
            <button className="text-slate-400 hover:text-white font-medium text-sm">Sign In</button>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Generate AI Prompts <span className="text-indigo-400">Faster</span></h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Craft perfect prompts for your favorite AI models and supercharge your digital product creation process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleSelectTool(tool)}
                className="group p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-indigo-500/50 hover:bg-slate-900 transition-all text-left relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mb-6 shadow-lg shadow-current/10`}>
                  <tool.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{tool.name}</h3>
                <div className="flex items-center text-blue-500 text-sm font-bold group-hover:gap-2 transition-all">
                  Select Tool <ArrowRight size={14} className="ml-2" />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors"></div>
              </button>
            ))}
          </div>

          <footer className="mt-20 text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
            © 2026 Digital Maker.AI. All rights reserved.
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-4xl">
        <button 
          onClick={() => setView('tool-select')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Tools
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Building with <span className="text-blue-500">{selectedTool?.name}</span></h2>
          <span className="text-slate-500 text-sm font-bold">{step} of {totalSteps}</span>
        </div>

        <div className="w-full bg-slate-900 h-2 rounded-full mb-12 overflow-hidden">
          <div 
            className="bg-blue-500 h-full transition-all duration-500" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 backdrop-blur-md shadow-2xl">
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-center mb-10">What type of digital product do you want to create?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRODUCT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setAnswers({ ...answers, productType: type.label });
                      handleNext();
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left hover:scale-[1.02] active:scale-[0.98] ${
                      answers.productType === type.label 
                        ? 'bg-blue-600/20 border-blue-500 text-blue-100' 
                        : 'bg-slate-800/30 border-slate-700 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{type.emoji}</span>
                    <span className="font-semibold text-sm">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-center mb-10">Who is your target audience?</h3>
              <textarea
                className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl p-6 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all h-48 mb-8"
                placeholder="e.g. Early-stage entrepreneurs looking to automate their social media content..."
                value={answers.audience || ''}
                onChange={(e) => setAnswers({ ...answers, audience: e.target.value })}
              />
              <div className="flex gap-4">
                {['Beginners', 'Professionals', 'Students', 'Small Business Owners'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setAnswers({ ...answers, audience: tag })}
                    className="px-4 py-2 bg-slate-800 rounded-full text-xs font-bold text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-center mb-10">What is the primary goal of this product?</h3>
              <div className="grid grid-cols-1 gap-4 mb-8">
                {[
                  { id: 'teach', label: 'To teach a complex skill', icon: PenTool },
                  { id: 'save', label: 'To save time with automation', icon: Clock },
                  { id: 'inspire', label: 'To inspire and guide', icon: Lightbulb },
                  { id: 'research', label: 'To provide deep research', icon: Search },
                ].map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => {
                      setAnswers({ ...answers, goal: goal.label });
                      handleNext();
                    }}
                    className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${
                      answers.goal === goal.label 
                        ? 'bg-indigo-600/20 border-indigo-500' 
                        : 'bg-slate-800/30 border-slate-700 hover:border-indigo-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <goal.icon className="text-indigo-400" />
                      <span className="font-bold">{goal.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-center mb-10">Choose the output tone and style</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Professional', 'Friendly', 'Minimalist', 'Technical', 'Bold', 'Academic'].map(tone => (
                  <button
                    key={tone}
                    onClick={() => setAnswers({ ...answers, tone: tone })}
                    className={`p-6 rounded-2xl border font-bold transition-all ${
                      answers.tone === tone 
                        ? 'bg-blue-600 border-blue-500 text-white' 
                        : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between">
            <button 
              onClick={handleBack}
              className="px-8 py-3 rounded-xl border border-slate-800 font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button 
              onClick={handleNext}
              disabled={step === 2 && !answers.audience}
              className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                step === 2 && !answers.audience
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:scale-95'
              }`}
            >
              {step === totalSteps ? 'Finish' : 'Next'}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <OutputDrawer 
        prompt={generatedPrompt} 
        onClose={() => {
          setGeneratedPrompt(null);
          setView('tool-select');
        }} 
      />
    </div>
  );
};

export default App;