import { FloorDefinition, SimulationStep, MicroGeocode } from '../types/spatial';

export const BUILDING_FLOORS: FloorDefinition[] = [
  {
    level: 0,
    name: 'Ground Level & Street Interface',
    label: 'Floor 0 (Curb, Lobby & Logistics Dock)',
    description: 'The physical boundary where macro vehicular GPS ends. Interfaces curb parking, freight loading bays, ADA ramps, and secure turnstiles.',
    gpsSignalStrength: 85,
    satelliteLock: true,
    unitsCount: 6,
    nodes: [
      { id: 'g_curb_drop', name: 'Street Curb Delivery Zone', floor: 0, x: 8, y: 50, type: 'curb', accessible: true, requiresClearance: false },
      { id: 'g_curb_ramp', name: 'ADA Curb Cut & Ramp', floor: 0, x: 18, y: 35, type: 'curb_ramp', accessible: true, requiresClearance: false },
      { id: 'g_loading_bay', name: 'Sub-Level Freight Loading Bay', floor: 0, x: 12, y: 78, type: 'loading_dock', accessible: true, requiresClearance: true, clearanceNote: 'Requires dock clearance & 15-min booking badge' },
      { id: 'g_main_entry', name: 'Main Glass Atrium Entrance', floor: 0, x: 28, y: 35, type: 'main_entrance', accessible: true, requiresClearance: false },
      { id: 'g_security', name: 'Security Checkpoint & Turnstiles', floor: 0, x: 42, y: 35, type: 'security_desk', accessible: true, requiresClearance: true, clearanceNote: 'Photo ID registration & visitor badge required' },
      { id: 'g_freight_entry', name: 'Backstage Service Entrance', floor: 0, x: 26, y: 78, type: 'main_entrance', accessible: true, requiresClearance: true, clearanceNote: 'Keycard access restricted to couriers' },
      { id: 'g_freight_elevator', name: 'Freight / Heavy Elevator Bank (F-1)', floor: 0, x: 48, y: 78, type: 'elevator_freight', accessible: true, requiresClearance: true, clearanceNote: 'Call code enabled for deliveries' },
      { id: 'g_passenger_elevator', name: 'Main Passenger High-Speed Elevators', floor: 0, x: 62, y: 35, type: 'elevator_passenger', accessible: true, requiresClearance: false },
      { id: 'g_emergency_stairs', name: 'North Core Emergency Stairwell', floor: 0, x: 62, y: 15, type: 'stairs', accessible: false, requiresClearance: false },
      { id: 'g_tactile_hub', name: 'Tactile Ground Guidance Waypoint', floor: 0, x: 35, y: 35, type: 'tactile_path', accessible: true, requiresClearance: false, beaconId: 'BLE-G-001' },
      { id: 'g_mail_lockers', name: 'Central Smart Package Parcel Lockers', floor: 0, x: 78, y: 65, type: 'unit', accessible: true, requiresClearance: false },
      { id: 'g_facilities', name: 'Building Operations & Facility Office', floor: 0, x: 86, y: 25, type: 'unit', accessible: true, requiresClearance: true },
    ],
    edges: [
      { from: 'g_curb_drop', to: 'g_curb_ramp', distanceMetres: 12, accessible: true },
      { from: 'g_curb_drop', to: 'g_loading_bay', distanceMetres: 24, accessible: true },
      { from: 'g_curb_ramp', to: 'g_main_entry', distanceMetres: 16, accessible: true },
      { from: 'g_loading_bay', to: 'g_freight_entry', distanceMetres: 18, accessible: true },
      { from: 'g_main_entry', to: 'g_tactile_hub', distanceMetres: 8, accessible: true },
      { from: 'g_tactile_hub', to: 'g_security', distanceMetres: 10, accessible: true },
      { from: 'g_security', to: 'g_passenger_elevator', distanceMetres: 22, accessible: true },
      { from: 'g_freight_entry', to: 'g_freight_elevator', distanceMetres: 26, accessible: true },
      { from: 'g_security', to: 'g_emergency_stairs', distanceMetres: 20, accessible: false },
      { from: 'g_passenger_elevator', to: 'g_mail_lockers', distanceMetres: 18, accessible: true },
      { from: 'g_passenger_elevator', to: 'g_facilities', distanceMetres: 25, accessible: true },
      { from: 'g_freight_elevator', to: 'g_passenger_elevator', distanceMetres: 32, accessible: true },
    ]
  },
  {
    level: 4,
    name: 'Floor 4: Medical Center & Outpatient Ward',
    label: 'Floor 4 (Healthcare Suites & Fast-Response)',
    description: 'High-acuity medical floor with critical time-to-treatment requirements for emergency response and strict accessibility compliance.',
    gpsSignalStrength: 15,
    satelliteLock: false,
    unitsCount: 8,
    nodes: [
      { id: 'f4_pass_elev', name: 'Passenger Elevator Foyer', floor: 4, x: 22, y: 35, type: 'elevator_passenger', accessible: true, requiresClearance: false },
      { id: 'f4_freight_elev', name: 'Service / Gurney Elevator Foyer', floor: 4, x: 22, y: 70, type: 'elevator_freight', accessible: true, requiresClearance: false },
      { id: 'f4_stairs', name: 'North Core Fire Stair Exit', floor: 4, x: 22, y: 15, type: 'stairs', accessible: false, requiresClearance: false },
      { id: 'f4_corridor_w', name: 'West Clinical Arterial Corridor', floor: 4, x: 38, y: 50, type: 'corridor', accessible: true, requiresClearance: false, beaconId: 'UWB-4W-04' },
      { id: 'f4_triage', name: 'Urgent Care Triage Station', floor: 4, x: 52, y: 30, type: 'unit', accessible: true, requiresClearance: false },
      { id: 'f4_icu', name: 'Cardiac Care Intensive Suite 402B', floor: 4, x: 78, y: 22, type: 'unit', accessible: true, requiresClearance: true, clearanceNote: 'Emergency break-glass priority override' },
      { id: 'f4_corridor_e', name: 'East Corridor & Dialysis Wing', floor: 4, x: 62, y: 65, type: 'corridor', accessible: true, requiresClearance: false },
      { id: 'f4_accessible_wc', name: 'Universal Accessible Restroom', floor: 4, x: 44, y: 80, type: 'restroom', accessible: true, requiresClearance: false },
      { id: 'f4_pharmacy', name: 'Controlled Pharmaceuticals Drop', floor: 4, x: 82, y: 68, type: 'unit', accessible: true, requiresClearance: true },
    ],
    edges: [
      { from: 'f4_pass_elev', to: 'f4_corridor_w', distanceMetres: 14, accessible: true },
      { from: 'f4_freight_elev', to: 'f4_corridor_w', distanceMetres: 16, accessible: true },
      { from: 'f4_stairs', to: 'f4_corridor_w', distanceMetres: 18, accessible: false },
      { from: 'f4_corridor_w', to: 'f4_triage', distanceMetres: 12, accessible: true },
      { from: 'f4_triage', to: 'f4_icu', distanceMetres: 24, accessible: true },
      { from: 'f4_corridor_w', to: 'f4_corridor_e', distanceMetres: 20, accessible: true },
      { from: 'f4_corridor_w', to: 'f4_accessible_wc', distanceMetres: 15, accessible: true },
      { from: 'f4_corridor_e', to: 'f4_pharmacy', distanceMetres: 22, accessible: true },
      { from: 'f4_corridor_e', to: 'f4_icu', distanceMetres: 20, accessible: true },
    ]
  },
  {
    level: 14,
    name: 'Floor 14: High-Rise Residential Suites',
    label: 'Floor 14 (Penthouse & Sky Residence Suites)',
    description: 'Complex labyrinth layout typical of modern residential towers where delivery drivers lose 10+ minutes searching for unit numbers without indoor maps.',
    gpsSignalStrength: 2,
    satelliteLock: false,
    unitsCount: 12,
    nodes: [
      { id: 'f14_pass_elev', name: 'Residential Elevator Hallway', floor: 14, x: 20, y: 40, type: 'elevator_passenger', accessible: true, requiresClearance: false },
      { id: 'f14_freight_elev', name: 'Service Elevator Vestibule', floor: 14, x: 20, y: 65, type: 'elevator_freight', accessible: true, requiresClearance: false },
      { id: 'f14_stairs', name: 'Stairwell Fire Door A', floor: 14, x: 20, y: 18, type: 'stairs', accessible: false, requiresClearance: false },
      { id: 'f14_hub', name: '14th Floor Central Ring Crossway', floor: 14, x: 40, y: 50, type: 'corridor', accessible: true, requiresClearance: false, beaconId: 'BLE-14-HUB' },
      { id: 'f14_north_hall', name: 'North Residential Corridor (1401-1406)', floor: 14, x: 60, y: 25, type: 'corridor', accessible: true, requiresClearance: false },
      { id: 'f14_south_hall', name: 'South Residential Corridor (1407-1412)', floor: 14, x: 60, y: 75, type: 'corridor', accessible: true, requiresClearance: false },
      { id: 'f14_suite_1402', name: 'Suite 1402 (Private Residence)', floor: 14, x: 82, y: 20, type: 'unit', accessible: true, requiresClearance: false },
      { id: 'f14_suite_1405', name: 'Suite 1405 (Corner Loft)', floor: 14, x: 88, y: 35, type: 'unit', accessible: true, requiresClearance: false },
      { id: 'f14_suite_1408', name: 'Suite 1408 (Accessible Unit)', floor: 14, x: 84, y: 70, type: 'unit', accessible: true, requiresClearance: false },
      { id: 'f14_suite_1412', name: 'Suite 1412 (Far East Penthouse)', floor: 14, x: 88, y: 88, type: 'unit', accessible: true, requiresClearance: false },
    ],
    edges: [
      { from: 'f14_pass_elev', to: 'f14_hub', distanceMetres: 18, accessible: true },
      { from: 'f14_freight_elev', to: 'f14_hub', distanceMetres: 18, accessible: true },
      { from: 'f14_stairs', to: 'f14_hub', distanceMetres: 24, accessible: false },
      { from: 'f14_hub', to: 'f14_north_hall', distanceMetres: 22, accessible: true },
      { from: 'f14_hub', to: 'f14_south_hall', distanceMetres: 22, accessible: true },
      { from: 'f14_north_hall', to: 'f14_suite_1402', distanceMetres: 18, accessible: true },
      { from: 'f14_north_hall', to: 'f14_suite_1405', distanceMetres: 25, accessible: true },
      { from: 'f14_south_hall', to: 'f14_suite_1408', distanceMetres: 20, accessible: true },
      { from: 'f14_south_hall', to: 'f14_suite_1412', distanceMetres: 28, accessible: true },
    ]
  }
];

