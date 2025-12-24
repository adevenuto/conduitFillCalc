// Wire categories for organization
export const wireCategories = {
  BUILDING_WIRE: {
    name: 'Building Wire (600V)',
    description: 'General purpose building wiring conductors',
    types: [
      'THHN', 'THWN', 'THWN_2', 'THHW', 'THW', 'THW_2', 'TW',
      'XHHW', 'XHHW_2', 'XHH', 'RHH', 'RHW', 'RHW_2', 
      'USE', 'USE_2', 'ZW'
    ]
  },
  FIXTURE_WIRE: {
    name: 'Fixture Wire',
    description: 'Small gauge wires for lighting and fixtures',
    types: [
      'FFH_2', 'RFH_1', 'RFH_2', 'SF_1', 'SF_2', 'SFF_1', 'SFF_2',
      'TF', 'TFF', 'XF', 'XFF', 'TFN', 'TFFN', 'KF_1', 'KF_2', 
      'KFF_1', 'KFF_2'
    ]
  },
  HIGH_TEMP: {
    name: 'High Temperature Wire',
    description: 'Fluoropolymer insulated conductors for extreme temperatures',
    types: [
      'FEP', 'FEPB', 'PFA', 'PFAH', 'PTF', 'PTFF', 'TFE',
      'PAF', 'PAFF', 'PF', 'PFF', 'PGF', 'PGFF'
    ]
  },
  CONTROL_INSTRUMENTATION: {
    name: 'Control & Instrumentation',
    description: 'Specialized wires for control circuits and instrumentation',
    types: [
      'Z', 'ZF', 'ZFF', 'TFN', 'TFFN'
    ]
  }
};

export const getWireCategory = (wireType) => {
  for (const [categoryKey, category] of Object.entries(wireCategories)) {
    if (category.types.includes(wireType)) {
      return {
        key: categoryKey,
        ...category
      };
    }
  }
  return null;
};
