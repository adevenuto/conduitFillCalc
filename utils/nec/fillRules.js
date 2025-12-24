// NEC Table 1 - Fill Rules and Percentages
export const fillRules = {
  1: { 
    percent: 0.53, 
    reason: 'Single conductor (NEC Table 1, Chapter 9)',
    description: 'One conductor in raceway'
  },
  2: { 
    percent: 0.31, 
    reason: 'Two conductors (NEC Table 1, Chapter 9)',
    description: 'Two conductors in raceway'
  },
  default: { 
    percent: 0.40, 
    reason: 'Three or more conductors (NEC Table 1, Chapter 9)',
    description: 'Three or more conductors in raceway'
  }
};

export const getFillRule = (conductorCount) => {
  if (conductorCount === 1) return fillRules[1];
  if (conductorCount === 2) return fillRules[2];
  return fillRules.default;
};

export const calculateAllowableFill = (conduitArea, conductorCount) => {
  const rule = getFillRule(conductorCount);
  return conduitArea * rule.percent;
};
