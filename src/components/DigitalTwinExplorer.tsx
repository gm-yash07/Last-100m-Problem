import React, { useState, useMemo } from 'react';
import { 
  BUILDING_FLOORS 
} from '../data/buildingModel';
import { FloorDefinition, SpatialNode, PersonaType } from '../types/spatial';
import { 
  Building2, 
  Layers, 
  Radio, 
  Shield, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  Accessibility, 
  Truck, 
  HeartPulse, 
  UserCheck, 
  Eye, 
  Info 
} from 'lucide-react';

export const DigitalTwinExplorer: React.FC = () => {
  const [selectedFloorLevel, setSelectedFloorLevel] = useState<number>(0);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('courier');
  const [selectedTargetNodeId, setSelectedTargetNodeId] = useState<string>('g_mail_lockers');
  const [showGpsHeatmap, setShowGpsHeatmap] = useState<boolean>(true);
  const [showBeacons, setShowBeacons] = useState<boolean>(true);
  const [simulateElevatorOutage, setSimulateElevatorOutage] = useState<boolean>(false);

  // Active floor
  const currentFloor = useMemo(() => {
    return BUILDING_FLOORS.find(f => f.level === selectedFloorLevel) || BUILDING_FLOORS[0];
  }, [selectedFloorLevel]);

  // If floor changes, pick a relevant default target if current target isn't on this floor
  const activeTargetNode = useMemo(() => {
    const onFloor = currentFloor.nodes.find(n => n.id === selectedTargetNodeId);
    if (onFloor) return onFloor;
    const firstUnit = currentFloor.nodes.find(n => n.type === 'unit') || currentFloor.nodes[currentFloor.nodes.length - 1];
    return firstUnit;
  }, [currentFloor, selectedTargetNodeId]);

  // Compute a simple route on the current floor from an entry node to the target
  const startNode = useMemo(() => {
    if (selectedFloorLevel === 0) {
      if (selectedPersona === 'courier') {
        return currentFloor.nodes.find(n => n.id === 'g_curb_drop') || currentFloor.nodes[0];
      }
      if (selectedPersona === 'wheelchair_user') {
        return currentFloor.nodes.find(n => n.id === 'g_curb_ramp') || currentFloor.nodes[0];
      }
      return currentFloor.nodes.find(n => n.id === 'g_main_entry') || currentFloor.nodes[0];
    } else {
      // Upper floors start from elevator or stairs
      if (selectedPersona === 'courier') {
        return currentFloor.nodes.find(n => n.type === 'elevator_freight') || currentFloor.nodes[0];
      }
      if (selectedPersona === 'wheelchair_user') {
        return currentFloor.nodes.find(n => n.type === 'elevator_passenger') || currentFloor.nodes[0];
      }
      return currentFloor.nodes.find(n => n.type === 'elevator_passenger') || currentFloor.nodes[0];
    }
  }, [currentFloor, selectedPersona, selectedFloorLevel]);

  // Calculate simple node path using connected graph
  const computedPathNodes = useMemo(() => {
    if (!startNode || !activeTargetNode) return [];
    if (startNode.id === activeTargetNode.id) return [startNode];

    // BFS search through floor edges
    const queue: { id: string; path: string[] }[] = [{ id: startNode.id, path: [startNode.id] }];
    const visited = new Set<string>([startNode.id]);

    while (queue.length > 0) {
      const { id, path } = queue.shift()!;
      if (id === activeTargetNode.id) {
        return path.map(nodeId => currentFloor.nodes.find(n => n.id === nodeId)!);
      }

      // Check adjacent
      const connectedEdges = currentFloor.edges.filter(e => e.from === id || e.to === id);
      for (const edge of connectedEdges) {
        const neighborId = edge.from === id ? edge.to : edge.from;
        
        // Filter out inaccessible paths if wheelchair
        if (selectedPersona === 'wheelchair_user' && !edge.accessible) continue;

        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push({ id: neighborId, path: [...path, neighborId] });
        }
      }
    }

    // Direct fallback if disconnected
    return [startNode, activeTargetNode];
  }, [startNode, activeTargetNode, currentFloor, selectedPersona]);

  // Total route distance in metres
  const routeDistanceMetres = useMemo(() => {
    let dist = 0;
    for (let i = 0; i < computedPathNodes.length - 1; i++) {
      const a = computedPathNodes[i];
      const b = computedPathNodes[i + 1];
      const edge = currentFloor.edges.find(
        e => (e.from === a.id && e.to === b.id) || (e.from === b.id && e.to === a.id)
      );
      dist += edge ? edge.distanceMetres : 15;
    }
    return dist;
  }, [computedPathNodes, currentFloor]);

  return (
    <section className="py-16 md:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <span>Architectural Digital Twin</span>
              <span aria-hidden="true">·</span>
              <span>Sub-Metre Micro Routing</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Indoor Labyrinth Simulator
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Inspect how standard GPS satellite beams decay inside building envelopes, and trace micro-wayfinding trajectories across complex multi-floor facilities.
            </p>
          </div>

          {/* Persona Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setSelectedPersona('courier')}
              className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-colors ${
                selectedPersona === 'courier'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Courier</span>
            </button>
            <button
              onClick={() => setSelectedPersona('paramedic')}
              className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-colors ${
                selectedPersona === 'paramedic'
                  ? 'bg-rose-500 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>EMS</span>
            </button>
            <button
              onClick={() => setSelectedPersona('wheelchair_user')}
              className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-colors ${
                selectedPersona === 'wheelchair_user'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Accessibility className="w-3.5 h-3.5" />
              <span>Accessible</span>
            </button>
          </div>
        </div>

        {/* Floor Selection Bar & Layer Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800 mb-6">
          {/* Floor Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
              Select Level:
            </span>
            {BUILDING_FLOORS.map(floor => (
              <button
                key={floor.level}
                onClick={() => {
                  setSelectedFloorLevel(floor.level);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedFloorLevel === floor.level
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/50 shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                Level {floor.level}
              </button>
            ))}
          </div>

          {/* Visual Layer Toggles */}
          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
              <input
                type="checkbox"
                checked={showGpsHeatmap}
                onChange={(e) => setShowGpsHeatmap(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-cyan-400 focus:ring-0"
              />
              <span className="flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                GPS Attenuation
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
              <input
                type="checkbox"
                checked={showBeacons}
                onChange={(e) => setShowBeacons(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-cyan-400 focus:ring-0"
              />
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                UWB / BLE Anchors
              </span>
            </label>
          </div>
        </div>

        {/* 2-Zone Sandbox: Left Interactive Floorplan Blueprint + Right Control Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Blueprint SVG Canvas (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden shadow-2xl">
            {/* Top Bar on Blueprint */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  {currentFloor.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{currentFloor.description}</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono">
                  {currentFloor.satelliteLock ? (
                    <span className="text-emerald-400">● Satellites Visible (Curb)</span>
                  ) : (
                    <span className="text-rose-400">▲ GPS Attenuation: {100 - currentFloor.gpsSignalStrength}%</span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  Signal Strength: {currentFloor.gpsSignalStrength}%
                </span>
              </div>
            </div>

            {/* SVG Floorplan Stage */}
            <div className="relative w-full aspect-[16/10] bg-slate-900/90 rounded-lg border border-slate-800 overflow-hidden">
              {/* Background GPS Attenuation Heatmap Gradient */}
              {showGpsHeatmap && (
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: currentFloor.level === 0
                      ? 'linear-gradient(to right, rgba(16, 185, 129, 0.15) 0%, rgba(244, 63, 94, 0.25) 50%, rgba(244, 63, 94, 0.4) 100%)'
                      : 'radial-gradient(circle at 20% 50%, rgba(244, 63, 94, 0.2) 0%, rgba(225, 29, 72, 0.45) 70%, rgba(15, 23, 42, 0.8) 100%)'
                  }}
                />
              )}

              {/* Blueprint Grid Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-800/40">
                <defs>
                  <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
              </svg>

              {/* Architectural Layout Walls & Corridors */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Structural boundary walls */}
                <rect x="5" y="5" width="90" height="90" fill="none" stroke="#334155" strokeWidth="1.2" rx="2" />
                
                {/* Floor Specific Corridor Partition lines */}
                {selectedFloorLevel === 0 && (
                  <>
                    {/* Atrium & Entrance divider */}
                    <line x1="30" y1="5" x2="30" y2="95" stroke="#1e293b" strokeWidth="1" strokeDasharray="2,2" />
                    {/* Security line */}
                    <line x1="45" y1="5" x2="45" y2="60" stroke="#475569" strokeWidth="1" />
                    {/* Loading bay boundary */}
                    <rect x="5" y="60" width="40" height="35" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" strokeWidth="0.8" />
                  </>
                )}

                {selectedFloorLevel === 4 && (
                  <>
                    {/* Medical corridor spine */}
                    <line x1="30" y1="5" x2="30" y2="95" stroke="#334155" strokeWidth="1.2" />
                    <line x1="30" y1="50" x2="95" y2="50" stroke="#334155" strokeWidth="1.2" />
                    {/* Clinic room dividers */}
                    <rect x="68" y="10" width="25" height="35" fill="rgba(30, 41, 59, 0.4)" stroke="#334155" strokeWidth="0.8" />
                    <rect x="68" y="55" width="25" height="35" fill="rgba(30, 41, 59, 0.4)" stroke="#334155" strokeWidth="0.8" />
                  </>
                )}

                {selectedFloorLevel === 14 && (
                  <>
                    {/* Residential corridor loop */}
                    <rect x="35" y="20" width="55" height="60" fill="none" stroke="#334155" strokeWidth="1" />
                    {/* Suites partitions */}
                    <line x1="65" y1="5" x2="65" y2="20" stroke="#1e293b" strokeWidth="0.8" />
                    <line x1="65" y1="80" x2="65" y2="95" stroke="#1e293b" strokeWidth="0.8" />
                    <rect x="75" y="10" width="18" height="20" fill="rgba(15, 23, 42, 0.6)" stroke="#475569" strokeWidth="0.6" />
                    <rect x="75" y="65" width="18" height="25" fill="rgba(15, 23, 42, 0.6)" stroke="#475569" strokeWidth="0.6" />
                  </>
                )}

                {/* Graph Edges / Pathways */}
                {currentFloor.edges.map((edge, i) => {
                  const fromNode = currentFloor.nodes.find(n => n.id === edge.from);
                  const toNode = currentFloor.nodes.find(n => n.id === edge.to);
                  if (!fromNode || !toNode) return null;

                  return (
                    <line
                      key={`edge-${i}`}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={edge.accessible ? '#334155' : '#451a1a'}
                      strokeWidth="0.6"
                      strokeDasharray={edge.accessible ? 'none' : '1.5,1.5'}
                    />
                  );
                })}

                {/* Computed Active Path Glow */}
                {computedPathNodes.length > 1 && (
                  <polyline
                    points={computedPathNodes.map(n => `${n.x},${n.y}`).join(' ')}
                    fill="none"
                    stroke={
                      selectedPersona === 'courier'
                        ? '#06b6d4'
                        : selectedPersona === 'paramedic'
                        ? '#f43f5e'
                        : '#fbbf24'
                    }
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                )}

                {/* Beacons layer */}
                {showBeacons && currentFloor.nodes.filter(n => n.beaconId).map(node => (
                  <circle
                    key={`beacon-${node.id}`}
                    cx={node.x}
                    cy={node.y}
                    r="4"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="0.5"
                    strokeDasharray="1,1"
                    className="animate-pulse"
                  />
                ))}
              </svg>

              {/* Interactive Nodes Placed Over SVG */}
              {currentFloor.nodes.map((node) => {
                const isTarget = node.id === activeTargetNode?.id;
                const isStart = node.id === startNode?.id;
                const isInPath = computedPathNodes.some(n => n.id === node.id);

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedTargetNodeId(node.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 transition-all focus:outline-hidden ${
                      isTarget
                        ? 'scale-125 z-30'
                        : isInPath
                        ? 'scale-110 z-25'
                        : 'scale-90 hover:scale-105'
                    }`}
                    title={`${node.name} (${node.type})`}
                  >
                    {/* Node Dot / Marker */}
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                        isTarget
                          ? 'bg-cyan-400 border-white shadow-lg ring-4 ring-cyan-400/30'
                          : isStart
                          ? 'bg-emerald-400 border-white ring-2 ring-emerald-400/30'
                          : isInPath
                          ? 'bg-slate-200 border-cyan-400'
                          : node.type === 'stairs'
                          ? 'bg-rose-950 border-rose-500'
                          : node.type.includes('elevator')
                          ? 'bg-purple-900 border-purple-400'
                          : node.type === 'security_desk'
                          ? 'bg-amber-900 border-amber-400'
                          : 'bg-slate-800 border-slate-600'
                      }`}
                    >
                      {isTarget && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>

                    {/* Node Hover/Target Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-40 whitespace-nowrap bg-slate-950 text-white text-[10px] font-mono px-2 py-1 rounded border border-slate-700 shadow-md">
                      {node.name}
                      {node.requiresClearance && (
                        <span className="text-amber-400 block text-[9px]">⚠️ Requires Badge</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Target Destination
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Micro-Entry Portal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  Elevator Bank
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  Fire Stairs (Non-ADA)
                </span>
              </div>
              <div className="font-mono text-cyan-400">
                Click any waypoint to re-route
              </div>
            </div>
          </div>

          {/* Right Control & Micro-Route Deck (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Target Destination Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-2">
                Active Wayfinding Destination
              </span>
              <h4 className="text-lg font-bold text-white">
                {activeTargetNode ? activeTargetNode.name : 'Select a destination'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Level {selectedFloorLevel} · Zone {activeTargetNode?.id}
              </p>

              {activeTargetNode?.requiresClearance && (
                <div className="mt-3 p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-lg text-xs text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <span className="font-bold">Access Protocol Required:</span>
                    <p className="text-[11px] text-amber-200/80 mt-0.5">
                      {activeTargetNode.clearanceNote || 'Requires electronic security credential'}
                    </p>
                  </div>
                </div>
              )}

              {/* Waypoint Select Dropdown */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <label className="text-xs text-slate-400 block mb-1.5">
                  Switch Target Destination:
                </label>
                <select
                  value={activeTargetNode?.id}
                  onChange={(e) => setSelectedTargetNodeId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-400 font-mono"
                >
                  {currentFloor.nodes.map(n => (
                    <option key={n.id} value={n.id}>
                      {n.name} ({n.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Computed Turn-by-Turn Route Metrics */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                Micro-Route Metrics
              </span>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Total Distance</span>
                  <span className="text-lg font-bold font-mono text-white tabular-nums">
                    {routeDistanceMetres} m
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Estimated Transit</span>
                  <span className="text-lg font-bold font-mono text-cyan-400 tabular-nums">
                    {Math.round((routeDistanceMetres / 1.1) + (activeTargetNode?.requiresClearance ? 45 : 10))}s
                  </span>
                </div>
              </div>

              {/* Step-by-Step Breadcrumb Path */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {computedPathNodes.map((node, idx) => (
                  <div key={node.id} className="flex items-start gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10px] text-cyan-400 shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <span className="font-medium text-slate-200 block">{node.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {node.type.replace('_', ' ')} · {node.accessible ? 'Step-Free' : 'Stairs Only'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Persona Guidance Note */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1.5 text-slate-300">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-cyan-400" />
                Adaptive Persona Routing Active
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {selectedPersona === 'courier' && 'Optimized for heavy cart transit: Routing through freight elevator and service loading bay.'}
                {selectedPersona === 'paramedic' && 'Optimized for high-speed trauma response: Overriding access locks with priority elevator recall.'}
                {selectedPersona === 'wheelchair_user' && 'Strictly step-free: Filtered out fire stairs and high curbs; prioritizing tactile paths and ADA ramps.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
