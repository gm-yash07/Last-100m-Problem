import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <div className="text-sm font-bold text-slate-300">
              The Last 100 Metres Spatial Observatory
            </div>
            <p className="mt-1 text-xs text-slate-500 max-w-md">
              Bridging the gap between the macro grid of cities and the micro destinations where we live, heal, and work.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <span className="text-slate-400">Standards Reference:</span>
            <span>OGC IndoorGML 2.0</span>
            <span aria-hidden="true">·</span>
            <span>Apple IMDF v1.0.0</span>
            <span aria-hidden="true">·</span>
            <span>IEEE 802.11mc (Wi-Fi RTT)</span>
            <span aria-hidden="true">·</span>
            <span>ISO/IEC 19762</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-[11px]">
          <div>
            © 2026 Spatial Intelligence Research Group · Micro-Wayfinding Protocol Initiative
          </div>
          <div className="flex items-center gap-4">
            <span>Universal Step-Free Access</span>
            <span aria-hidden="true">·</span>
            <span>Sub-Metre Geocoding</span>
            <span aria-hidden="true">·</span>
            <span>Critical EMS Priority Dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
