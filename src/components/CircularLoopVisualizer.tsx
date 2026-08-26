import React, { useState } from 'react';
import { circularLoopNodes } from '../data/mockData';
import { CircularNodeDetail } from '../types';
import { 
  Repeat, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Layers,
  Zap,
  Leaf
} from 'lucide-react';

export const CircularLoopVisualizer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(circularLoopNodes[0].id);

  const selectedNode = circularLoopNodes.find((n) => n.id === selectedNodeId) || circularLoopNodes[0];

  return (
    <div id="circular-loop-visualizer-view" className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Repeat className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
          <span>Signature Closed-Loop Architecture</span>
        </div>
        <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold text-emerald-950">
          The Punarnava Loop
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Transforming linear "Take-Make-Dispose" into an autonomous circular value engine.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Circular Orbital Stage */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xs flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 bg-radial from-emerald-100/40 via-teal-50/20 to-transparent pointer-events-none" />

          {/* Center Hub */}
          <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
            
            {/* Outer Orbit SVG with flowing dashed animation */}
            <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] pointer-events-none" viewBox="0 0 400 400">
              <circle 
                cx="200" 
                cy="200" 
                r="160" 
                stroke="#A7F3D0" 
                strokeWidth="4" 
                fill="none" 
              />
              <circle 
                cx="200" 
                cy="200" 
                r="160" 
                stroke="#059669" 
                strokeWidth="4" 
                strokeDasharray="12 12" 
                fill="none" 
                className="animate-flow-line" 
              />
            </svg>

            {/* Central Core Pulse */}
            <div className="relative z-20 w-32 h-32 rounded-3xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white p-4 flex flex-col items-center justify-center text-center shadow-xl shadow-emerald-600/25 select-none">
              <span className="text-3xl animate-pulse-leaf">♻️</span>
              <h4 className="font-['Space_Grotesk',sans-serif] font-black text-xs uppercase tracking-wider mt-1">
                PUNARNAVA
              </h4>
              <span className="text-[9px] text-emerald-100 font-bold">100% CIRCULAR</span>
            </div>

            {/* Orbiting Interactive Stage Nodes */}
            {circularLoopNodes.map((node, idx) => {
              const totalNodes = circularLoopNodes.length;
              const angle = (idx / totalNodes) * 2 * Math.PI - Math.PI / 2;
              const radius = 160; // radius from center
              // Coordinates relative to 400x400 center (200, 200) in percentage
              const xPercent = 50 + (radius / 200) * 45 * Math.cos(angle);
              const yPercent = 50 + (radius / 200) * 45 * Math.sin(angle);
              const isSelected = selectedNodeId === node.id;

              return (
                <button
                  key={node.id}
                  id={`loop-node-${node.id}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115 z-20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg border-2 transition-all ${
                    isSelected
                      ? 'bg-emerald-600 border-white text-white ring-4 ring-emerald-300 shadow-emerald-600/40'
                      : 'bg-white hover:bg-emerald-50 border-emerald-200 text-slate-900'
                  }`}>
                    {node.icon}
                  </div>

                  <span className={`text-[10px] font-bold absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-full shadow-2xs whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-950 text-white'
                      : 'bg-white/95 text-slate-800 border border-slate-200 group-hover:border-emerald-300'
                  }`}>
                    {node.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}

          </div>

          <div className="mt-8 text-center text-xs text-slate-500 font-medium">
            Click any stage along the continuous loop to inspect operations and metrics.
          </div>

        </div>

        {/* Right Column: Deep-Dive Stage Inspector */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6 text-left">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Loop Stage Analysis
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Active Stage
            </span>
          </div>

          <div className="space-y-4">
            
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                {selectedNode.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  {selectedNode.subtitle}
                </span>
                <h3 className="font-['Outfit',sans-serif] text-2xl font-extrabold text-slate-900">
                  {selectedNode.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedNode.description}
            </p>

            {/* Key Stage Metric */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {selectedNode.metricLabel}
                </span>
                <span className="font-['Space_Grotesk',sans-serif] text-2xl font-black text-emerald-950 block mt-0.5">
                  {selectedNode.metric}
                </span>
              </div>
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>

            {/* Operational Details List */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                Technical Highlights & Value Mechanisms:
              </span>
              <div className="space-y-2">
                {selectedNode.details.map((det, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{det}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Cycle Navigation Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
            {circularLoopNodes.map((n) => (
              <button
                key={n.id}
                onClick={() => setSelectedNodeId(n.id)}
                className={`p-2 rounded-xl text-xs transition-all ${
                  selectedNodeId === n.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-emerald-100 text-slate-700'
                }`}
                title={n.title}
              >
                {n.icon}
              </button>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
