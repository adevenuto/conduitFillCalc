// NEC Table 4 - Complete Conduit Areas and Dimensions
export const conduitTypes = {
  // METAL CONDUITS
  'EMT': {
    name: 'Electrical Metallic Tubing',
    category: 'Metal Conduits',
    article: 'Article 358',
    description: 'Lightweight steel tubing',
    applications: ['General purpose', 'Dry/damp locations', 'Exposed/concealed'],
    sizes: {
      '1/2': { total: 0.304, fill40: 0.122 },
      '3/4': { total: 0.533, fill40: 0.213 },
      '1': { total: 0.864, fill40: 0.346 },
      '1-1/4': { total: 1.496, fill40: 0.598 },
      '1-1/2': { total: 2.036, fill40: 0.814 },
      '2': { total: 3.356, fill40: 1.342 },
      '2-1/2': { total: 5.858, fill40: 2.343 },
      '3': { total: 8.846, fill40: 3.538 },
      '3-1/2': { total: 11.545, fill40: 4.618 },
      '4': { total: 14.753, fill40: 5.901 }
    }
  },
  'RMC': {
    name: 'Rigid Metal Conduit',
    category: 'Metal Conduits',
    article: 'Article 344',
    description: 'Threaded steel conduit',
    applications: ['Hazardous locations', 'Underground', 'Concrete encasement'],
    sizes: {
      '1/2': { total: 0.314, fill40: 0.125 },
      '3/4': { total: 0.549, fill40: 0.220 },
      '1': { total: 0.887, fill40: 0.355 },
      '1-1/4': { total: 1.526, fill40: 0.610 },
      '1-1/2': { total: 2.071, fill40: 0.829 },
      '2': { total: 3.408, fill40: 1.363 },
      '2-1/2': { total: 4.866, fill40: 1.946 },
      '3': { total: 7.499, fill40: 3.000 },
      '3-1/2': { total: 10.010, fill40: 4.004 },
      '4': { total: 12.882, fill40: 5.153 },
      '5': { total: 20.212, fill40: 8.085 },
      '6': { total: 29.158, fill40: 11.663 }
    }
  },
  'IMC': {
    name: 'Intermediate Metal Conduit',
    category: 'Metal Conduits',
    article: 'Article 342',
    description: 'Thinner wall than RMC',
    applications: ['General purpose', 'Lighter than RMC', 'Concrete encasement'],
    sizes: {
      '1/2': { total: 0.342, fill40: 0.137 },
      '3/4': { total: 0.586, fill40: 0.235 },
      '1': { total: 0.959, fill40: 0.384 },
      '1-1/4': { total: 1.647, fill40: 0.659 },
      '1-1/2': { total: 2.225, fill40: 0.890 },
      '2': { total: 3.630, fill40: 1.452 },
      '2-1/2': { total: 5.135, fill40: 2.054 },
      '3': { total: 7.922, fill40: 3.169 },
      '3-1/2': { total: 10.584, fill40: 4.234 },
      '4': { total: 13.631, fill40: 5.452 }
    }
  },

  // NONMETALLIC RIGID CONDUITS
  'PVC-40': {
    name: 'PVC Schedule 40',
    category: 'Nonmetallic Conduits',
    article: 'Articles 352 & 353',
    description: 'Standard wall PVC conduit',
    applications: ['Underground', 'Concrete encasement', 'Corrosive environments'],
    sizes: {
      '1/2': { total: 0.285, fill40: 0.114 },
      '3/4': { total: 0.508, fill40: 0.203 },
      '1': { total: 0.832, fill40: 0.333 },
      '1-1/4': { total: 1.453, fill40: 0.581 },
      '1-1/2': { total: 1.986, fill40: 0.794 },
      '2': { total: 3.291, fill40: 1.316 },
      '2-1/2': { total: 4.695, fill40: 1.878 },
      '3': { total: 7.268, fill40: 2.907 },
      '3-1/2': { total: 9.737, fill40: 3.895 },
      '4': { total: 12.554, fill40: 5.022 },
      '5': { total: 19.761, fill40: 7.904 },
      '6': { total: 28.567, fill40: 11.427 }
    }
  },
  'PVC-80': {
    name: 'PVC Schedule 80',
    category: 'Nonmetallic Conduits',
    article: 'Article 352',
    description: 'Heavy wall PVC conduit',
    applications: ['Above ground', 'Mechanical protection', 'Higher pressure'],
    sizes: {
      '1/2': { total: 0.217, fill40: 0.087 },
      '3/4': { total: 0.409, fill40: 0.164 },
      '1': { total: 0.688, fill40: 0.275 },
      '1-1/4': { total: 1.237, fill40: 0.495 },
      '1-1/2': { total: 1.711, fill40: 0.684 },
      '2': { total: 2.874, fill40: 1.150 },
      '2-1/2': { total: 4.119, fill40: 1.647 },
      '3': { total: 6.442, fill40: 2.577 },
      '3-1/2': { total: 8.688, fill40: 3.475 },
      '4': { total: 11.258, fill40: 4.503 },
      '5': { total: 17.855, fill40: 7.142 },
      '6': { total: 25.598, fill40: 10.239 }
    }
  },
  'PVC-A': {
    name: 'PVC Type A',
    category: 'Nonmetallic Conduits',
    article: 'Article 352',
    description: 'Thin wall PVC conduit',
    applications: ['Concrete encasement only', 'Lightweight'],
    sizes: {
      '1/2': { total: 0.385, fill40: 0.154 },
      '3/4': { total: 0.650, fill40: 0.260 },
      '1': { total: 1.084, fill40: 0.434 },
      '1-1/4': { total: 1.767, fill40: 0.707 },
      '1-1/2': { total: 2.324, fill40: 0.929 },
      '2': { total: 3.647, fill40: 1.459 },
      '2-1/2': { total: 5.453, fill40: 2.181 },
      '3': { total: 8.194, fill40: 3.278 },
      '3-1/2': { total: 10.694, fill40: 4.278 },
      '4': { total: 13.723, fill40: 5.489 }
    }
  },
  'PVC-EB': {
    name: 'PVC Type EB',
    category: 'Nonmetallic Conduits',
    article: 'Article 352',
    description: 'Encased burial PVC conduit',
    applications: ['Direct burial with concrete encasement'],
    sizes: {
      '2': { total: 3.874, fill40: 1.550 },
      '3': { total: 8.709, fill40: 3.484 },
      '3-1/2': { total: 11.365, fill40: 4.546 },
      '4': { total: 14.448, fill40: 5.779 },
      '5': { total: 22.195, fill40: 8.878 },
      '6': { total: 31.530, fill40: 12.612 }
    }
  },
  'HDPE': {
    name: 'High Density Polyethylene',
    category: 'Nonmetallic Conduits',
    article: 'Article 353',
    description: 'Corrugated HDPE conduit',
    applications: ['Underground', 'Direct burial', 'Utility applications'],
    sizes: {
      '1/2': { total: 0.285, fill40: 0.114 },
      '3/4': { total: 0.508, fill40: 0.203 },
      '1': { total: 0.832, fill40: 0.333 },
      '1-1/4': { total: 1.453, fill40: 0.581 },
      '1-1/2': { total: 1.986, fill40: 0.794 },
      '2': { total: 3.291, fill40: 1.316 },
      '2-1/2': { total: 4.695, fill40: 1.878 },
      '3': { total: 7.268, fill40: 2.907 },
      '3-1/2': { total: 9.737, fill40: 3.895 },
      '4': { total: 12.554, fill40: 5.022 },
      '5': { total: 19.761, fill40: 7.904 },
      '6': { total: 28.567, fill40: 11.427 }
    }
  },
  'ENT': {
    name: 'Electrical Nonmetallic Tubing',
    category: 'Nonmetallic Conduits',
    article: 'Article 362',
    description: 'Corrugated nonmetallic tubing',
    applications: ['Concealed in walls', 'Dry locations only', 'Residential'],
    sizes: {
      '1/2': { total: 0.240, fill40: 0.099 },
      '3/4': { total: 0.454, fill40: 0.181 },
      '1': { total: 0.785, fill40: 0.314 },
      '1-1/4': { total: 1.410, fill40: 0.564 },
      '1-1/2': { total: 1.936, fill40: 0.774 },
      '2': { total: 3.205, fill40: 1.282 }
    }
  },

  // FLEXIBLE CONDUITS
  'FMC': {
    name: 'Flexible Metal Conduit',
    category: 'Flexible Conduits',
    article: 'Article 348',
    description: 'Spiral wound metal conduit',
    applications: ['Motor connections', 'Vibration isolation', 'Short runs'],
    sizes: {
      '3/8': { total: 0.117, fill40: 0.046 },
      '1/2': { total: 0.317, fill40: 0.127 },
      '3/4': { total: 0.533, fill40: 0.213 },
      '1': { total: 0.817, fill40: 0.327 },
      '1-1/4': { total: 1.277, fill40: 0.511 },
      '1-1/2': { total: 1.858, fill40: 0.743 },
      '2': { total: 3.269, fill40: 1.307 },
      '2-1/2': { total: 4.909, fill40: 1.963 },
      '3': { total: 7.069, fill40: 2.827 },
      '3-1/2': { total: 9.621, fill40: 3.848 },
      '4': { total: 12.566, fill40: 5.027 }
    }
  },
  'LFMC': {
    name: 'Liquidtight Flexible Metal Conduit',
    category: 'Flexible Conduits',
    article: 'Article 350',
    description: 'Liquid-tight flexible metal conduit',
    applications: ['Wet locations', 'Motor connections', 'Outdoor equipment'],
    sizes: {
      '3/8': { total: 0.190, fill40: 0.077 },
      '1/2': { total: 0.314, fill40: 0.125 },
      '3/4': { total: 0.541, fill40: 0.216 },
      '1': { total: 0.873, fill40: 0.349 },
      '1-1/4': { total: 1.528, fill40: 0.611 },
      '1-1/2': { total: 1.981, fill40: 0.792 },
      '2': { total: 3.246, fill40: 1.298 },
      '2-1/2': { total: 4.881, fill40: 1.953 },
      '3': { total: 7.475, fill40: 2.990 },
      '3-1/2': { total: 9.731, fill40: 3.893 },
      '4': { total: 12.692, fill40: 5.077 }
    }
  },
  'LFNC-A': {
    name: 'LFNC Type A (UL Listed)',
    category: 'Flexible Conduits',
    article: 'Article 356',
    description: 'Liquidtight flexible nonmetallic conduit',
    applications: ['Wet locations', 'Chemical resistance', 'Underground'],
    sizes: {
      '3/8': { total: 0.190, fill40: 0.077 },
      '1/2': { total: 0.312, fill40: 0.125 },
      '3/4': { total: 0.535, fill40: 0.214 },
      '1': { total: 0.854, fill40: 0.342 },
      '1-1/4': { total: 1.502, fill40: 0.601 },
      '1-1/2': { total: 2.018, fill40: 0.807 },
      '2': { total: 3.343, fill40: 1.337 }
    }
  },
  'LFNC-B': {
    name: 'LFNC Type B (Non-UL Listed)',
    category: 'Flexible Conduits',
    article: 'Article 356',
    description: 'Liquidtight flexible nonmetallic conduit',
    applications: ['Wet locations', 'Chemical resistance', 'Direct burial'],
    sizes: {
      '3/8': { total: 0.190, fill40: 0.077 },
      '1/2': { total: 0.314, fill40: 0.125 },
      '3/4': { total: 0.541, fill40: 0.216 },
      '1': { total: 0.873, fill40: 0.349 },
      '1-1/4': { total: 1.528, fill40: 0.611 },
      '1-1/2': { total: 1.981, fill40: 0.792 },
      '2': { total: 3.246, fill40: 1.298 }
    }
  }
};