export const CRISIS_JOURNEY_STEPS: SimulationStep[] = [
  {
    stepIndex: 1,
    phase: 'macro_approach',
    title: 'City Grid Navigation (5 Miles)',
    description: 'Macro GPS operates with sub-5-metre road precision via unobstructed satellite line-of-sight and synchronized street traffic networks.',
    timeUnassistedSeconds: 900, // 15 mins
    timeMicroMappedSeconds: 900, // 15 mins
    frictionFactor: 'Low (0% blind spot)',
    sectorImpacts: {
      logistics: 'Predictable high-speed routing via vehicle telemetry.',
      emergency: 'Sirens & green-wave light preemption ensure fast transit.',
      accessibility: 'Accessible vehicle transit on public road grid.'
    }
  },
  {
    stepIndex: 2,
    phase: 'curb_arrival',
    title: 'The Curb Abyss (Finding Legal Access)',
    description: 'GPS declares "You have arrived at 450 Grand Avenue," dropping the pin on the street center line with zero curb-loading zone intelligence.',
    timeUnassistedSeconds: 240, // 4 mins
    timeMicroMappedSeconds: 30, // 0.5 min
    frictionFactor: 'Severe (circling block, double parking risk, tow threat)',
    sectorImpacts: {
      logistics: 'Drivers circle the block 1-3 times or risk $120 parking citations.',
      emergency: 'Ambulance blocked by delivery trucks or forced into dead-end alley.',
      accessibility: 'No indication of step-free curb cuts; wheelchair trapped behind curb.'
    }
  },
  {
    stepIndex: 3,
    phase: 'perimeter_access',
    title: 'Perimeter Barrier & Clearance Checkpoint',
    description: 'Security desks, visitor badge kiosks, callbox codes, and locked service loading doors create human protocol friction.',
    timeUnassistedSeconds: 300, // 5 mins
    timeMicroMappedSeconds: 45, // 0.75 min
    frictionFactor: 'High (ID sign-in, wrong entrance door, security rejection)',
    sectorImpacts: {
      logistics: 'Driver forced to wait in visitor queue; dock master badge inspection.',
      emergency: 'Knox-box search delays and locked magnetic fire gates.',
      accessibility: 'Heavy non-automated manual exterior doors without actuator button.'
    }
  },
  {
    stepIndex: 4,
    phase: 'vertical_transit',
    title: 'Vertical Elevation Void (The Z-Axis Chasm)',
    description: 'Traditional GPS completely lacks altitude coordinates. Drivers face locked elevators, keycard fobs, or freight elevator priority calls.',
    timeUnassistedSeconds: 210, // 3.5 mins
    timeMicroMappedSeconds: 50, // ~1 min
    frictionFactor: 'Critical (elevator wait time, fob locked, out-of-order banks)',
    sectorImpacts: {
      logistics: 'Long bank wait times; freight elevator requires building engineer call.',
      emergency: 'Paramedics wait for elevator or climb 14 flights with 65 lbs of trauma gear.',
      accessibility: 'Elevator outage forces total route abort without real-time broadcast.'
    }
  },
  {
    stepIndex: 5,
    phase: 'corridor_search',
    title: 'Interior Labyrinth & Corridor Blind Search',
    description: 'Deep inside concrete and steel, GPS signal is completely attenuated. Long branched hallways lack intuitive directional signage.',
    timeUnassistedSeconds: 150, // 2.5 mins
    timeMicroMappedSeconds: 25, // 25s
    frictionFactor: 'High (odd/even numbering breaks, confusing wing signage)',
    sectorImpacts: {
      logistics: 'Wandering corridors causes package temperature loss and route delays.',
      emergency: 'Critical "golden window" minutes lost searching for unit 1402.',
      accessibility: 'Braille signage absent or out of reach; narrow pinch points.'
    }
  }
];

