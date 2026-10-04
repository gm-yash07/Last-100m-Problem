export type SectorType = 'logistics' | 'emergency' | 'accessibility';

export type PersonaType = 'courier' | 'paramedic' | 'wheelchair_user' | 'visitor';

export interface SpatialNode {
  id: string;
  name: string;
  floor: number;
  x: number; // 0 to 100 percentage in floorplan
  y: number; // 0 to 100 percentage in floorplan
  type: 'curb' | 'curb_ramp' | 'loading_dock' | 'main_entrance' | 'security_desk' | 'elevator_passenger' | 'elevator_freight' | 'stairs' | 'corridor' | 'unit' | 'restroom' | 'tactile_path';
  accessible: boolean;
  requiresClearance: boolean;
  clearanceNote?: string;
  beaconId?: string;
}

export interface SpatialEdge {
  from: string;
  to: string;
  distanceMetres: number;
  accessible: boolean;
  isVertical?: boolean;
  barrierRisk?: string;
}

export interface FloorDefinition {
  level: number;
  name: string;
  label: string;
  description: string;
  gpsSignalStrength: number; // 0 to 100%
  satelliteLock: boolean;
  nodes: SpatialNode[];
  edges: SpatialEdge[];
  unitsCount: number;
}

export interface SimulationStep {
  stepIndex: number;
  phase: 'macro_approach' | 'curb_arrival' | 'perimeter_access' | 'vertical_transit' | 'corridor_search' | 'final_handoff';
  title: string;
  description: string;
  timeUnassistedSeconds: number;
  timeMicroMappedSeconds: number;
  frictionFactor: string;
  sectorImpacts: {
    logistics: string;
    emergency: string;
    accessibility: string;
  };
}

export interface MicroGeocode {
  baseStreetAddress: string;
  buildingId: string;
  curbCoordinate: [number, number];
  portalId: string;
  floorLevel: number;
  unitOrZone: string;
  accessProtocol: string;
  stepFreeVerified: boolean;
  stringRepresentation: string;
}
