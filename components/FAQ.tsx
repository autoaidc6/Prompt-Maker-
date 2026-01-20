
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_DATA } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-slate-400">Everything you need to know about Prompt Maker</p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((item, index) => (
          <div key={index} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-800/30">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800 transition-colors"
            >
              <span className="font-semibold text-slate-100">{item.question}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-height-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 pt-0 text-slate-400 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