// Conduit categories for organization
export const conduitCategories = {
  METAL: {
    name: 'Metal Conduits',
    description: 'Steel and aluminum conduits for general purpose and hazardous locations',
    types: ['EMT', 'RMC', 'IMC']
  },
  NONMETALLIC: {
    name: 'Nonmetallic Conduits',
    description: 'PVC, HDPE and other plastic conduits for corrosive environments',
    types: ['PVC-40', 'PVC-80', 'PVC-A', 'PVC-EB', 'HDPE', 'ENT']
  },
  FLEXIBLE: {
    name: 'Flexible Conduits',
    description: 'Flexible conduits for motor connections and vibration isolation',
    types: ['FMC', 'LFMC', 'LFNC-A', 'LFNC-B']
  }
};

// Utility functions
export const getConduitsByCategory = (category) => {
  return Object.entries(conduitTypes)
    .filter(([_, conduit]) => conduit.category === category)
    .reduce((acc, [key, conduit]) => {
      acc[key] = conduit;
      return acc;
    }, {});
};

export const getAvailableSizes = (conduitType) => {
  return conduitTypes[conduitType]?.sizes ? Object.keys(conduitTypes[conduitType].sizes) : [];
};

export const getConduitArea = (conduitType, size, fillType = 'fill40') => {
  return conduitTypes[conduitType]?.sizes?.[size]?.[fillType] || null;
};
