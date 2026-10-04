import React, { useState } from 'react';
import { Navigation, Clock, AlertTriangle, ArrowRight, Building, MapPin, Zap } from 'lucide-react';

interface HeroSpatialProps {
  onExploreSimulator: () => void;
  onExploreSectors: () => void;
}

export const HeroSpatial: React.FC<HeroSpatialProps> = ({
  onExploreSimulator,
  onExploreSectors
}) => {
  const [activeFrictionStage, setActiveFrictionStage] = useState<'macro' | 'curb' | 'vertical' | 'door'>('curb');

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-800">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Subtitle & Title */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-4 uppercase">
            <span>Spatial Logistics</span>
            <span aria-hidden="true">·</span>
            <span>Micro-Wayfinding Protocol</span>
            <span aria-hidden="true">·</span>
            <span>Urban Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
            The Last 100 Metres Crisis
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
            Bridging the gap between the macro grid of our cities and the micro destinations where we live, heal, and work. While GPS guides vehicles 5 miles across a metropolis with ease, navigation completely collapses the moment a vehicle pulls up to the curb.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreSimulator}
              className="px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <span>Explore Digital Twin Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreSectors}
              className="px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap"
            >
              Examine 3 Sector Crises
            </button>
          </div>
        </div>

        {/* The 15-Minute Paradox Visual Comparison */}
        <div className="mt-12 bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">The Core Friction Point</span>
              <h2 className="text-xl font-bold text-white mt-1">The 15-Minute Paradox</h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Macro Grid (Functional)
              </span>
              <span aria-hidden="true">/</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                Micro Segment (Failing)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {/* Macro Journey */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Segment A: City Arterial Drive</h3>
                    <p className="text-xs text-slate-400">5.2 Miles · Highway & Avenues</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">15:00</span>
                  <span className="text-xs text-slate-400 block">minutes</span>
                </div>
              </div>

              {/* Progress visualizer */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-full rounded-full" />
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Navigational System:</span>
                  <span className="font-medium text-slate-200">Global Positioning System (GPS)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Signal Environment:</span>
                  <span className="text-emerald-400 font-mono">12+ Satellites in Direct Sight</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Positional Accuracy:</span>
                  <span className="font-mono text-slate-200">± 2.5 metres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Operational Velocity:</span>
                  <span className="font-mono text-slate-200">28.5 mph avg</span>
                </div>
                <p className="text-slate-400 pt-1 border-t border-slate-800/80">
                  Reliable open sky line-of-sight and synchronized municipal traffic networks guide the vehicle effortlessly to 450 Grand Avenue.
                </p>
              </div>
            </div>

            {/* Micro Journey */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Segment B: Curb to Suite 1402</h3>
                    <p className="text-xs text-slate-400">100 Metres · Curb, Security, Elevator, Hallways</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-rose-400 tabular-nums">15:00</span>
                  <span className="text-xs text-rose-400/80 block">minutes</span>
                </div>
              </div>

              {/* Progress visualizer */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                <div className="bg-amber-500 h-full w-1/4" title="Parking & Curb Search (4m)" />
                <div className="bg-rose-500 h-full w-1/3" title="Security & Checkpoint (5m)" />
                <div className="bg-purple-500 h-full w-1/4" title="Elevator Transit (3.5m)" />
                <div className="bg-red-400 h-full w-1/6" title="Corridor Search (2.5m)" />
              </div>

              <div className="p-4 bg-slate-950/60 border border-rose-900/40 rounded-lg text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Navigational System:</span>
                  <span className="font-medium text-rose-300">Completely Unassisted (Blind)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Signal Environment:</span>
                  <span className="text-rose-400 font-mono">0 Satellites (Faraday Attenuation)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Positional Accuracy:</span>
                  <span className="font-mono text-rose-300">Total Failure (0% Z-Axis)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Effective Velocity:</span>
                  <span className="font-mono text-rose-300">0.24 mph (crawling)</span>
                </div>
                <p className="text-slate-400 pt-1 border-t border-slate-800/80">
                  Driver wastes equal time finding a legal parking spot, clearing building security, waiting for the freight elevator, and searching identical maze-like corridors.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Micro Friction Breakdown Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Where the final 15 minutes evaporate:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div 
                onClick={() => setActiveFrictionStage('curb')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeFrictionStage === 'curb'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-mono text-amber-400 tabular-nums">4.0 min</div>
                <div className="text-xs font-medium text-slate-200 mt-1">Curb & Parking Search</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Circling block, red curb, dock loading gates</div>
              </div>

              <div 
                onClick={() => setActiveFrictionStage('macro')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeFrictionStage === 'macro'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-mono text-amber-400 tabular-nums">5.0 min</div>
                <div className="text-xs font-medium text-slate-200 mt-1">Perimeter & Clearance</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Security queue, intercom codes, badging</div>
              </div>

              <div 
                onClick={() => setActiveFrictionStage('vertical')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeFrictionStage === 'vertical'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-mono text-amber-400 tabular-nums">3.5 min</div>
                <div className="text-xs font-medium text-slate-200 mt-1">Vertical Elevation (Z)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Elevator dispatch, floor lockouts, stairs</div>
              </div>

              <div 
                onClick={() => setActiveFrictionStage('door')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeFrictionStage === 'door'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-mono text-amber-400 tabular-nums">2.5 min</div>
                <div className="text-xs font-medium text-slate-200 mt-1">Corridor Labyrinth</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Searching unit 1402, wing disconnects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Adjacency Proof Row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Logistics Impact</span>
            <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">53.2%</div>
            <p className="text-xs text-slate-400 mt-1">
              Of total delivery operational cost and driver on-duty hours consumed in the final 100 metres.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-mono text-rose-400 uppercase tracking-wider">Emergency Survival</span>
            <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">3.8 min</div>
            <p className="text-xs text-slate-400 mt-1">
              Average delay for paramedics searching high-rise residential complexes—every minute lost reduces cardiac survival by 7–10%.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Accessibility Deficit</span>
            <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">71%</div>
            <p className="text-xs text-slate-400 mt-1">
              Of multi-tenant commercial & residential complexes contain unmapped physical barriers (steps, non-functional elevators).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
