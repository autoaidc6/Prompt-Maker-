// Fix: Added React import to resolve 'Cannot find namespace React' error for React.ElementType
import React from 'react';

export type ToolId = 'architect' | 'lab' | 'market' | 'web';

export interface ToolConfig {
  id: ToolId;
  name: string;
  description: string;
  icon: React.ElementType;
  fields: FormField[];
  template: (values: Record<string, string>) => string;
}

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}