import React, { useState } from 'react';
import { 
  Radio, 
  Layers, 
  Lock, 
  FileSpreadsheet, 
  Cpu, 
  Wifi, 
  Compass, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const CoreBarriersExplainer: React.FC = () => {
  const [activeBarrierId, setActiveBarrierId] = useState<string>('indoor_gps');

  const barriers = [
    {
      id: 'indoor_gps',
      title: '1. Physics of Satellite Attenuation',
      subtitle: 'RF Signal Decay & Multi-path Reflections',
      icon: Radio,
      summary: 'Standard GPS operates on microwave bands (L1: 1575.42 MHz) emitted from 20,000 km altitude with a signal strength of just -130 dBm at ground level.',
      problemDetail: 'Reinforced concrete, low-emissivity glass, and steel rebars act as an accidental Faraday cage, attenuating satellite signal by 20 to 40 dB. The faint signals that do penetrate bounce off metal ducts, causing multi-path phase errors where receivers calculate locations 50 metres away from reality.',
      zAxisIssue: 'GPS geometry provides poor vertical Dilution of Precision (VDOP). Standard smartphones cannot determine whether a user is on Floor 1, Floor 7, or Floor 14.',
      solution: 'Ultra-Wideband (UWB) Time-of-Flight ranging and Wi-Fi RTT (802.11mc) anchors providing 10–30 cm indoor spatial accuracy without satellite dependencies.'
    },
    {
      id: 'parcel_centroid',
      title: '2. The 2D Parcel Centroid Trap',
      subtitle: 'Street Centerline Addresses vs Physical Portals',
      icon: Layers,
      summary: 'Addresses are legal and cadastral constructs, not spatial routing vectors.',
      problemDetail: 'When a user enters "700 Corporate Boulevard", modern GIS geocodes this to either the centerline of the roadway or the geometric center of the tax parcel. On a 40-acre medical or corporate campus, this centroid may be 300 metres away from the actual visitor entrance or loading dock.',
      zAxisIssue: 'A 2D coordinate (latitude, longitude) contains zero metadata regarding elevation, door swing clearance, loading bay height limits, or step-free ramps.',
      solution: 'Open Micro-Geocoding: Multi-dimensional spatial descriptors that bind specific ingress portals, floor z-indices, and loading bays to the base street address.'
    },
    {
      id: 'human_protocols',
      title: '3. Human Protocol & Access Friction',
      subtitle: 'Physical Badging, Intercoms & Dock Bureaucracy',
      icon: Lock,
      summary: 'Physical barriers are compounded by fragmented human gatekeeping systems.',
      problemDetail: 'Even if an operator knows where an apartment or loading bay is located, they encounter locked callboxes with missing resident directories, badge turnstiles requiring paper sign-in logs, and loading docks requiring prior day reservations with security guards.',
      zAxisIssue: 'Elevator banks frequently lock out residential or office floors without RFID fobs, stranding delivery couriers and slowing emergency responders.',
      solution: 'Decentralized digital access tokens (One-Time Access Credentials / QR tokens) pushed directly to logistics dispatchers and verified municipal EMS terminals.'
    },
    {
      id: 'cad_silos',
      title: '4. Architectural Data Silos',
      subtitle: 'BIM / CAD Trapped in Static Formats',
      icon: FileSpreadsheet,
      summary: 'Building floor plans exist, but they are trapped inside static PDF blueprints or proprietary Revit BIM files.',
      problemDetail: 'Architects and facility managers maintain rich 3D Building Information Models (BIM), but this data is never converted into routable vector topology. Navigation software providers have no standardized way to ingest private indoor floor plans.',
      zAxisIssue: 'Indoor changes (temporary construction barriers, broken elevators, renumbered suites) take months to reflect, if ever.',
      solution: 'Standardized Indoor Spatial Exchange formats like OGC IndoorGML and IMDF (Indoor Mapping Data Format) that turn BIM into open routing graphs.'
    }
  ];

  const selectedBarrier = barriers.find(b => b.id === activeBarrierId) || barriers[0];

  return (
    <section className="py-16 md:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <span>Root Cause Analysis</span>
            <span aria-hidden="true">·</span>
            <span>Why Navigation Breaks Down</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Four Core Technology Barriers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            The Last 100 Metres crisis is not simply a mapping oversight—it is the result of four intersecting physical, mathematical, and organizational bottlenecks.
          </p>
        </div>

        {/* 2-Zone Layout: Left Barrier Selector + Right Technical Dissection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Barrier Navigation List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {barriers.map((barrier) => {
              const Icon = barrier.icon;
              const isSelected = barrier.id === activeBarrierId;
              return (
                <button
                  key={barrier.id}
                  onClick={() => setActiveBarrierId(barrier.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-950 border border-cyan-800/80 text-cyan-400' : 'bg-slate-900 text-slate-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{barrier.title}</h4>
                      <p className="text-[11px] text-slate-400">{barrier.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 pl-11">
                    {barrier.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Technical Analysis Stage (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Barrier Technical Dissection
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {selectedBarrier.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedBarrier.subtitle}
              </p>
            </div>

            {/* Problem Mechanics */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Physical & Structural Failure
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedBarrier.problemDetail}
              </p>
            </div>

            {/* The Z-Axis Altitude Void */}
            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                The Missing Vertical Coordinate
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedBarrier.zAxisIssue}
              </p>
            </div>

            {/* Technological Antidote */}
            <div className="p-4 rounded-lg bg-cyan-950/30 border border-cyan-800/50 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                The Modern Engineering Solution
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedBarrier.solution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
