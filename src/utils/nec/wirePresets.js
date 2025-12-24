// Common electrical circuit wire presets
export const wirePresets = {
  singlePhase120V: {
    name: '120V Single Phase (2-wire + ground)',
    wires: [
      { type: 'THWN_2', size: '12', quantity: 2, role: 'phase' },
      { type: 'THWN_2', size: '12', quantity: 1, role: 'ground' }
    ]
  },
  singlePhase120VNeutral: {
    name: '120V Single Phase (hot + neutral + ground)',
    wires: [
      { type: 'THWN_2', size: '12', quantity: 1, role: 'phase' },
      { type: 'THWN_2', size: '12', quantity: 1, role: 'neutral' },
      { type: 'THWN_2', size: '12', quantity: 1, role: 'ground' }
    ]
  },
  threePhase208Y120V: {
    name: '208Y/120V Three Phase',
    wires: [
      { type: 'THWN_2', size: '12', quantity: 3, role: 'phase' },
      { type: 'THWN_2', size: '12', quantity: 1, role: 'neutral' },
      { type: 'THWN_2', size: '12', quantity: 1, role: 'ground' }
    ]
  },
  threePhase480V: {
    name: '480V Three Phase (3-wire + ground)',
    wires: [
      { type: 'THWN_2', size: '10', quantity: 3, role: 'phase' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'ground' }
    ]
  },
  highTempMotor: {
    name: 'High Temp Motor Circuit',
    wires: [
      { type: 'FEP', size: '10', quantity: 3, role: 'phase' },
      { type: 'FEP', size: '12', quantity: 1, role: 'ground' }
    ]
  },
  controlCircuit: {
    name: 'Control Circuit (18AWG)',
    wires: [
      { type: 'TFN', size: '18', quantity: 4, role: 'control' },
      { type: 'TFN', size: '18', quantity: 1, role: 'ground' }
    ]
  },
  singlePhase240V: {
    name: '240V Single Phase (2-pole + ground)',
    wires: [
      { type: 'THWN_2', size: '10', quantity: 2, role: 'phase' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'ground' }
    ]
  },
  
  singlePhase240VNeutral: {
    name: '120/240V Single Phase (hot/hot/neutral + ground)',
    wires: [
      { type: 'THWN_2', size: '10', quantity: 2, role: 'phase' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'neutral' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'ground' }
    ]
  },
  
  multiWireBranchCircuit: {
    name: 'Multi-Wire Branch Circuit (2-hot + shared neutral + ground)',
    wires: [
      { type: 'THWN_2', size: '12', quantity: 2, role: 'phase' },
      { type: 'THWN_2', size: '12', quantity: 1, role: 'neutral' },
      { type: 'THWN_2', size: '12', quantity: 1, role: 'ground' }
    ]
  },
  
  threePhase480Y277V: {
    name: '480Y/277V Three Phase (3-phase + neutral + ground)',
    wires: [
      { type: 'THWN_2', size: '10', quantity: 3, role: 'phase' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'neutral' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'ground' }
    ]
  },
  
  subpanelFeeder: {
    name: 'Subpanel Feeder 100A (2-hot + neutral + ground)',
    wires: [
      { type: 'THWN_2', size: '2', quantity: 2, role: 'phase' },
      { type: 'THWN_2', size: '2', quantity: 1, role: 'neutral' },
      { type: 'THWN_2', size: '6', quantity: 1, role: 'ground' }
    ]
  },
  
  range50A: {
    name: '50A Range/Dryer Circuit (120/240V)',
    wires: [
      { type: 'THWN_2', size: '6', quantity: 2, role: 'phase' },
      { type: 'THWN_2', size: '6', quantity: 1, role: 'neutral' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'ground' }
    ]
  },
  
  acCondenser: {
    name: 'A/C Condenser Circuit 40A',
    wires: [
      { type: 'THWN_2', size: '8', quantity: 2, role: 'phase' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'ground' }
    ]
  },
  
  waterHeater: {
    name: 'Water Heater 30A (240V)',
    wires: [
      { type: 'THWN_2', size: '10', quantity: 2, role: 'phase' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'ground' }
    ]
  },
  
  fireAlarm: {
    name: 'Fire Alarm Circuit (14AWG)',
    wires: [
      { type: 'THHN', size: '14', quantity: 2, role: 'control' },
      { type: 'THHN', size: '14', quantity: 1, role: 'spare' }
    ]
  },
  
  emergencyLighting: {
    name: 'Emergency Lighting Circuit',
    wires: [
      { type: 'THWN_2', size: '12', quantity: 1, role: 'phase' },
      { type: 'THWN_2', size: '12', quantity: 1, role: 'neutral' },
      { type: 'THWN_2', size: '12', quantity: 1, role: 'ground' }
    ]
  },
  
  catVDataCable: {
    name: 'Data/Comm Cable Bundle (4-pair)',
    wires: [
      { type: 'TFN', size: '22', quantity: 8, role: 'control' }
    ]
  },
  
  pvSolar: {
    name: 'PV Solar String (2-wire + ground)',
    wires: [
      { type: 'THWN_2', size: '10', quantity: 2, role: 'phase' },
      { type: 'THWN_2', size: '10', quantity: 1, role: 'ground' }
    ]
  }
};
