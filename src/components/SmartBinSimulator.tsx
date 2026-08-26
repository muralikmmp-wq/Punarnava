import React, { useState, useEffect } from 'react';
import { SmartBinComponentInfo } from '../types';
import { 
  Camera, 
  Droplets, 
  Radio, 
  Settings, 
  RotateCw, 
  Trash2, 
  Play, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SmartBinSimulator: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('cam-1');
  const [simWasteType, setSimWasteType] = useState<string>('pet');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0); // 0: Idle, 1: Enters, 2: AI Detects, 3: Carousel Rotates, 4: Bin Opens & Drops, 5: Complete
  const [carouselAngle, setCarouselAngle] = useState<number>(0);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    'System initialized • Ready for item intake',
    'Sensors calibrated: AI Camera (Active), Moisture (Active), Proximity (Ready)'
  ]);

  const components: SmartBinComponentInfo[] = [
    {
      id: 'cam-1',
      name: 'AI High-Speed Vision Camera',
      role: 'Optical Polymer & Geometry Recognition',
      status: 'active',
      description: 'Identifies the waste material using computer vision and edge inference models in under 120ms.',
      icon: 'Camera',
      technicalSpecs: 'Sony IMX Sensor • 120 FPS • Onboard Neural Processing Unit (NPU) running quantized MobileNet-Waste v4'
    },
    {
      id: 'moist-1',
      name: 'Dielectric Moisture Sensor',
      role: 'Wet vs Dry Moisture Differential',
      status: 'active',
      description: 'Helps distinguish wet and dry waste by measuring dielectric permittivity before routing to dry or organic hoppers.',
      icon: 'Droplets',
      technicalSpecs: 'Range: 0–100% RH • Response Time: 45ms • Non-contact capacitive surface'
    },
    {
      id: 'prox-1',
      name: 'ToF Laser Proximity Sensor',
      role: 'Intake Trigger & Proximity Wakeup',
      status: 'active',
      description: 'Detects waste entry and user approach to automatically awaken cameras and servos while conserving idle power.',
      icon: 'Radio',
      technicalSpecs: 'Time-of-Flight (ToF) • Range: 2cm–150cm • 940nm invisible laser emitter'
    },
    {
      id: 'servo-1',
      name: 'High-Torque Micro Servo Actuator',
      role: 'Trapdoor & Diverter Flap Gate',
      status: 'calibrated',
      description: 'Directs waste toward the appropriate compartment with rapid 60-degree deflection.',
      icon: 'Settings',
      technicalSpecs: 'Torque: 25 kg-cm • Metal Gears • Dual Ball Bearings • PWM Control 50Hz'
    },
    {
      id: 'carousel-1',
      name: 'Indexed Rotating Carousel Core',
      role: 'Multi-Compartment Rotary Alignment',
      status: 'active',
      description: 'Rotates the internal multi-compartment carousel with precision stepper indexing to receive segregated waste.',
      icon: 'RotateCw',
      technicalSpecs: 'NEMA 23 Stepper Motor • Micro-stepping 1/16 • Optical home position indexer'
    },
    {
      id: 'bins-1',
      name: '5-Bay Multi-Waste Compartments',
      role: 'Segregated Containment Bays',
      status: 'active',
      description: 'Interchangeable modular storage hoppers for Dry Recyclables, Pulp/Paper, Scrap Metals, Biomass/Dung, and Hazardous E-Waste.',
      icon: 'Trash2',
      technicalSpecs: 'Capacity: 5 x 45 Liters • Ultrasonic level sensors • Antibacterial inner lining'
    }
  ];

  const wasteSimScenarios: { [key: string]: { name: string; icon: string; category: string; targetAngle: number; targetBin: string; color: string; moisture: string } } = {
    pet: { name: 'PET Plastic Bottle', icon: '🧴', category: 'Dry Recyclable', targetAngle: 0, targetBin: 'Compartment 1 (Plastics)', color: '#10B981', moisture: '8% RH' },
    cardboard: { name: 'Cardboard Shipping Box', icon: '📦', category: 'Paper & Pulp', targetAngle: 72, targetBin: 'Compartment 2 (Paper)', color: '#0284C7', moisture: '12% RH' },
    copper: { name: 'Copper Scrap Wiring', icon: '⚡', category: 'Valuable Metal', targetAngle: 144, targetBin: 'Compartment 3 (Metals)', color: '#F59E0B', moisture: '4% RH' },
    dung: { name: 'Bovine Dung Biomass', icon: '🐄', category: 'Organic / Biomass', targetAngle: 216, targetBin: 'Compartment 4 (Biomass Hopper)', color: '#16A34A', moisture: '78% RH' },
    ewaste: { name: 'Electronic Circuit PCB', icon: '📟', category: 'E-Waste Vault', targetAngle: 288, targetBin: 'Compartment 5 (Hazardous)', color: '#EF4444', moisture: '5% RH' }
  };

  const currentWaste = wasteSimScenarios[simWasteType];

  const runSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    addLog(`Intake: ${currentWaste.name} placed in hopper`);

    await new Promise((r) => setTimeout(r, 600));
    setSimStep(2);
    addLog(`AI Inference: Identified ${currentWaste.name} (${currentWaste.category}) • Moisture: ${currentWaste.moisture}`);

    await new Promise((r) => setTimeout(r, 700));
    setSimStep(3);
    setCarouselAngle(currentWaste.targetAngle);
    addLog(`Carousel Stepper: Indexing ${currentWaste.targetAngle}° to align ${currentWaste.targetBin}`);

    await new Promise((r) => setTimeout(r, 800));
    setSimStep(4);
    addLog(`Servo Actuator: Trapdoor actuated • ${currentWaste.name} deposited cleanly`);

    await new Promise((r) => setTimeout(r, 700));
    setSimStep(5);
    addLog(`Verification Complete: Ready for next item • Logged to circular blockchain ledger`);
    setIsSimulating(false);

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.65 },
      colors: ['#10B981', '#34D399', '#6EE7B7']
    });
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTelemetryLogs((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const selectedComp = components.find((c) => c.id === selectedComponentId) || components[0];

  return (
    <div id="smart-bin-simulator-view" className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive Physical IoT Hardware Model</span>
        </div>
        <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold text-emerald-950">
          Smart Segregation Machine
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Explore how edge computer vision and robotic actuators segregate waste streams in 300 milliseconds.
        </p>
      </div>

      {/* Main Visual & Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Hardware Visual Stage */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                Machine CAD View & Live Mechanics
              </h3>
              <p className="text-xs text-slate-500">Click any component below or run the sorting simulation</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700">IoT Online</span>
            </div>
          </div>

          {/* Machine Interactive Visual Canvas */}
          <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-emerald-950 p-6 flex flex-col items-center justify-between text-white overflow-hidden shadow-inner border border-slate-700">
            
            {/* Top Intake & Sensor Bay */}
            <div className="relative z-10 w-full flex items-center justify-between px-4">
              
              {/* AI Camera node */}
              <button
                onClick={() => setSelectedComponentId('cam-1')}
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                  selectedComponentId === 'cam-1'
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/50'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                }`}
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold hidden sm:inline">AI Camera</span>
              </button>

              {/* Central Intake Chute */}
              <div className="relative flex flex-col items-center">
                <div className="w-24 sm:w-32 h-10 rounded-t-xl bg-slate-700 border-t-2 border-emerald-400 flex items-center justify-center shadow-lg">
                  <span className="text-[11px] font-bold text-emerald-300 tracking-wider">INTAKE CHUTE</span>
                </div>

                {/* Falling waste item animation during simulation */}
                <div className={`transition-all duration-500 transform ${
                  simStep === 1 ? 'translate-y-2 scale-110 opacity-100' :
                  simStep >= 2 && simStep <= 4 ? 'translate-y-16 scale-95 opacity-90' :
                  simStep === 5 ? 'translate-y-24 scale-75 opacity-0' :
                  'opacity-80'
                }`}>
                  <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 shadow-xl flex items-center justify-center text-2xl border-2 border-emerald-400 animate-pulse">
                    {currentWaste.icon}
                  </div>
                </div>
              </div>

              {/* Moisture Sensor node */}
              <button
                onClick={() => setSelectedComponentId('moist-1')}
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                  selectedComponentId === 'moist-1'
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/50'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                }`}
              >
                <Droplets className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold hidden sm:inline">Moisture Sensor</span>
              </button>

            </div>

            {/* Middle Section: Rotating Carousel Core */}
            <div className="relative my-auto flex flex-col items-center justify-center">
              
              {/* Carousel Container with CSS Rotation */}
              <div 
                className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full border-4 border-emerald-400/80 bg-slate-800/90 shadow-2xl flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${carouselAngle}deg)` }}
                onClick={() => setSelectedComponentId('carousel-1')}
              >
                {/* 5 Compartment Dividers */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-slate-600" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center transform rotate-72">
                  <div className="w-full h-0.5 bg-slate-600" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center transform rotate-144">
                  <div className="w-full h-0.5 bg-slate-600" />
                </div>

                {/* Central Stepper Axle */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-md flex items-center justify-center text-slate-950 font-black text-xs z-20">
                  <RotateCw className="w-5 h-5 text-emerald-950 animate-spin-slow" />
                </div>

                {/* Bay labels on rotating ring */}
                <span className="absolute top-2 text-[10px] font-bold text-emerald-300">Bay 1: PET</span>
                <span className="absolute right-2 text-[10px] font-bold text-blue-300">Bay 2: Paper</span>
                <span className="absolute bottom-3 right-5 text-[10px] font-bold text-amber-300">Bay 3: Metal</span>
                <span className="absolute bottom-3 left-5 text-[10px] font-bold text-green-300">Bay 4: Biomass</span>
                <span className="absolute left-2 text-[10px] font-bold text-red-300">Bay 5: E-Waste</span>
              </div>

              {/* Status pointer */}
              <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-md uppercase tracking-wider">
                Active Bay: {currentWaste.targetBin}
              </div>

            </div>

            {/* Bottom 5 Compartment Base */}
            <div className="relative z-10 w-full grid grid-cols-5 gap-1.5 pt-4 border-t border-slate-700/80">
              
              <button 
                onClick={() => setSelectedComponentId('bins-1')}
                className="p-1.5 rounded-lg bg-emerald-900/60 border border-emerald-500/40 text-center hover:bg-emerald-800/80 transition-all"
              >
                <span className="text-[10px] font-bold text-emerald-300 block">Bay 1</span>
                <span className="text-[9px] text-slate-300">Plastics</span>
              </button>

              <button 
                onClick={() => setSelectedComponentId('bins-1')}
                className="p-1.5 rounded-lg bg-blue-900/60 border border-blue-500/40 text-center hover:bg-blue-800/80 transition-all"
              >
                <span className="text-[10px] font-bold text-blue-300 block">Bay 2</span>
                <span className="text-[9px] text-slate-300">Paper</span>
              </button>

              <button 
                onClick={() => setSelectedComponentId('bins-1')}
                className="p-1.5 rounded-lg bg-amber-900/60 border border-amber-500/40 text-center hover:bg-amber-800/80 transition-all"
              >
                <span className="text-[10px] font-bold text-amber-300 block">Bay 3</span>
                <span className="text-[9px] text-slate-300">Metals</span>
              </button>

              <button 
                onClick={() => setSelectedComponentId('bins-1')}
                className="p-1.5 rounded-lg bg-green-900/60 border border-green-500/40 text-center hover:bg-green-800/80 transition-all"
              >
                <span className="text-[10px] font-bold text-green-300 block">Bay 4</span>
                <span className="text-[9px] text-slate-300">Biomass</span>
              </button>

              <button 
                onClick={() => setSelectedComponentId('bins-1')}
                className="p-1.5 rounded-lg bg-red-900/60 border border-red-500/40 text-center hover:bg-red-800/80 transition-all"
              >
                <span className="text-[10px] font-bold text-red-300 block">Bay 5</span>
                <span className="text-[9px] text-slate-300">E-Waste</span>
              </button>

            </div>

          </div>

          {/* Simulation Controller Panel */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-950 block">
                  Interactive Sorting Testbench
                </span>
                <span className="text-[11px] text-slate-500">
                  Select a test material to see live sensor triggering & carousel indexing
                </span>
              </div>

              {/* Simulation Trigger Button */}
              <button
                id="btn-run-bin-simulation"
                onClick={runSimulation}
                disabled={isSimulating}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isSimulating ? 'Segregating...' : 'Drop Item & Segregate'}</span>
              </button>
            </div>

            {/* Waste Selection Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
              {Object.entries(wasteSimScenarios).map(([key, item]) => {
                const isSelected = simWasteType === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSimWasteType(key);
                      setSimStep(0);
                    }}
                    className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-white border-emerald-400 shadow-xs ring-1 ring-emerald-400 font-bold text-emerald-900'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="overflow-hidden">
                      <span className="text-[11px] block truncate">{item.name}</span>
                      <span className="text-[9px] text-slate-400 block truncate">{item.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Column: Component Inspector & Real-Time IoT Telemetry Logs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Component Deep-Dive Card */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Component Inspector
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">
                Status: {selectedComp.status}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                    {selectedComp.name}
                  </h4>
                  <span className="text-xs text-emerald-700 font-semibold">{selectedComp.role}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {selectedComp.description}
              </p>
            </div>

            {/* Technical Specs Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Technical Specifications & Micro-Controller Protocol
              </span>
              <p className="text-xs font-mono text-slate-700 font-medium">
                {selectedComp.technicalSpecs}
              </p>
            </div>

            {/* Component Quick Selector list */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-bold text-slate-500 block">Click component to inspect:</span>
              <div className="grid grid-cols-2 gap-2">
                {components.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedComponentId(c.id)}
                    className={`px-3 py-2 rounded-xl text-left text-xs transition-all border ${
                      selectedComponentId === c.id
                        ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {c.name.split(' ')[0]} {c.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Live IoT Telemetry Console */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-md space-y-3 font-mono">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400">PUNARNAVA EDGE TELEMETRY</span>
              </div>
              <span className="text-[10px] text-slate-400">Baud: 115200</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 max-h-48 overflow-y-auto pr-1">
              {telemetryLogs.map((log, idx) => (
                <div key={idx} className="leading-snug">
                  <span className="text-emerald-400">{log}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
