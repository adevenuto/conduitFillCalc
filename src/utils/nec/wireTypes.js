// Complete NEC Table 5 Wire Types Database
export const wireTypes = {
  // Building Wire - Thermoplastic with Nylon Jacket
  'THHN': {
    label: 'THHN',
    longName: 'Thermoplastic, Heat-resistant, Nylon-jacketed',
    category: 'BUILDING_WIRE',
    wet: false,
    tempRatings: [90],
    insulation: 'Thermoplastic, Nylon',
    applications: ['Dry locations', 'Conduit/raceway'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366,
      '6': 0.0507, '4': 0.0824, '3': 0.0973, '2': 0.1158,
      '1': 0.1562, '1/0': 0.1855, '2/0': 0.2223, '3/0': 0.2679,
      '4/0': 0.3237, '250': 0.3970, '300': 0.4608
    }
  },
  'THWN': {
    label: 'THWN',
    longName: 'Thermoplastic, Heat and Water-resistant, Nylon-jacketed',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [75],
    insulation: 'Thermoplastic, Nylon',
    applications: ['Wet/dry locations', 'Conduit/raceway'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366,
      '6': 0.0507, '4': 0.0824, '3': 0.0973, '2': 0.1158,
      '1': 0.1562, '1/0': 0.1855, '2/0': 0.2223, '3/0': 0.2679,
      '4/0': 0.3237, '250': 0.3970, '300': 0.4608
    }
  },
  'THWN_2': {
    label: 'THWN-2',
    longName: 'Thermoplastic, Heat and Water-resistant, Nylon-jacketed',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [75, 90],
    insulation: 'Thermoplastic, Nylon',
    applications: ['Wet/dry locations', 'Conduit/raceway'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366,
      '6': 0.0507, '4': 0.0824, '3': 0.0973, '2': 0.1158,
      '1': 0.1562, '1/0': 0.1855, '2/0': 0.2223, '3/0': 0.2679,
      '4/0': 0.3237, '250': 0.3970, '300': 0.4608, '350': 0.5242,
      '400': 0.5863, '500': 0.7073, '600': 0.8676, '700': 0.9887,
      '750': 1.0496, '800': 1.1085, '900': 1.2311, '1000': 1.3478
    }
  },
  'THHW': {
    label: 'THHW',
    longName: 'Thermoplastic, High Heat-resistant, Water-resistant',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [75, 90],
    insulation: 'Thermoplastic',
    applications: ['Wet/dry locations', 'Service entrance'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437
    }
  },
  'THW': {
    label: 'THW',
    longName: 'Thermoplastic, Heat and Water-resistant',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [75],
    insulation: 'Thermoplastic',
    applications: ['Wet/dry locations', 'General purpose'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
      '6': 0.0726, '4': 0.0973, '3': 0.1134, '2': 0.1333,
      '1': 0.1901, '1/0': 0.2223, '2/0': 0.2624, '3/0': 0.3117,
      '4/0': 0.3718, '250': 0.4596, '300': 0.5281, '350': 0.5958,
      '400': 0.6619, '500': 0.7901, '600': 0.9729, '700': 1.1010,
      '750': 1.1652, '800': 1.2272, '900': 1.3561, '1000': 1.4784
    }
  },
  'THW_2': {
    label: 'THW-2',
    longName: 'Thermoplastic, Heat and Water-resistant',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [75, 90],
    insulation: 'Thermoplastic',
    applications: ['Wet/dry locations', 'General purpose'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
      '6': 0.0726, '4': 0.0973, '3': 0.1134, '2': 0.1333,
      '1': 0.1901, '1/0': 0.2223, '2/0': 0.2624, '3/0': 0.3117,
      '4/0': 0.3718, '250': 0.4596, '300': 0.5281, '350': 0.5958,
      '400': 0.6619, '500': 0.7901, '600': 0.9729, '700': 1.1010,
      '750': 1.1652, '800': 1.2272, '900': 1.3561, '1000': 1.4784,
      '1250': 1.8602, '1500': 2.1695, '1750': 2.4773, '2000': 2.7818
    }
  },
  'TW': {
    label: 'TW',
    longName: 'Thermoplastic, Water-resistant',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [60],
    insulation: 'Thermoplastic',
    applications: ['Wet/dry locations', 'General purpose'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
      '6': 0.0726, '4': 0.0973, '3': 0.1134, '2': 0.1333,
      '1': 0.1901, '1/0': 0.2223, '2/0': 0.2624, '3/0': 0.3117,
      '4/0': 0.3718, '250': 0.4596, '300': 0.5281, '350': 0.5958,
      '400': 0.6619, '500': 0.7901, '600': 0.9729, '700': 1.1010,
      '750': 1.1652, '800': 1.2272, '900': 1.3561, '1000': 1.4784
    }
  },
  
  // XHHW Series - Cross-linked Polyethylene
  'XHHW': {
    label: 'XHHW',
    longName: 'Cross-linked Polyethylene, High Heat-resistant, Water-resistant',
    category: 'BUILDING_WIRE',
    wet: false,
    tempRatings: [75, 90],
    insulation: 'XLPE',
    applications: ['Dry locations only (at 90°C)', 'Wet locations (75°C)'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
      '6': 0.0590, '4': 0.0814, '3': 0.0962, '2': 0.1146,
      '1': 0.1534, '1/0': 0.1825, '2/0': 0.2190, '3/0': 0.2642,
      '4/0': 0.3197, '250': 0.3904, '300': 0.4536, '350': 0.5166,
      '400': 0.5782, '500': 0.6984, '600': 0.8709, '700': 0.9923,
      '750': 1.0532, '800': 1.1122, '900': 1.2351, '1000': 1.3519,
      '1250': 1.7180, '1500': 2.0157, '1750': 2.3127, '2000': 2.6073
    }
  },
  'XHHW_2': {
    label: 'XHHW-2',
    longName: 'Cross-linked Polyethylene, High Heat-resistant, Water-resistant',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [75, 90],
    insulation: 'XLPE',
    applications: ['Wet/dry locations', 'Service entrance'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
      '6': 0.0590, '4': 0.0814, '3': 0.0962, '2': 0.1146,
      '1': 0.1534, '1/0': 0.1825, '2/0': 0.2190, '3/0': 0.2642,
      '4/0': 0.3197, '250': 0.3904, '300': 0.4536, '350': 0.5166,
      '400': 0.5782, '500': 0.6984, '600': 0.8709, '700': 0.9923,
      '750': 1.0532, '800': 1.1122, '900': 1.2351, '1000': 1.3519,
      '1250': 1.7180, '1500': 2.0157, '1750': 2.3127, '2000': 2.6073
    }
  },
  'XHH': {
    label: 'XHH',
    longName: 'Cross-linked Polyethylene, High Heat-resistant',
    category: 'BUILDING_WIRE',
    wet: false,
    tempRatings: [90],
    insulation: 'XLPE',
    applications: ['Dry locations only'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
      '6': 0.0590, '4': 0.0814, '3': 0.0962, '2': 0.1146,
      '1': 0.1534, '1/0': 0.1825, '2/0': 0.2190, '3/0': 0.2642,
      '4/0': 0.3197, '250': 0.3904, '300': 0.4536, '350': 0.5166,
      '400': 0.5782, '500': 0.6984, '600': 0.8709, '700': 0.9923,
      '750': 1.0532, '800': 1.1122, '900': 1.2351, '1000': 1.3519
    }
  },

  // RHH/RHW Series - Heat-resistant Rubber
  'RHH': {
    label: 'RHH',
    longName: 'Rubber, Heat-resistant',
    category: 'BUILDING_WIRE',
    wet: false,
    tempRatings: [90],
    insulation: 'Thermoset',
    applications: ['Dry locations only'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0293, '12': 0.0353, '10': 0.0437, '8': 0.0835,
      '6': 0.1041, '4': 0.1333, '3': 0.1521, '2': 0.1750,
      '1': 0.2660, '1/0': 0.3039, '2/0': 0.3505, '3/0': 0.4072,
      '4/0': 0.4754, '250': 0.6291, '300': 0.7088, '350': 0.7870,
      '400': 0.8626, '500': 1.0082, '600': 1.2135, '700': 1.3561,
      '750': 1.4272, '800': 1.4957, '900': 1.6377, '1000': 1.7719,
      '1250': 2.3479, '1500': 2.6938, '1750': 3.0357, '2000': 3.3719
    }
  },
  'RHW': {
    label: 'RHW',
    longName: 'Rubber, Heat and Water-resistant',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [75],
    insulation: 'Thermoset',
    applications: ['Wet/dry locations'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0293, '12': 0.0353, '10': 0.0437, '8': 0.0835,
      '6': 0.1041, '4': 0.1333, '3': 0.1521, '2': 0.1750,
      '1': 0.2660, '1/0': 0.3039, '2/0': 0.3505, '3/0': 0.4072,
      '4/0': 0.4754, '250': 0.6291, '300': 0.7088, '350': 0.7870,
      '400': 0.8626, '500': 1.0082, '600': 1.2135, '700': 1.3561,
      '750': 1.4272, '800': 1.4957, '900': 1.6377, '1000': 1.7719
    }
  },
  'RHW_2': {
    label: 'RHW-2',
    longName: 'Rubber, Heat and Water-resistant',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [75, 90],
    insulation: 'Thermoset',
    applications: ['Wet/dry locations'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0293, '12': 0.0353, '10': 0.0437, '8': 0.0835,
      '6': 0.1041, '4': 0.1333, '3': 0.1521, '2': 0.1750,
      '1': 0.2660, '1/0': 0.3039, '2/0': 0.3505, '3/0': 0.4072,
      '4/0': 0.4754, '250': 0.6291, '300': 0.7088, '350': 0.7870,
      '400': 0.8626, '500': 1.0082, '600': 1.2135, '700': 1.3561,
      '750': 1.4272, '800': 1.4957, '900': 1.6377, '1000': 1.7719,
      '1250': 2.3479, '1500': 2.6938, '1750': 3.0357, '2000': 3.3719
    }
  },

  // Underground Service Entrance
  'USE': {
    label: 'USE',
    longName: 'Underground Service Entrance',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [75],
    insulation: 'XLPE',
    applications: ['Underground service entrance', 'Direct burial'],
    necRef: 'Table 310.104(A)',
    areas: {
      '12': 0.0260, '10': 0.0333, '8': 0.0437,
      '6': 0.0726, '4': 0.0973, '2': 0.1333, '1': 0.1901,
      '1/0': 0.2223, '2/0': 0.2642, '3/0': 0.3197, '4/0': 0.3904,
      '250': 0.4536, '300': 0.5281, '350': 0.5958, '400': 0.6619,
      '500': 0.7901, '600': 0.9729, '750': 1.1663, '1000': 1.4784
    }
  },
  'USE_2': {
    label: 'USE-2',
    longName: 'Underground Service Entrance',
    category: 'BUILDING_WIRE',
    wet: true,
    tempRatings: [90],
    insulation: 'XLPE',
    applications: ['Underground service entrance', 'Direct burial'],
    necRef: 'Table 310.104(A)',
    areas: {
      '12': 0.0260, '10': 0.0333, '8': 0.0437,
      '6': 0.0726, '4': 0.0973, '2': 0.1333, '1': 0.1901,
      '1/0': 0.2223, '2/0': 0.2642, '3/0': 0.3197, '4/0': 0.3904,
      '250': 0.4536, '300': 0.5281, '350': 0.5958, '400': 0.6619,
      '500': 0.7901, '600': 0.9729, '750': 1.1663, '1000': 1.4784
    }
  },

  // High Temperature Fluoropolymer Wires
  'TFE': {
    label: 'TFE',
    longName: 'Tetrafluoroethylene',
    category: 'HIGH_TEMP',
    wet: false,
    tempRatings: [250],
    insulation: 'Fluoropolymer',
    applications: ['High temperature', 'Chemical resistance'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0100, '12': 0.0137, '10': 0.0191, '8': 0.0333,
      '6': 0.0468, '4': 0.0670, '3': 0.0804, '2': 0.0973,
      '1': 0.1399, '1/0': 0.1676, '2/0': 0.2027, '3/0': 0.2463,
      '4/0': 0.3000
    }
  },
  'FEP': {
    label: 'FEP',
    longName: 'Fluorinated Ethylene Propylene',
    category: 'HIGH_TEMP',
    wet: false,
    tempRatings: [200],
    insulation: 'Fluoropolymer',
    applications: ['High temperature', 'Chemical resistance'],
    necRef: 'Table 310.104(A)',
    areas: {
      '18': 0.0058, '16': 0.0075, '14': 0.0100, '12': 0.0137,
      '10': 0.0191, '8': 0.0333, '6': 0.0468, '4': 0.0670,
      '3': 0.0804, '2': 0.0973
    }
  },
  'FEPB': {
    label: 'FEPB',
    longName: 'Fluorinated Ethylene Propylene (Braided)',
    category: 'HIGH_TEMP',
    wet: false,
    tempRatings: [200],
    insulation: 'Fluoropolymer',
    applications: ['High temperature', 'Chemical resistance'],
    necRef: 'Table 310.104(A)',
    areas: {
      '18': 0.0058, '16': 0.0075, '14': 0.0100, '12': 0.0137,
      '10': 0.0191, '8': 0.0333, '6': 0.0468, '4': 0.0670,
      '3': 0.0804, '2': 0.0973
    }
  },
  'PFA': {
    label: 'PFA',
    longName: 'Perfluoroalkoxy',
    category: 'HIGH_TEMP',
    wet: false,
    tempRatings: [250],
    insulation: 'Fluoropolymer',
    applications: ['High temperature', 'Chemical resistance'],
    necRef: 'Table 310.104(A)',
    areas: {
      '18': 0.0058, '16': 0.0075, '14': 0.0100, '12': 0.0137,
      '10': 0.0191, '8': 0.0333, '6': 0.0468, '4': 0.0670,
      '3': 0.0804, '2': 0.0973, '1': 0.1399, '1/0': 0.1676,
      '2/0': 0.2027, '3/0': 0.2463, '4/0': 0.3000
    }
  },
  'PFAH': {
    label: 'PFAH',
    longName: 'Perfluoroalkoxy (High temperature)',
    category: 'HIGH_TEMP',
    wet: false,
    tempRatings: [250],
    insulation: 'Fluoropolymer',
    applications: ['High temperature', 'Chemical resistance'],
    necRef: 'Table 310.104(A)',
    areas: {
      '18': 0.0058, '16': 0.0075, '14': 0.0100, '12': 0.0137,
      '10': 0.0191, '8': 0.0333, '6': 0.0468, '4': 0.0670,
      '3': 0.0804, '2': 0.0973, '1': 0.1399, '1/0': 0.1676,
      '2/0': 0.2027, '3/0': 0.2463, '4/0': 0.3000
    }
  },

  // Fixture Wires
  'TF': {
    label: 'TF',
    longName: 'Thermoplastic Fixture Wire',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [60],
    insulation: 'Thermoplastic',
    applications: ['Fixture wiring', 'Dry locations'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0080
    }
  },
  'TFF': {
    label: 'TFF',
    longName: 'Thermoplastic Fixture Wire (Flexible)',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [60],
    insulation: 'Thermoplastic',
    applications: ['Fixture wiring', 'Dry locations'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0080, '16': 0.0109
    }
  },
  'TFN': {
    label: 'TFN',
    longName: 'Thermoplastic Fixture Wire, Nylon-jacketed',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [90],
    insulation: 'Thermoplastic, Nylon',
    applications: ['Control circuits', 'Dry locations'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0055, '16': 0.0072
    }
  },
  'TFFN': {
    label: 'TFFN',
    longName: 'Thermoplastic Flexible Fixture Wire, Nylon-jacketed',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [90],
    insulation: 'Thermoplastic, Nylon',
    applications: ['Control circuits', 'Dry locations'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0055, '16': 0.0072
    }
  },
  'SF_1': {
    label: 'SF-1',
    longName: 'Silicone Fixture Wire',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [200],
    insulation: 'Silicone',
    applications: ['High temperature fixtures'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0065
    }
  },
  'SF_2': {
    label: 'SF-2',
    longName: 'Silicone Fixture Wire',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [200],
    insulation: 'Silicone',
    applications: ['High temperature fixtures'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0115, '16': 0.0139, '14': 0.0172
    }
  },
  'SFF_1': {
    label: 'SFF-1',
    longName: 'Silicone Flexible Fixture Wire',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [200],
    insulation: 'Silicone',
    applications: ['High temperature fixtures'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0065
    }
  },
  'SFF_2': {
    label: 'SFF-2',
    longName: 'Silicone Flexible Fixture Wire',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [200],
    insulation: 'Silicone',
    applications: ['High temperature fixtures'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0115, '16': 0.0139, '14': 0.0172
    }
  },

  // Control/Instrumentation Wires
  'Z': {
    label: 'Z',
    longName: 'Modified Ethylene Tetrafluoroethylene',
    category: 'CONTROL_INSTRUMENTATION',
    wet: false,
    tempRatings: [90, 150],
    insulation: 'Modified ETFE',
    applications: ['Dry locations', 'Control circuits'],
    necRef: 'Table 310.104(A)',
    areas: {
      '14': 0.0083, '12': 0.0117, '10': 0.0191, '8': 0.0302,
      '6': 0.0430, '4': 0.0625, '3': 0.0855, '2': 0.1029,
      '1': 0.1269, '1/0': 0.1676, '2/0': 0.2027, '3/0': 0.2463,
      '4/0': 0.3000
    }
  },
  'ZF': {
    label: 'ZF',
    longName: 'Modified Ethylene Tetrafluoroethylene (Flexible)',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [150],
    insulation: 'Modified ETFE',
    applications: ['Fixture wiring', 'Dry locations'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0045, '16': 0.0061, '14': 0.0083
    }
  },
  'ZFF': {
    label: 'ZFF',
    longName: 'Modified Ethylene Tetrafluoroethylene (Flexible)',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [150],
    insulation: 'Modified ETFE',
    applications: ['Fixture wiring', 'Dry locations'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0045, '16': 0.0061, '14': 0.0083
    }
  },
  
  // Additional Fixture Wire Types
  'FFH_2': {
    label: 'FFH-2',
    longName: 'Flexible Heat-resistant (200°C)',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [200],
    insulation: 'Heat-resistant',
    applications: ['Fixture wiring', 'High temperature'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0145, '16': 0.0172
    }
  },
  'RFH_1': {
    label: 'RFH-1',
    longName: 'Rubber, Heat-resistant Fixture Wire',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [75],
    insulation: 'Rubber',
    applications: ['Fixture wiring'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0080
    }
  },
  'RFH_2': {
    label: 'RFH-2',
    longName: 'Rubber, Heat-resistant Fixture Wire',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [75],
    insulation: 'Rubber',
    applications: ['Fixture wiring'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0145, '16': 0.0172
    }
  },
  'XF': {
    label: 'XF',
    longName: 'Cross-linked Polyethylene Fixture Wire',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [150],
    insulation: 'XLPE',
    applications: ['Fixture wiring', 'Dry locations'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0080, '16': 0.0109, '14': 0.0139, '12': 0.0181,
      '10': 0.0243
    }
  },
  'XFF': {
    label: 'XFF',
    longName: 'Cross-linked Polyethylene Flexible Fixture Wire',
    category: 'FIXTURE_WIRE',
    wet: false,
    tempRatings: [150],
    insulation: 'XLPE',
    applications: ['Fixture wiring', 'Dry locations'],
    necRef: 'Table 402.3',
    areas: {
      '18': 0.0080, '16': 0.0109, '14': 0.0139, '12': 0.0181,
      '10': 0.0243
    }
  },

  // Custom Wire Type for user-defined conductors
  'CUSTOM': {
    label: '🔧 Custom Wire',
    longName: 'User-defined Custom Wire',
    category: 'CUSTOM',
    wet: true,
    tempRatings: [90],
    insulation: 'User-defined',
    applications: ['Special applications', 'Non-standard conductors', 'Engineering analysis'],
    necRef: 'User-specified',
    areas: {} // Empty - size will be user-input
  }
};

// Utility functions
export const getWiresByCategory = (category) => {
  return Object.entries(wireTypes)
    .filter(([_, wire]) => wire.category === category)
    .reduce((acc, [key, wire]) => {
      acc[key] = wire;
      return acc;
    }, {});
};

export const searchWires = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return Object.entries(wireTypes)
    .filter(([key, wire]) => 
      key.toLowerCase().includes(term) ||
      wire.label.toLowerCase().includes(term) ||
      wire.longName.toLowerCase().includes(term) ||
      wire.insulation.toLowerCase().includes(term) ||
      wire.applications.some(app => app.toLowerCase().includes(term))
    )
    .reduce((acc, [key, wire]) => {
      acc[key] = wire;
      return acc;
    }, {});
};

export const getAvailableSizes = (wireType) => {
  return wireTypes[wireType]?.areas ? Object.keys(wireTypes[wireType].areas) : [];
};

export const getWireArea = (wireType, size) => {
  return wireTypes[wireType]?.areas?.[size] || null;
};
