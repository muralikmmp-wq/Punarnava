import React, { useState, useRef, useEffect } from 'react';
import { TabType } from '../types';
import { 
  Sparkles, 
  Send, 
  X, 
  Leaf, 
  Scan, 
  Coins, 
  Bot, 
  ArrowRight,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface PunaAIAssistantProps {
  setActiveTab: (tab: TabType) => void;
}

interface Message {
  id: string;
  sender: 'puna' | 'user';
  text: string;
  actionSuggestion?: { label: string; tab: TabType };
  timestamp: string;
}

export const PunaAIAssistant: React.FC<PunaAIAssistantProps> = ({
  setActiveTab,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'puna',
      text: "Hi! I'm Puna, your AI Circular Advisor. What are you trying to recycle, monetize, or valorize today?",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    "Where should I dispose this?",
    "How much is my scrap worth?",
    "Can this become biogas?",
    "Find a recycler near me"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Call server or intelligent local expert rule engine
    try {
      const res = await fetch('/api/puna-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });
      const data = await res.json();

      let replyText = data.reply || '';
      let action: { label: string; tab: TabType } | undefined;

      const lower = textToSend.toLowerCase();
      if (lower.includes('dispose') || lower.includes('sort') || lower.includes('bottle') || lower.includes('identify')) {
        action = { label: 'Open Smart Sort Scanner', tab: 'smart-sort' };
      } else if (lower.includes('dung') || lower.includes('biogas') || lower.includes('cow') || lower.includes('energy')) {
        action = { label: 'Go to Digital Dung Bank', tab: 'dung-bank' };
      } else if (lower.includes('scrap') || lower.includes('worth') || lower.includes('sell') || lower.includes('price') || lower.includes('recycler')) {
        action = { label: 'Check Fair-Value Marketplace', tab: 'marketplace' };
      }

      const punaMsg: Message = {
        id: 'reply-' + Date.now(),
        sender: 'puna',
        text: replyText,
        actionSuggestion: action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, punaMsg]);
    } catch {
      // Fallback
      const fallbackMsg: Message = {
        id: 'fallback-' + Date.now(),
        sender: 'puna',
        text: `To maximize circular value for "${textToSend}", inspect the item with our Smart Sort scanner. If it is organic or bovine manure, deposit it in the Dung Bank to earn clean cooking gas & organic fertilizer credits!`,
        actionSuggestion: { label: 'Launch Smart Sort Scanner', tab: 'smart-sort' },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="puna-ai-assistant-container" className="fixed bottom-20 xl:bottom-6 right-5 z-50">
      
      {/* Floating Leaf-Shaped AI Button */}
      {!isOpen && (
        <button
          id="btn-open-puna-ai"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 p-3.5 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-600/35 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {/* Leaf Shape SVG */}
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              <path d="M50 15 C25 35 20 65 50 85 C80 65 75 35 50 15 Z" fill="white" />
              <path d="M50 25 L50 75" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
              <circle cx="62" cy="45" r="4" fill="#10B981" />
              <circle cx="38" cy="55" r="4" fill="#10B981" />
            </svg>
          </div>

          <div className="hidden sm:flex flex-col text-left pr-2">
            <div className="flex items-center gap-1">
              <span className="font-['Space_Grotesk',sans-serif] font-black text-xs">PUNA AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping" />
            </div>
            <span className="text-[10px] text-emerald-100 font-medium">Ask Circular Advisor</span>
          </div>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-white rounded-3xl border border-emerald-100 shadow-2xl flex flex-col overflow-hidden animate-fadeIn text-left">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-4 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-lg">
                🌱
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-['Space_Grotesk',sans-serif] font-bold text-sm">
                    Puna AI Advisor
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-800/80 text-emerald-100 font-semibold">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-emerald-100">Waste-to-Wealth Intelligence</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => {
              const isPuna = msg.sender === 'puna';
              return (
                <div key={msg.id} className={`flex ${isPuna ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs ${
                    isPuna
                      ? 'bg-white text-slate-800 border border-emerald-100 shadow-xs'
                      : 'bg-emerald-600 text-white shadow-xs'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    {/* Action shortcut button */}
                    {msg.actionSuggestion && (
                      <button
                        onClick={() => {
                          setActiveTab(msg.actionSuggestion!.tab);
                          setIsOpen(false);
                        }}
                        className="mt-2.5 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200 transition-all cursor-pointer"
                      >
                        <span>{msg.actionSuggestion.label}</span>
                        <ArrowRight className="w-3 h-3 text-emerald-600" />
                      </button>
                    )}

                    <span className={`text-[9px] block mt-1 ${isPuna ? 'text-slate-400' : 'text-emerald-200'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-500 rounded-2xl p-3 text-xs border border-emerald-100 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-slate-400 pl-1">Puna is calculating...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-semibold border border-emerald-200 transition-all shrink-0 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything about waste, dung or scrap..."
              className="flex-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-emerald-500 font-medium"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
