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
  PenTool,
  Clock,
  Shield,
  Layers,
  Star,
  Plus,
  Minus
} from 'lucide-react';
import OutputDrawer from './components/OutputDrawer.tsx';

type View = 'landing' | 'tool-select' | 'wizard' | 'features' | 'pricing' | 'reviews' | 'faq';

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

const TOOLS: Tool[] = [
  { id: 'chatgpt', name: 'ChatGPT', icon: MessageSquare, color: 'bg-emerald-500' },
  { id: 'claude', name: 'Claude', icon: Sparkles, color: 'bg-orange-500' },
  { id: 'gemini', name: 'Gemini', icon: Zap, color: 'bg-indigo-500' },
  { id: 'notebooklm', name: 'NotebookLM', icon: Book, color: 'bg-violet-500' },
  { id: 'ai-studio', name: 'Google AI Studio', icon: Cpu, color: 'bg-indigo-600' },
  { id: 'antigravity', name: 'Google Antigravity', icon: Shield, color: 'bg-fuchsia-500' },
  { id: 'horizons', name: 'Horizons', icon: Globe, color: 'bg-rose-500' },
];

const PRODUCT_TYPES = [
  { id: 'info', label: 'AI Info Product', emoji: '✨' },
  { id: 'planner', label: 'Smart Planner', emoji: '📅' },
  { id: 'spreadsheet', label: 'Data Logic Sheet', emoji: '🧪' },
  { id: 'ebook', label: 'Interactive eBook', emoji: '📕' },
  { id: 'journal', label: 'Daily Mindset Journal', emoji: '🧘' },
  { id: 'course', label: 'Syllabus Creator', emoji: '🎓' },
  { id: 'template', label: 'Digital Asset Kit', emoji: '📦' },
  { id: 'notion', label: 'Notion Framework', emoji: '💎' },
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalSteps = 4;

  const handleStart = () => setView('tool-select');

  const generateFinalPrompt = () => {
    const prompt = `
# SYSTEM ROLE: Elite Prompt Engineer & Product Architect
Context: Designing for ${selectedTool?.name}.

# PROJECT SUMMARY
Objective: Build a ${answers.productType || 'digital asset'}
Target Audience: ${answers.audience || 'Unspecified'}
Tone & Voice: ${answers.tone || 'Professional'}

# TASK GOAL
${answers.goal || 'Generate a high-performance output structure.'}

# INSTRUCTIONS
1. Create a detailed technical blueprint.
2. Provide specific prompt sequences for ${selectedTool?.name}.
3. Include delimiters and persona injections for maximum clarity.
    `.trim();
    setGeneratedPrompt(prompt);
  };

  const NavHeader = () => (
    <header className="p-6 px-12 flex justify-between items-center bg-slate-950/20 backdrop-blur-md sticky top-0 z-50 border-b border-indigo-500/10">
      <button onClick={() => setView('landing')} className="flex items-center gap-2 group">
        <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-fuchsia-600 transition-colors">
          <Zap className="text-white" size={20} />
        </div>
        <span className="text-xl font-extrabold tracking-tight">Prompt Maker</span>
      </button>
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-indigo-300/60">
        <button onClick={() => setView('features')} className={`hover:text-indigo-200 transition-colors ${view === 'features' ? 'text-indigo-100' : ''}`}>Features</button>
        <button onClick={() => setView('pricing')} className={`hover:text-indigo-200 transition-colors ${view === 'pricing' ? 'text-indigo-100' : ''}`}>Pricing</button>
        <button onClick={() => setView('reviews')} className={`hover:text-indigo-200 transition-colors ${view === 'reviews' ? 'text-indigo-100' : ''}`}>Reviews</button>
        <button onClick={() => setView('faq')} className={`hover:text-indigo-200 transition-colors ${view === 'faq' ? 'text-indigo-100' : ''}`}>FAQ</button>
      </nav>
      <div className="flex items-center gap-6">
        <button onClick={handleStart} className="bg-indigo-600 hover:bg-fuchsia-600 px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg shadow-indigo-500/20">
          Open App
        </button>
      </div>
    </header>
  );

  if (view === 'landing') {
    return (
      <div className="min-h-screen hero-bg flex flex-col">
        <NavHeader />
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-6xl mx-auto py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 animate-fade-in-up">
            <Sparkles size={14} /> 2.0 Version Now Live
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight animate-fade-in-up">
            Master the Art of <br />
            <span className="gradient-text">AI Prompting</span>
          </h1>
          <p className="text-indigo-200/60 text-lg md:text-xl max-w-3xl mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            The ultimate workbench for digital creators. Generate production-ready AI instructions, detailed blueprints, and market structures for any model in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={handleStart}
              className="bg-indigo-600 hover:bg-fuchsia-600 px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-2xl shadow-indigo-500/40 group"
            >
              Start Building Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setView('features')} className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-5 rounded-full font-bold text-lg transition-all">
              See How It Works
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'features') {
    return (
      <div className="min-h-screen bg-[#05010d]">
        <NavHeader />
        <div className="max-w-6xl mx-auto py-20 px-6">
          <h2 className="text-5xl font-black mb-16 text-center">Built for <span className="text-indigo-500">Scale</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Multi-Model Native", desc: "Optimized prompts specifically tuned for Claude 3.5, GPT-4, and Gemini 1.5 Pro." },
              { icon: Layers, title: "Structured Workflows", desc: "Guided questionnaires that extract exactly what the AI needs to know for best results." },
              { icon: Shield, title: "Persona Injection", desc: "Automatically inject expert personas like Senior Product Architects and Elite Strategists." },
              { icon: MessageSquare, title: "Zero-Shot Accuracy", desc: "Engineered instructions that minimize hallucination and maximize creative output." },
              { icon: Sparkles, title: "AI Refinement", desc: "Use our built-in Gemini engine to polish and perfect your prompts further." },
              { icon: Globe, title: "Blueprint Export", desc: "One-click copy of full product blueprints including sitemaps and content hooks." },
            ].map((f, i) => (
              <div key={i} className="p-10 glass-card rounded-3xl group hover:border-indigo-500/40 transition-all">
                <f.icon className="text-fuchsia-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-indigo-200/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'pricing') {
    return (
      <div className="min-h-screen bg-[#05010d]">
        <NavHeader />
        <div className="max-w-6xl mx-auto py-20 px-6">
          <h2 className="text-5xl font-black mb-16 text-center">Simple <span className="text-fuchsia-500">Pricing</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "$0", features: ["10 Prompts/mo", "Basic Templates", "ChatGPT Support", "Standard Export"] },
              { name: "Creator", price: "$29", features: ["Unlimited Prompts", "Advanced Templates", "All LLM Models", "AI Refinement Tool", "Email Support"], featured: true },
              { name: "Agency", price: "$99", features: ["Team Access", "Custom Templates", "API Integration", "White-label Exports", "Priority Support"] },
            ].map((p, i) => (
              <div key={i} className={`p-10 rounded-3xl flex flex-col ${p.featured ? 'bg-indigo-600 border-2 border-indigo-400 shadow-2xl shadow-indigo-500/20 scale-105' : 'glass-card'}`}>
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <div className="text-4xl font-black mb-8">{p.price}<span className="text-sm font-normal text-white/50">/mo</span></div>
                <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Zap size={14} className={p.featured ? 'text-white' : 'text-indigo-500'} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${p.featured ? 'bg-white text-indigo-600 hover:bg-white/90' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20'}`}>
                  Choose {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'reviews') {
    return (
      <div className="min-h-screen bg-[#05010d]">
        <NavHeader />
        <div className="max-w-5xl mx-auto py-20 px-6">
          <h2 className="text-5xl font-black mb-16 text-center">Loved by <span className="text-rose-500">Creators</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Sarah J.", role: "Digital Course Creator", text: "Prompt Maker changed how I build. I saved 20+ hours on my last curriculum design just by having the right prompt structure." },
              { name: "Mark T.", role: "Indie Hacker", text: "The multi-model support is huge. I get better results from Claude now because the prompts are actually tuned for it." },
              { name: "Elena R.", role: "Agency Owner", text: "We use the Blueprint Export for all our clients. It looks professional and the AI follows the logic perfectly every time." },
              { name: "David L.", role: "Product Manager", text: "Finally an app that doesn't just 'generate text' but actually helps you ARCHITECT a product. The guided flow is genius." },
            ].map((r, i) => (
              <div key={i} className="p-8 glass-card rounded-3xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-indigo-100 italic mb-6 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500" />
                  <div>
                    <h4 className="font-bold text-sm">{r.name}</h4>
                    <p className="text-xs text-white/40">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'faq') {
    return (
      <div className="min-h-screen bg-[#05010d]">
        <NavHeader />
        <div className="max-w-3xl mx-auto py-20 px-6">
          <h2 className="text-5xl font-black mb-16 text-center">Got <span className="text-indigo-400">Questions?</span></h2>
          <div className="space-y-4">
            {[
              { q: "Is this just a prompt library?", a: "No. It's a prompt ARCHITECT. We use guided questions to build custom prompts tailored to your specific product, audience, and goal." },
              { q: "Which AI models do you support?", a: "Currently ChatGPT (GPT-3.5/4), Claude (3.0/3.5), Gemini Pro/Flash, and several specialized Google tools like NotebookLM." },
              { q: "Do I need my own API keys?", a: "To use the basic prompt generation, no. To use the 'Refine with Gemini' feature, we use an integrated system, but for high-volume use, you can bring your own key." },
              { q: "Can I cancel anytime?", a: "Absolutely. Our Creator and Agency plans are month-to-month. You can downgrade to the free tier at any time." },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-indigo-100">{item.q}</span>
                  {openFaq === i ? <Minus size={20} className="text-indigo-400" /> : <Plus size={20} className="text-indigo-400" />}
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-indigo-200/50 text-sm leading-relaxed border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'tool-select') {
    return (
      <div className="min-h-screen bg-[#05010d] p-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <button onClick={() => setView('landing')} className="flex items-center gap-3">
              <Zap className="text-indigo-500" size={32} />
              <span className="text-2xl font-black">Prompt Maker</span>
            </button>
            <button className="text-indigo-300/40 hover:text-white font-bold text-sm tracking-tight uppercase">User Dashboard</button>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-4 tracking-tight">Select Your <span className="text-indigo-400">Weapon</span></h1>
            <p className="text-indigo-200/40 text-lg max-w-2xl mx-auto">
              Choose the AI model you want to engineer for. Every output is optimized for the specific architecture of the chosen tool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => { setSelectedTool(tool); setStep(1); setView('wizard'); }}
                className="group p-10 glass-card rounded-3xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-left relative overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-8 shadow-2xl shadow-current/20`}>
                  <tool.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4">{tool.name}</h3>
                <div className="flex items-center text-indigo-400 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                  Select Tool <ArrowRight size={14} className="ml-2" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all duration-700"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05010d] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-4xl">
        <button 
          onClick={() => setView('tool-select')}
          className="flex items-center gap-2 text-indigo-300/40 hover:text-white mb-8 transition-colors group font-bold uppercase text-xs tracking-widest"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Tool Selection
        </button>

        <div className="flex justify-between items-end mb-4">
          <h2 className="text-4xl font-black tracking-tight">Building with <span className="text-fuchsia-500">{selectedTool?.name}</span></h2>
          <span className="text-indigo-300/20 text-sm font-black tracking-widest uppercase mb-1">{step} / {totalSteps} Steps</span>
        </div>

        <div className="w-full bg-white/5 h-1.5 rounded-full mb-12 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 h-full transition-all duration-700 ease-out" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="glass-card rounded-[2.5rem] p-12 shadow-2xl">
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="text-3xl font-black text-center mb-12">Choose your digital asset</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => { setAnswers({ ...answers, productType: type.label }); setStep(2); }}
                    className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border transition-all hover:scale-105 ${
                      answers.productType === type.label 
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-100' 
                        : 'bg-white/5 border-white/10 hover:border-indigo-500/30'
                    }`}
                  >
                    <span className="text-3xl">{type.emoji}</span>
                    <span className="font-bold text-[11px] text-center uppercase tracking-tight">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="text-3xl font-black text-center mb-12">Who is this for?</h3>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-indigo-100 placeholder-indigo-300/20 focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all h-56 mb-8 text-lg font-medium leading-relaxed"
                placeholder="Describe your target audience in detail..."
                value={answers.audience || ''}
                onChange={(e) => setAnswers({ ...answers, audience: e.target.value })}
              />
              <div className="flex flex-wrap gap-3 justify-center">
                {['Entrepeneurs', 'Developers', 'Makers', 'Designers', 'Content Creators'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setAnswers({ ...answers, audience: tag })}
                    className="px-6 py-2 bg-white/5 rounded-full text-xs font-bold text-indigo-300/40 hover:bg-indigo-600 hover:text-white transition-all border border-white/5"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="text-3xl font-black text-center mb-12">What is the core mission?</h3>
              <div className="grid grid-cols-1 gap-4 mb-8">
                {[
                  { id: 'teach', label: 'To teach a high-value skill', icon: PenTool },
                  { id: 'save', label: 'To automate repetitive tasks', icon: Clock },
                  { id: 'inspire', label: 'To guide and inspire creation', icon: Sparkles },
                  { id: 'research', label: 'To deep dive into market data', icon: Search },
                ].map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => { setAnswers({ ...answers, goal: goal.label }); setStep(4); }}
                    className={`flex items-center justify-between p-8 rounded-3xl border transition-all group ${
                      answers.goal === goal.label 
                        ? 'bg-fuchsia-600/20 border-fuchsia-500' 
                        : 'bg-white/5 border-white/10 hover:border-fuchsia-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <goal.icon className="text-fuchsia-400 group-hover:scale-110 transition-transform" />
                      <span className="font-extrabold text-xl">{goal.label}</span>
                    </div>
                    <ChevronRight size={20} className="text-white/20" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in-up">
              <h3 className="text-3xl font-black text-center mb-12">Output Tone & Style</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Direct & Pro', 'Enthusiastic', 'Clean Minimalist', 'Deep Technical', 'Provocative', 'Academic'].map(tone => (
                  <button
                    key={tone}
                    onClick={() => setAnswers({ ...answers, tone: tone })}
                    className={`p-8 rounded-3xl border font-black text-sm uppercase tracking-widest transition-all ${
                      answers.tone === tone 
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-500/20' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 flex justify-between gap-6">
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : setView('tool-select')}
              className="flex-1 py-5 rounded-2xl border border-white/10 font-black text-indigo-300/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
            >
              <ChevronLeft size={16} />
              Previous Step
            </button>
            <button 
              onClick={() => { if(step === totalSteps) generateFinalPrompt(); else setStep(step + 1); }}
              disabled={step === 2 && !answers.audience}
              className={`flex-[2] py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs ${
                step === 2 && !answers.audience
                ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                : 'bg-indigo-600 hover:bg-fuchsia-600 text-white shadow-2xl shadow-indigo-500/40'
              }`}
            >
              {step === totalSteps ? 'Generate Blueprint' : 'Continue'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <OutputDrawer 
        prompt={generatedPrompt} 
        onClose={() => { setGeneratedPrompt(null); setView('tool-select'); }} 
      />
    </div>
  );
};

export default App;