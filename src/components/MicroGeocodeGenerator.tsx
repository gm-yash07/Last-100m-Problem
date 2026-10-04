import React, { useState } from 'react';
import { 
  SAMPLE_MICRO_GEOCODES 
} from '../data/buildingModel';
import { MicroGeocode } from '../types/spatial';
import { 
  Code, 
  Copy, 
  Check, 
  MapPin, 
  Layers, 
  Key, 
  Accessibility, 
  Download, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

export const MicroGeocodeGenerator: React.FC = () => {
  const [streetAddress, setStreetAddress] = useState<string>('450 Grand Avenue, Metropolis, NY');
  const [portalType, setPortalType] = useState<string>('PORTAL-DOCK-B2');
  const [curbLat, setCurbLat] = useState<number>(40.7589);
  const [curbLng, setCurbLng] = useState<number>(-73.9851);
  const [floorLevel, setFloorLevel] = useState<number>(14);
  const [unitZone, setUnitZone] = useState<string>('SUITE-1402');
  const [securityTier, setSecurityTier] = useState<string>('RESIDENT_PASSCODE');
  const [isStepFree, setIsStepFree] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [outputFormat, setOutputFormat] = useState<'string' | 'jsonld' | 'geojson'>('string');

  // Compute standard Micro-Geocode String representation
  const microCodeString = `M450.NY+C${curbLat.toFixed(4)},${curbLng.toFixed(4)}+P.${portalType.replace('PORTAL-', '')}+L${floorLevel}.U${unitZone.replace('SUITE-', '')}+ADA${isStepFree ? '1' : '0'}`;

  // JSON-LD structured representation
  const jsonLdPayload = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    'name': `${streetAddress} - ${unitZone}`,
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': curbLat,
      'longitude': curbLng,
      'elevation': `${floorLevel * 3.5}m`,
      'floorLevel': floorLevel
    },
    'containedInPlace': {
      '@type': 'Building',
      'name': 'Metropolis Plaza'
    },
    'microLocation': {
      'portalId': portalType,
      'unit': unitZone,
      'stepFreeAccessible': isStepFree,
      'accessProtocol': securityTier,
      'indoorBeaconProtocol': 'UWB_BLE_HYBRID'
    }
  };

  // GeoJSON Feature
  const geoJsonPayload = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [curbLng, curbLat, floorLevel * 3.5]
    },
    properties: {
      address: streetAddress,
      portal: portalType,
      floor: floorLevel,
      unit: unitZone,
      stepFree: isStepFree,
      protocol: securityTier,
      microGeocode: microCodeString
    }
  };

  const handleCopy = () => {
    let textToCopy = microCodeString;
    if (outputFormat === 'jsonld') textToCopy = JSON.stringify(jsonLdPayload, null, 2);
    if (outputFormat === 'geojson') textToCopy = JSON.stringify(geoJsonPayload, null, 2);

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadPreset = (preset: MicroGeocode) => {
    setStreetAddress(preset.baseStreetAddress);
    setPortalType(preset.portalId);
    setCurbLat(preset.curbCoordinate[0]);
    setCurbLng(preset.curbCoordinate[1]);
    setFloorLevel(preset.floorLevel);
    setUnitZone(preset.unitOrZone);
    setSecurityTier(preset.accessProtocol);
    setIsStepFree(preset.stepFreeVerified);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <span>Open Spatial Standard</span>
            <span aria-hidden="true">·</span>
            <span>Micro-Geocoding Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Micro-Drop Protocol Generator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Convert standard 2D curb coordinates into complete 8-factor micro-spatial tokens containing elevation, door portals, accessibility clearance, and digital access keys.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2">
            Load Preset:
          </span>
          <button
            onClick={() => loadPreset(SAMPLE_MICRO_GEOCODES[0])}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-all"
          >
            📦 Courier Freight Bay
          </button>
          <button
            onClick={() => loadPreset(SAMPLE_MICRO_GEOCODES[1])}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-all"
          >
            🏢 Suite 1402 High-Rise
          </button>
          <button
            onClick={() => loadPreset(SAMPLE_MICRO_GEOCODES[2])}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-all"
          >
            🚑 Urgent ICU Ward 402B
          </button>
        </div>

        {/* Generator Form & Output Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Micro-Spatial Descriptors
            </span>

            {/* Base Street Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Base Street Address (Macro Grid):</label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-400 font-mono"
              />
            </div>

            {/* Portal Type & Floor Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Ingress Portal / Entryway:</label>
                <select
                  value={portalType}
                  onChange={(e) => setPortalType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-400 font-mono"
                >
                  <option value="PORTAL-MAIN-NORTH">Main North Glass Atrium</option>
                  <option value="PORTAL-DOCK-B2">Service Freight Dock B2</option>
                  <option value="PORTAL-ADA-RAMP">West Accessible ADA Ramp</option>
                  <option value="PORTAL-EMS-RAPID">Ambulance Rapid Staging Bay</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Floor Level (Z-Coordinate):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="-2"
                    max="80"
                    value={floorLevel}
                    onChange={(e) => setFloorLevel(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-400 font-mono"
                  />
                  <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
                    ~{(floorLevel * 3.5).toFixed(1)}m alt
                  </span>
                </div>
              </div>
            </div>

            {/* Unit / Zone & Security Protocol */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Unit Number / Zone ID:</label>
                <input
                  type="text"
                  value={unitZone}
                  onChange={(e) => setUnitZone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-400 font-mono"
                  placeholder="e.g. SUITE-1402, ICU-402B"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Security Access Protocol:</label>
                <select
                  value={securityTier}
                  onChange={(e) => setSecurityTier(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-400 font-mono"
                >
                  <option value="PUBLIC_UNRESTRICTED">Public Unrestricted</option>
                  <option value="RESIDENT_PASSCODE">Resident Doorbell / Passcode</option>
                  <option value="DIGITAL_BADGE_COURIER_API">Automated Courier API Token</option>
                  <option value="EMS_KNOX_OVERRIDE">Emergency Break-Glass Override</option>
                </select>
              </div>
            </div>

            {/* Curb Precise Coordinates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Curb Latitude:</label>
                <input
                  type="number"
                  step="0.0001"
                  value={curbLat}
                  onChange={(e) => setCurbLat(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-400 font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Curb Longitude:</label>
                <input
                  type="number"
                  step="0.0001"
                  value={curbLng}
                  onChange={(e) => setCurbLng(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            {/* Accessibility Checkbox */}
            <label className="flex items-center gap-2 pt-2 cursor-pointer text-xs text-slate-300 select-none">
              <input
                type="checkbox"
                checked={isStepFree}
                onChange={(e) => setIsStepFree(e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-cyan-400 focus:ring-0"
              />
              <span className="font-semibold text-white">Step-Free Certified Route</span>
              <span className="text-slate-400">(Zero steps from curb to door threshold)</span>
            </label>
          </div>

          {/* Generated Output Card (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Generated Payload
              </span>
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  onClick={() => setOutputFormat('string')}
                  className={`px-2 py-0.5 text-xs font-mono rounded ${outputFormat === 'string' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500'}`}
                >
                  String
                </button>
                <button
                  onClick={() => setOutputFormat('jsonld')}
                  className={`px-2 py-0.5 text-xs font-mono rounded ${outputFormat === 'jsonld' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500'}`}
                >
                  JSON-LD
                </button>
                <button
                  onClick={() => setOutputFormat('geojson')}
                  className={`px-2 py-0.5 text-xs font-mono rounded ${outputFormat === 'geojson' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500'}`}
                >
                  GeoJSON
                </button>
              </div>
            </div>

            {/* Rendered Output Area */}
            {outputFormat === 'string' && (
              <div className="space-y-3">
                <div className="p-4 bg-slate-950 rounded-lg border border-cyan-800/60 font-mono text-sm text-cyan-300 break-all select-all">
                  {microCodeString}
                </div>
                <div className="text-[11px] text-slate-400 space-y-1 font-mono">
                  <p>• <strong>M450.NY:</strong> Municipal Building ID</p>
                  <p>• <strong>C{curbLat.toFixed(4)},{curbLng.toFixed(4)}:</strong> Precise Curb Drop Point</p>
                  <p>• <strong>P.{portalType.replace('PORTAL-', '')}:</strong> Ingress Doorway</p>
                  <p>• <strong>L{floorLevel}.U{unitZone.replace('SUITE-', '')}:</strong> Level & Unit</p>
                  <p>• <strong>ADA{isStepFree ? '1' : '0'}:</strong> Step-Free Ingress Indicator</p>
                </div>
              </div>
            )}

            {outputFormat === 'jsonld' && (
              <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-72">
                {JSON.stringify(jsonLdPayload, null, 2)}
              </pre>
            )}

            {outputFormat === 'geojson' && (
              <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-72">
                {JSON.stringify(geoJsonPayload, null, 2)}
              </pre>
            )}

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="w-full py-2.5 text-xs font-semibold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Micro-Geocode Payload'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