export const SAMPLE_MICRO_GEOCODES: MicroGeocode[] = [
  {
    baseStreetAddress: '450 Grand Avenue, Metropolis, NY 10001',
    buildingId: 'BLD-METRO-0450',
    curbCoordinate: [40.7589, -73.9851],
    portalId: 'PORTAL-DOCK-B2',
    floorLevel: 0,
    unitOrZone: 'BAY-03-FREIGHT',
    accessProtocol: 'DIGITAL_BADGE_COURIER_API',
    stepFreeVerified: true,
    stringRepresentation: 'M450.NY+C40.7589,-73.9851+P.DOCK2+L0.BAY3+ADA1'
  },
  {
    baseStreetAddress: '450 Grand Avenue, Metropolis, NY 10001',
    buildingId: 'BLD-METRO-0450',
    curbCoordinate: [40.7587, -73.9849],
    portalId: 'PORTAL-MAIN-NORTH',
    floorLevel: 14,
    unitOrZone: 'SUITE-1402',
    accessProtocol: 'DOORBELL_PASSCODE_1402',
    stepFreeVerified: true,
    stringRepresentation: 'M450.NY+C40.7587,-73.9849+P.MAIN+L14.U1402+ADA1'
  },
  {
    baseStreetAddress: '450 Grand Avenue, Metropolis, NY 10001',
    buildingId: 'BLD-METRO-0450',
    curbCoordinate: [40.7588, -73.9850],
    portalId: 'PORTAL-EMS-RAPID',
    floorLevel: 4,
    unitOrZone: 'ICU-WARD-402B',
    accessProtocol: 'EMS_KNOX_OVERRIDE',
    stepFreeVerified: true,
    stringRepresentation: 'M450.NY+C40.7588,-73.9850+P.EMS+L4.ICU402B+ADA1'
  }
];
