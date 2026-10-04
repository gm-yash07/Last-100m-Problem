import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, CheckCircle2, AlertOctagon, Timer, Gauge, ShieldCheck, Flame } from 'lucide-react';
import { CRISIS_JOURNEY_STEPS } from '../data/buildingModel';

export const MacroVsMicroComparison: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSectorView, setActiveSectorView] = useState<'logistics' | 'emergency' | 'accessibility'>('logistics');

  const currentStep = CRISIS_JOURNEY_STEPS[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= CRISIS_JOURNEY_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Total cumulative times up to current step
  const unassistedElapsed = CRISIS_JOURNEY_STEPS.slice(0, currentStepIndex + 1).reduce(
    (acc, step) => acc + step.timeUnassistedSeconds,
    0
  );

  const microMappedElapsed = CRISIS_JOURNEY_STEPS.slice(0, currentStepIndex + 1).reduce(
    (acc, step) => acc + step.timeMicroMappedSeconds,
    0
  );

  const timeSavedSeconds = unassistedElapsed - microMappedElapsed;

  const formatMinutesSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-16 md:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <span>Interactive Experiment</span>
              <span aria-hidden="true">·</span>
              <span>Stage-by-Stage Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              The Journey Breakdown: Standard GPS vs Micro-Mapping
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Follow a high-rise delivery and response mission in real time. Observe where traditional spatial models abandon the operator and how micro-wayfinding bridges the gap.
            </p>
          </div>

          {/* Interactive Playback Controls */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1.5 self-start md:self-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 text-xs font-semibold rounded-md bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center gap-1.5 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Simulate'}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
              className="p-1.5 text-xs text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
              title="Reset simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stage Timeline Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {CRISIS_JOURNEY_STEPS.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;
            return (
              <button
                key={step.stepIndex}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400 text-white shadow-sm'
                    : isCompleted
                    ? 'bg-slate-900/50 border-slate-700/60 text-slate-300 hover:border-slate-600'
                    : 'bg-slate-950 border-slate-800/80 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span>0{step.stepIndex}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                  {isCompleted && <span className="text-emerald-400 font-bold">✓</span>}
                </div>
                <div className="text-xs font-semibold truncate text-slate-200">
                  {step.title.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dual Lane Simulator Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Comparison Cards (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step Detail Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Phase 0{currentStep.stepIndex} of 05
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{currentStep.title}</h3>
                </div>
                <div className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-amber-400">
                  Friction: {currentStep.frictionFactor}
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                {currentStep.description}
              </p>

              {/* Side-by-Side Dual Lane Comparison for this Step */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {/* Lane A: Blind 2D GPS */}
                <div className="p-4 rounded-lg bg-slate-950/80 border border-rose-900/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      Standard 2D GPS System
                    </span>
                    <span className="text-xs font-mono text-slate-400">Step Duration</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                    {formatMinutesSeconds(currentStep.timeUnassistedSeconds)}
                  </div>
                  <div className="mt-3 text-xs text-slate-400 space-y-1.5 border-t border-slate-800/80 pt-2.5">
                    <p>• Satellite signal drops off building facade</p>
                    <p>• Address pins at middle of vehicular roadway</p>
                    <p>• Operator forced to guess entryway and parking</p>
                  </div>
                </div>

                {/* Lane B: Micro-Mapped */}
                <div className="p-4 rounded-lg bg-slate-950/80 border border-emerald-900/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Micro-Spatial Wayfinding
                    </span>
                    <span className="text-xs font-mono text-slate-400">Step Duration</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                    {formatMinutesSeconds(currentStep.timeMicroMappedSeconds)}
                  </div>
                  <div className="mt-3 text-xs text-slate-400 space-y-1.5 border-t border-slate-800/80 pt-2.5">
                    <p>• Designated loading bay geofence reservation</p>
                    <p>• Digital access credential pushed to device</p>
                    <p>• Turn-by-turn indoor corridor breadcrumb trail</p>
                  </div>
                </div>
              </div>

              {/* Sector Specific Perspective Switcher */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Sector Perspective Analysis
                  </span>
                  <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setActiveSectorView('logistics')}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                        activeSectorView === 'logistics'
                          ? 'bg-slate-800 text-cyan-400 font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Logistics
                    </button>
                    <button
                      onClick={() => setActiveSectorView('emergency')}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                        activeSectorView === 'emergency'
                          ? 'bg-slate-800 text-rose-400 font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      EMS / Fire
                    </button>
                    <button
                      onClick={() => setActiveSectorView('accessibility')}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                        activeSectorView === 'accessibility'
                          ? 'bg-slate-800 text-amber-400 font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Accessibility
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {currentStep.sectorImpacts[activeSectorView]}
                </div>
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                ← Previous Phase
              </button>
              <div className="text-xs font-mono text-slate-500">
                Phase {currentStepIndex + 1} of {CRISIS_JOURNEY_STEPS.length}
              </div>
              <button
                disabled={currentStepIndex === CRISIS_JOURNEY_STEPS.length - 1}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex((prev) => Math.min(CRISIS_JOURNEY_STEPS.length - 1, prev + 1));
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                Next Phase →
              </button>
            </div>
          </div>

          {/* Cumulative Telemetry Dashboard (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                Cumulative Live Telemetry
              </span>

              {/* Unassisted Total */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 mb-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Standard 2D Approach:</span>
                  <span className="text-rose-400 font-mono">Unassisted</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-rose-400 mt-1 tabular-nums">
                  {formatMinutesSeconds(unassistedElapsed)}
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Elapsed mission time so far with street-centroid navigation.
                </div>
              </div>

              {/* Micro Mapped Total */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 mb-4">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Micro-Spatial Approach:</span>
                  <span className="text-emerald-400 font-mono">Optimized</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1 tabular-nums">
                  {formatMinutesSeconds(microMappedElapsed)}
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Elapsed time with indoor sub-metre wayfinding and curb booking.
                </div>
              </div>

              {/* Net Time Saved Callout */}
              <div className="p-4 rounded-lg bg-cyan-950/30 border border-cyan-800/50">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Net Time Reclaimed
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                  {formatMinutesSeconds(timeSavedSeconds)}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {unassistedElapsed > 0 ? (
                    <span>
                      <strong className="text-cyan-300">
                        {Math.round((timeSavedSeconds / unassistedElapsed) * 100)}%
                      </strong>{' '}
                      reduction in friction delay.
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Critical Secondary Indicators */}
              <div className="mt-5 space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    Idling Fuel Burned:
                  </span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {(unassistedElapsed * 0.00035).toFixed(2)} gal
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
                    Parking Violation Risk:
                  </span>
                  <span className="font-mono text-rose-400 tabular-nums">
                    {currentStepIndex >= 1 ? 'High (84%)' : 'None (0%)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    Operator Cognitive Load:
                  </span>
                  <span className="font-mono text-amber-400 tabular-nums">
                    {currentStepIndex >= 2 ? 'Severe (4.6/5.0)' : 'Nominal (1.2/5.0)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
