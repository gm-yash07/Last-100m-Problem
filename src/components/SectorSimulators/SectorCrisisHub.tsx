import React, { useState } from 'react';
import { 
  Truck, 
  HeartPulse, 
  Accessibility, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle, 
  Flame, 
  Activity, 
  Zap, 
  Sliders 
} from 'lucide-react';

export const SectorCrisisHub: React.FC = () => {
  const [activeSector, setActiveSector] = useState<'logistics' | 'emergency' | 'accessibility'>('logistics');

  // Logistics state
  const [dailyDropsPerVan, setDailyDropsPerVan] = useState<number>(120);
  const [highRisePercentage, setHighRisePercentage] = useState<number>(45);
  const [avgSearchMinutes, setAvgSearchMinutes] = useState<number>(8);
  const [driverHourlyWage, setDriverHourlyWage] = useState<number>(28);

  // Emergency state
  const [arrivalSearchDelayMinutes, setArrivalSearchDelayMinutes] = useState<number>(5.5);
  const [incidentType, setIncidentType] = useState<'cardiac' | 'stroke' | 'fire'>('cardiac');

  // Accessibility state
  const [hasElevatorFailure, setHasElevatorFailure] = useState<boolean>(true);
  const [hasHeavyManualDoors, setHasHeavyManualDoors] = useState<boolean>(true);
  const [hasTactilePath, setHasTactilePath] = useState<boolean>(false);

  // Calculations for Logistics
  const highRiseDrops = Math.round(dailyDropsPerVan * (highRisePercentage / 100));
  const dailyLostHours = (highRiseDrops * avgSearchMinutes) / 60;
  const annualCostWasted = dailyLostHours * driverHourlyWage * 260; // 260 working days
  const annualCO2Kg = dailyLostHours * 2.4 * 260; // 2.4 kg CO2/hr idling

  // Calculations for Emergency (Cardiac arrest survival: drops ~8-10% per minute)
  // Baseline response: 4 mins driving + arrivalSearchDelayMinutes
  const totalResponseMinutes = 4.2 + arrivalSearchDelayMinutes;
  const survivalRate = Math.max(
    5,
    Math.min(85, Math.round(85 - (totalResponseMinutes - 4) * 11))
  );

  return (
    <section className="py-16 md:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <span>Sector Diagnostics</span>
            <span aria-hidden="true">·</span>
            <span>Compounding Social & Economic Impact</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Three Critical Fronts
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            The failure of navigation at the building envelope triggers severe systemic crises across commerce, human mortality, and civil accessibility rights.
          </p>
        </div>

        {/* Sector Interactive Segmented Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => setActiveSector('logistics')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeSector === 'logistics'
                ? 'bg-slate-900 border-cyan-400 text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Truck className={`w-5 h-5 ${activeSector === 'logistics' ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="font-bold text-sm text-white">1. Logistics & Commerce</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              50% delivery cost eaten in the final 100 metres; parking tickets, idling, missed windows.
            </p>
          </button>

          <button
            onClick={() => setActiveSector('emergency')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeSector === 'emergency'
                ? 'bg-slate-900 border-rose-500 text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className={`w-5 h-5 ${activeSector === 'emergency' ? 'text-rose-400' : 'text-slate-500'}`} />
              <span className="font-bold text-sm text-white">2. Emergency Services</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Life-saving golden minutes lost finding exact unit; Knox box stalls and locked stairwells.
            </p>
          </button>

          <button
            onClick={() => setActiveSector('accessibility')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeSector === 'accessibility'
                ? 'bg-slate-900 border-amber-400 text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Accessibility className={`w-5 h-5 ${activeSector === 'accessibility' ? 'text-amber-400' : 'text-slate-500'}`} />
              <span className="font-bold text-sm text-white">3. Universal Accessibility</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Invisible curb steps, broken elevators, non-automated heavy doors trapping residents.
            </p>
          </button>
        </div>

        {/* Tab 1: Logistics & E-Commerce */}
        {activeSector === 'logistics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Parameters (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Truck className="w-5 h-5 text-cyan-400" />
                    Delivery Van Friction Calculator
                  </h3>
                  <p className="text-xs text-slate-400">
                    Adjust vehicle route parameters to measure lost fleet capital.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-slate-950 border border-slate-800">
                  Last-100m Cost Model
                </span>
              </div>

              {/* Slider 1: Daily Drops */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Daily Packages per Van:</label>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">{dailyDropsPerVan} stops</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="250"
                  step="10"
                  value={dailyDropsPerVan}
                  onChange={(e) => setDailyDropsPerVan(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Slider 2: High-Rise % */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Urban High-Rise / Complex Multi-Unit Stops:</label>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">{highRisePercentage}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={highRisePercentage}
                  onChange={(e) => setHighRisePercentage(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Slider 3: Average Search & Waiting Time per Drop */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Average Search, Parking & Elevator Delay per Multi-Unit Drop:</label>
                  <span className="font-mono text-amber-400 font-bold tabular-nums">{avgSearchMinutes} minutes</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="18"
                  step="1"
                  value={avgSearchMinutes}
                  onChange={(e) => setAvgSearchMinutes(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* The Core Mechanics List */}
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
                <span className="font-semibold text-white block">Logistics Bottlenecks at the Curb:</span>
                <p>• <strong>Parking Search:</strong> Drivers circle crowded city blocks 2–4 times, risking $95–$150 commercial parking tickets or double-parking violations.</p>
                <p>• <strong>Security Intercom & Turnstiles:</strong> Waiting for doormen or residents who do not pick up the buzzer adds 3–6 minutes per drop.</p>
                <p>• <strong>Freight Car Disconnect:</strong> Passenger elevators frequently ban package carts, while freight elevators require key overrides.</p>
              </div>
            </div>

            {/* Calculated Impact Dashboard (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-4">
                  Annual Impact per Delivery Vehicle
                </span>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Wasted Driver Hours / Year:</span>
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    </span>
                    <div className="text-3xl font-extrabold font-mono text-cyan-400 mt-1 tabular-nums">
                      {Math.round(dailyLostHours * 260)} hrs
                    </div>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      Equivalent to {((dailyLostHours * 260) / 8).toFixed(1)} full work shifts lost wandering buildings.
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-950 border border-rose-900/40">
                    <span className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Annual Cost of Last-100m Friction:</span>
                      <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                    </span>
                    <div className="text-3xl font-extrabold font-mono text-rose-400 mt-1 tabular-nums">
                      ${Math.round(annualCostWasted).toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      Direct labor loss without counting parking citations or ruined goods.
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Idling Carbon Emissions:</span>
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                    </span>
                    <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                      {Math.round(annualCO2Kg).toLocaleString()} kg CO₂
                    </div>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      Unnecessary urban greenhouse gas emissions from curb idling.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Emergency Services */}
        {activeSector === 'emergency' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-rose-500" />
                    The Golden Window Survival Engine
                  </h3>
                  <p className="text-xs text-slate-400">
                    Model survival probability vs micro-search delays inside high-density structures.
                  </p>
                </div>
                <span className="text-xs font-mono text-rose-400 px-2 py-1 rounded bg-slate-950 border border-slate-800">
                  Critical Response
                </span>
              </div>

              {/* Slider: Curb-to-Patient Search Delay */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Indoor Search & Barrier Delay (Gate to Patient Bed):</label>
                  <span className="font-mono text-rose-400 font-bold tabular-nums">{arrivalSearchDelayMinutes} minutes</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="12.0"
                  step="0.5"
                  value={arrivalSearchDelayMinutes}
                  onChange={(e) => setArrivalSearchDelayMinutes(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              {/* Survival Curve Explanation */}
              <div className="p-4 bg-slate-950 rounded-lg border border-rose-900/30 text-xs text-slate-300 space-y-2">
                <span className="font-semibold text-white block">Why Minutes Mean Life or Death:</span>
                <p>• <strong>Cardiac Arrest:</strong> Every 60 seconds without CPR or defibrillation decreases survival probability by <strong>7% to 10%</strong>.</p>
                <p>• <strong>The "Curb Mirage":</strong> 911 dispatch records show the ambulance arrived on-scene at 4 minutes, but paramedics spent an additional 6 minutes finding the key for the rear gate and reaching Apt 804.</p>
                <p>• <strong>Vertical Logistics:</strong> Paramedics carrying 50–70 lbs of monitor-defibrillator packs cannot sprint up 12 flights of stairs when elevator access fobs fail.</p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Arterial Drive</span>
                  <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">4.2 min</span>
                  <span className="text-[10px] text-slate-500">Macro GPS</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Indoor Search</span>
                  <span className="text-sm font-bold font-mono text-rose-400 mt-1 block">{arrivalSearchDelayMinutes} min</span>
                  <span className="text-[10px] text-slate-500">Micro Void</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Total Transit</span>
                  <span className="text-sm font-bold font-mono text-white mt-1 block">{totalResponseMinutes.toFixed(1)} min</span>
                  <span className="text-[10px] text-slate-500">Bedside</span>
                </div>
              </div>
            </div>

            {/* Survival Meter (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Estimated Survival Probability
              </span>

              {/* Survival Percentage Circle / Gauge */}
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center relative overflow-hidden">
                <div className="text-5xl font-extrabold font-mono tabular-nums mb-1">
                  <span className={survivalRate > 50 ? 'text-emerald-400' : survivalRate > 25 ? 'text-amber-400' : 'text-rose-500'}>
                    {survivalRate}%
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Cardiac Arrest Survival Window
                </span>

                <div className="mt-4 w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      survivalRate > 50 ? 'bg-emerald-400' : survivalRate > 25 ? 'bg-amber-400' : 'bg-rose-500'
                    }`}
                    style={{ width: `${survivalRate}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
                <span className="font-semibold text-white block">Micro-Wayfinding Solution:</span>
                <p className="text-slate-300">
                  Pre-cleared tactical floor plans sent directly to EMS mobile data terminals with active elevator recall keys would save an average of <strong>3.4 minutes per high-rise call</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Accessibility */}
        {activeSector === 'accessibility' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Accessibility className="w-5 h-5 text-amber-400" />
                    Universal Accessibility & Mobility Audit
                  </h3>
                  <p className="text-xs text-slate-400">
                    Inject physical barriers to observe route viability for individuals with mobility or visual impairments.
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400 px-2 py-1 rounded bg-slate-950 border border-slate-800">
                  ADA / EN 301 549
                </span>
              </div>

              {/* Barrier Toggles */}
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div>
                    <span className="text-xs font-semibold text-white block">Primary Passenger Elevator Out of Service</span>
                    <span className="text-[11px] text-slate-400">Unannounced maintenance with no real-time public telemetry</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasElevatorFailure}
                    onChange={(e) => setHasElevatorFailure(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-400 focus:ring-0"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div>
                    <span className="text-xs font-semibold text-white block">Heavy Manual Exterior Doors (&gt;15 lbs resistance)</span>
                    <span className="text-[11px] text-slate-400">Lacks automated push-paddle actuator or motorized opener</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasHeavyManualDoors}
                    onChange={(e) => setHasHeavyManualDoors(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-400 focus:ring-0"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div>
                    <span className="text-xs font-semibold text-white block">Continuous Tactile Ground Surface Indicators (TGSI)</span>
                    <span className="text-[11px] text-slate-400">Tactile paving strips from curb ramp to reception hub</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasTactilePath}
                    onChange={(e) => setHasTactilePath(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-400 focus:ring-0"
                  />
                </label>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
                <span className="font-semibold text-white block">The Accessibility Blindspot in Modern GIS:</span>
                <p>• Standard mapping apps treat an entrance as a point coordinate. They do not know if that point is reached via a 4-step stoop or a 1:12 ADA ramp.</p>
                <p>• For a person in a power wheelchair, a single 2-inch curb lip or a locked elevator is as impenetrable as a brick wall.</p>
              </div>
            </div>

            {/* Accessibility Scorecard (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Accessibility Compliance Status
              </span>

              <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <div className="text-3xl font-extrabold font-mono tabular-nums mb-1">
                  {hasElevatorFailure ? (
                    <span className="text-rose-500">NON-VIABLE</span>
                  ) : hasHeavyManualDoors ? (
                    <span className="text-amber-400">PARTIAL</span>
                  ) : (
                    <span className="text-emerald-400">FULLY ACCESSIBLE</span>
                  )}
                </div>
                <span className="text-xs text-slate-400">
                  Wheelchair Independent Route Feasibility
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-300">Step-Free Ingress:</span>
                  <span className="text-emerald-400 font-mono">Verified ADA Ramp</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-300">Vertical Transit:</span>
                  <span className={hasElevatorFailure ? 'text-rose-400 font-mono' : 'text-emerald-400 font-mono'}>
                    {hasElevatorFailure ? 'Blocked (Outage)' : 'Operational'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-300">Sensory / Tactile Support:</span>
                  <span className={hasTactilePath ? 'text-emerald-400 font-mono' : 'text-slate-500 font-mono'}>
                    {hasTactilePath ? 'Active Guidance' : 'Unmapped'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
