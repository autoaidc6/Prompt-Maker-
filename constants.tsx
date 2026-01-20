
import React from 'react';
import { Layout, FlaskConical, Search, Globe, Box, Terminal, MessageSquare, BookOpen } from 'lucide-react';
import { ToolConfig } from './types';

export const TOOLS: ToolConfig[] = [
  {
    id: 'architect',
    name: 'Prompt Architect',
    description: 'General high-level prompting for complex logic.',
    icon: Layout,
    fields: [
      { id: 'goal', label: 'What is your primary goal?', placeholder: 'e.g., Write a technical blog post about Kubernetes', type: 'textarea' },
      { id: 'audience', label: 'Who is your audience?', placeholder: 'e.g., Senior DevOps Engineers', type: 'text' },
      { id: 'tone', label: 'What tone do you want?', placeholder: 'e.g., Professional yet approachable', type: 'text' },
      { id: 'constraints', label: 'Any specific constraints?', placeholder: 'e.g., Under 1500 words, use code examples', type: 'text' },
    ],
    template: (v) => `
# SYSTEM ROLE
Act as an expert content strategist and domain expert.

# TASK
Your primary objective is to: ${v.goal}

# TARGET AUDIENCE
The content must be tailored specifically for: ${v.audience}

# VOICE AND TONE
Maintain a ${v.tone} throughout the response.

# CONSTRAINTS & REQUIREMENTS
- ${v.constraints || 'None specified'}
- Use clear formatting (Markdown)
- Ensure all technical details are accurate

# OUTPUT FORMAT
Provide a detailed response following a logical hierarchy.
`.trim(),
  },
  {
    id: 'lab',
    name: 'Product Lab',
    description: 'Generate outlines for eBooks, courses, and digital products.',
    icon: FlaskConical,
    fields: [
      { id: 'niche', label: 'Product Niche/Topic', placeholder: 'e.g., AI for Photographers', type: 'text' },
      { id: 'format', label: 'Product Format', placeholder: 'e.g., 5-Day Video Course', type: 'text' },
      { id: 'learnings', label: 'Key Learning Outcomes', placeholder: 'e.g., Automating editing with Lightroom AI', type: 'textarea' },
    ],
    template: (v) => `
# SYSTEM ROLE
Act as a world-class instructional designer and product developer.

# PRODUCT CONTEXT
Create a comprehensive structure for a ${v.format} in the ${v.niche} niche.

# CORE VALUE PROPOSITION
The user should master: ${v.learnings}

# DELIVERABLES
1. A multi-module outline
2. Key takeaway for each module
3. Suggested exercises or assignments
4. A marketing hook for the landing page
`.trim(),
  },
  {
    id: 'market',
    name: 'Market Intelligence',
    description: 'Competition research and trend searching prompts.',
    icon: Search,
    fields: [
      { id: 'industry', label: 'Industry Sector', placeholder: 'e.g., Sustainable Fashion', type: 'text' },
      { id: 'competitor', label: 'Main Competitor', placeholder: 'e.g., Patagonia', type: 'text' },
      { id: 'focus', label: 'Research Focus', placeholder: 'e.g., Customer retention strategies', type: 'textarea' },
    ],
    template: (v) => `
# SYSTEM ROLE
Act as a senior business analyst and market researcher.

# RESEARCH OBJECTIVE
Conduct a SWOT analysis and strategic deep-dive for the ${v.industry} sector.

# COMPETITIVE BENCHMARK
Primary focus: ${v.competitor}

# SPECIFIC INQUIRY
Analyze their performance regarding: ${v.focus}

# REQUIRED DATA POINTS
- Market positioning
- Pricing strategy analysis
- Predicted 2024 trends
- Identified gaps in their current offering
`.trim(),
  },
  {
    id: 'web',
    name: 'Web & App Builder',
    description: 'Landing page structures and app logic flows.',
    icon: Globe,
    fields: [
      { id: 'appIdea', label: 'App or Website Idea', placeholder: 'e.g., SaaS for plant watering tracking', type: 'textarea' },
      { id: 'techStack', label: 'Preferred Tech Stack', placeholder: 'e.g., Next.js, Tailwind, Supabase', type: 'text' },
      { id: 'features', label: 'Must-have Features', placeholder: 'e.g., User auth, push notifications, dashboard', type: 'text' },
    ],
    template: (v) => `
# SYSTEM ROLE
Act as a Lead Full-Stack Architect and UI/UX Designer.

# PROJECT BRIEF
Design a technical architecture and UI structure for: ${v.appIdea}

# TECHNOLOGY STACK
Stack requirements: ${v.techStack}

# CORE FUNCTIONALITIES
Required features: ${v.features}

# OUTPUT REQUIREMENTS
1. Information Architecture (Sitemap)
2. Database Schema recommendation
3. API Endpoint definitions
4. Component tree for the frontend
5. Logic flow for the primary user journey
`.trim(),
  }
];

export const FAQ_DATA = [
  {
    question: "How it works",
    answer: "Users select a specialized tool from the sidebar, answer guided questions designed by expert prompt engineers, and Prompt Maker generates optimized, multi-part prompts ready for immediate use in any LLM."
  },
  {
    question: "What can I build?",
    answer: "You can create outlines for eBooks, full online course curriculum, SaaS product roadmaps, deep market research reports, landing page wireframes, and complex application logic flows."
  },
  {
    question: "Is it free?",
    answer: "Yes, we offer a Free tier for basic tools. Advanced templates and AI-powered refinement features are available for Pro members."
  },
  {
    question: "Tools supported",
    answer: "Our generated prompts are optimized for OpenAI's GPT-4, Anthropic's Claude 3.5, and Google's Gemini Pro/Flash (including AI Studio and NotebookLM)."
  }
];
