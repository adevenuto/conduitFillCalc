import React from 'react';

// Wire Icons - Small SVG representations of different wire types
export const WireIcon = ({ type, size = 20 }: { type: string; size?: number }) => {
  const getWireColor = (wireType: string) => {
    const colors = {
      // Building Wire
      'THHN': '#FFD700', // Gold/Yellow
      'THWN_2': '#000000', // Black
      'THWN': '#000000', // Black
      'XHHW_2': '#228B22', // Dark Green
      'XHHW': '#228B22', // Dark Green
      'RHH': '#8B4513', // Brown
      'RHW_2': '#8B4513', // Brown
      'THW_2': '#4169E1', // Blue
      'THW': '#4169E1', // Blue
      'TW': '#808080', // Gray
      'USE_2': '#2F4F4F', // Dark Slate Gray
      'UF': '#8B4513', // Brown
      
      // High Temperature
      'FEP': '#FF4500', // Orange Red
      'FEPB': '#FF6347', // Tomato
      'TFE': '#DC143C', // Crimson
      'PFA': '#FF1493', // Deep Pink
      'PFAH': '#FF69B4', // Hot Pink
      'ETFE': '#FF8C00', // Dark Orange
      
      // Fixture Wire
      'TF': '#87CEEB', // Sky Blue
      'TFF': '#87CEFA', // Light Sky Blue
      'TFN': '#4682B4', // Steel Blue
      'TFFN': '#5F9EA0', // Cadet Blue
      'SF_1': '#9370DB', // Medium Purple
      'SF_2': '#8A2BE2', // Blue Violet
      'XF': '#6495ED', // Cornflower Blue
      'XFF': '#4169E1', // Royal Blue
      
      // Control Wire
      'Z': '#32CD32', // Lime Green
      'ZF': '#00FF32', // Bright Green
      'ZFF': '#00FF00' // Lime
    };
    return colors[wireType as keyof typeof colors] || '#666666';
  };

  const color = getWireColor(type);
  const strokeColor = color === '#000000' ? '#333333' : '#000000';

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block">
      <circle
        cx="12"
        cy="12"
        r="8"
        fill={color}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
  );
};

// Conduit Icons - Cross-section views showing different conduit types
export const ConduitIcon = ({ type, size = 20 }: { type: string; size?: number }) => {
  const getConduitStyle = (conduitType: string) => {
    const styles = {
      // Metal Conduits
      'EMT': {
        outerColor: '#C0C0C0', // Silver
        innerColor: '#FFFFFF',
        strokeWidth: '1.5',
        strokeDash: ''
      },
      'RMC': {
        outerColor: '#696969', // Dim Gray
        innerColor: '#FFFFFF',
        strokeWidth: '2.5',
        strokeDash: ''
      },
      'IMC': {
        outerColor: '#808080', // Gray
        innerColor: '#FFFFFF',
        strokeWidth: '2',
        strokeDash: ''
      },
      
      // Nonmetallic Conduits
      'PVC-40': {
        outerColor: '#F5F5F5', // White Smoke
        innerColor: '#FFFFFF',
        strokeWidth: '1.5',
        strokeDash: ''
      },
      'PVC-80': {
        outerColor: '#D3D3D3', // Light Gray
        innerColor: '#FFFFFF',
        strokeWidth: '2.5',
        strokeDash: ''
      },
      'PVC-A': {
        outerColor: '#E6E6FA', // Lavender
        innerColor: '#FFFFFF',
        strokeWidth: '1',
        strokeDash: ''
      },
      'PVC-EB': {
        outerColor: '#F0E68C', // Khaki
        innerColor: '#FFFFFF',
        strokeWidth: '2',
        strokeDash: ''
      },
      'HDPE': {
        outerColor: '#2F4F4F', // Dark Slate Gray
        innerColor: '#FFFFFF',
        strokeWidth: '1.5',
        strokeDash: '2,2'
      },
      'ENT': {
        outerColor: '#ADD8E6', // Light Blue
        innerColor: '#FFFFFF',
        strokeWidth: '1',
        strokeDash: '1,1'
      },
      
      // Flexible Conduits
      'FMC': {
        outerColor: '#C0C0C0', // Silver
        innerColor: '#FFFFFF',
        strokeWidth: '1.5',
        strokeDash: '3,1'
      },
      'LFMC': {
        outerColor: '#696969', // Dim Gray
        innerColor: '#FFFFFF',
        strokeWidth: '1.5',
        strokeDash: '3,1'
      },
      'LFNC-A': {
        outerColor: '#800080', // Purple
        innerColor: '#FFFFFF',
        strokeWidth: '1.5',
        strokeDash: '2,1'
      },
      'LFNC-B': {
        outerColor: '#4B0082', // Indigo
        innerColor: '#FFFFFF',
        strokeWidth: '1.5',
        strokeDash: '2,1'
      }
    };
    return styles[conduitType as keyof typeof styles] || styles['EMT'];
  };

  const style = getConduitStyle(type);

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block">
      {/* Outer conduit wall */}
      <circle
        cx="12"
        cy="12"
        r="10"
        fill={style.outerColor}
        stroke="#000000"
        strokeWidth="0.5"
        strokeDasharray={style.strokeDash}
      />
      {/* Inner conduit space */}
      <circle
        cx="12"
        cy="12"
        r={10 - parseFloat(style.strokeWidth)}
        fill={style.innerColor}
        stroke="#666666"
        strokeWidth="0.3"
        opacity="0.8"
      />
      {/* Center indicator for flexible conduits */}
      {type.includes('F') && (
        <circle
          cx="12"
          cy="12"
          r="2"
          fill="none"
          stroke="#333333"
          strokeWidth="0.5"
          opacity="0.3"
        />
      )}
    </svg>
  );
};

// Combined icon with tooltip showing additional info
export const IconWithTooltip = ({ 
  children, 
  tooltip, 
  className = "" 
}: { 
  children: React.ReactNode; 
  tooltip: string;
  className?: string;
}) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
        {tooltip}
      </div>
    </div>
  );
};
