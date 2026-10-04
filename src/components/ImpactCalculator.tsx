import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Flame, 
  Car, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const ImpactCalculator: React.FC = () => {
  const [fleetSize, setFleetSize] = useState<number>(65);
  const [stopsPerDay, setStopsPerDay] = useState<number>(130);
  const [minutesSavedPerStop, setMinutesSavedPerStop] = useState<number>(4.5);
  const [hourlyDriverCost, setHourlyDriverCost] = useState<number>(32);
  const [avgTicketFine, setAvgTicketFine] = useState<number>(115);
  const [monthlyTicketsPerVan, setMonthlyTicketsPerVan] = useState<number>(1.8);

  // Calculations
  const totalAnnualStops = fleetSize * stopsPerDay * 260; // 260 operating days/year
  // Assume ~40% of urban stops are high-rise/complex buildings that benefit from last-100m mapping
  const complexStops = Math.round(totalAnnualStops * 0.42);
  const annualHoursSaved = Math.round((complexStops * minutesSavedPerStop) / 60);
  const laborCostSavings = annualHoursSaved * hourlyDriverCost;
  
  // Parking ticket reductions (assume 60% reduction in curb double parking citations)
  const annualTicketsAvoided = Math.round(fleetSize * monthlyTicketsPerVan * 12 * 0.65);
  const citationSavings = annualTicketsAvoided * avgTicketFine;

  // Fuel & Emissions (0.5 gal/hr idling, 19.6 lbs CO2 / gal)
  const gallonsSaved = Math.round(annualHoursSaved * 0.45);
  const co2TonsReduced = Math.round((gallonsSaved * 8.887) / 1000);

  const totalFinancialBenefit = laborCostSavings + citationSavings;

  return (
    <section className="py-16 md:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <span>Macro-Economic Projection</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise & Municipal Impact</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Macro-Micro Economic ROI Model
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Quantify the economic, environmental, and civic returns of eliminating the Last 100 Metres spatial friction across an entire logistics fleet or municipal district.
          </p>
        </div>

        {/* 2-Zone Layout: Left Input Sliders + Right KPI Scorecards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sliders Deck (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block pb-2 border-b border-slate-800">
              Fleet & Operational Parameters
            </span>

            {/* Slider 1: Fleet Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Urban Delivery Fleet Size (Active Vans):</label>
                <span className="font-mono text-cyan-400 font-bold tabular-nums">{fleetSize} vehicles</span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 2: Stops per day */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Daily Stops per Vehicle:</label>
                <span className="font-mono text-cyan-400 font-bold tabular-nums">{stopsPerDay} stops</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={stopsPerDay}
                onChange={(e) => setStopsPerDay(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 3: Minutes Saved per Stop */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Reclaimed Minutes per High-Rise Stop (Micro-Routing):</label>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">{minutesSavedPerStop} minutes</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.5"
                value={minutesSavedPerStop}
                onChange={(e) => setMinutesSavedPerStop(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Slider 4: Hourly Wage */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Fully-Loaded Driver Cost per Hour:</label>
                <span className="font-mono text-white font-bold tabular-nums">${hourlyDriverCost}/hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="55"
                step="1"
                value={hourlyDriverCost}
                onChange={(e) => setHourlyDriverCost(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Micro Benchmark Context */}
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <span className="font-semibold text-white block">Underlying Assumptions:</span>
              <p>• 42% of urban parcel volume terminates in multi-story or gated commercial/residential complexes.</p>
              <p>• Digital loading dock reservations reduce double parking citations by 65%.</p>
            </div>
          </div>

          {/* Results Scoreboard (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-5">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Annual Fleet Financial Value
            </span>

            {/* Primary KPI Callout */}
            <div className="p-6 rounded-xl bg-slate-900 border border-cyan-800/60">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Total Annual Value Unlocked
              </span>
              <div className="text-4xl font-extrabold font-mono text-white mt-1 tabular-nums">
                ${Math.round(totalFinancialBenefit).toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Labor productivity + citation mitigation across {fleetSize} delivery units.
              </p>
            </div>

            {/* Secondary Metrics */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Driver Hours Reclaimed:
                </span>
                <span className="font-mono text-white font-bold tabular-nums">
                  {annualHoursSaved.toLocaleString()} hrs/yr
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                  Parking Fines Prevented:
                </span>
                <span className="font-mono text-rose-400 font-bold tabular-nums">
                  ${citationSavings.toLocaleString()} ({annualTicketsAvoided} tickets)
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Carbon Emissions Averted:
                </span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">
                  {co2TonsReduced.toLocaleString()} metric tons CO₂
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
