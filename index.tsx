"use client"

import React, { useState, useEffect } from 'react';
import { Plus, X, AlertCircle, CheckCircle, Info, Search, Filter, Thermometer, Trash2, RotateCcw } from 'lucide-react';
import { wireTypes, wireCategories, conduitTypes, conduitCategories, getConduitsByCategory, getFillRule } from '../utils/nec';
import { WireIcon, ConduitIcon, IconWithTooltip } from '../components/Icons';

// Wire interface for TypeScript
interface Wire {
  id: number;
  type: string;
  size: string;
  customArea?: number; // For CUSTOM wire type area input
  quantity: number;
  role: string;
}

interface WireBreakdown extends Wire {
  areaEach: number;
  areaTotal: number;
  wireLabel: string;
}

interface Results {
  mode: string;
  totalWireArea: number;
  totalWireCount: number;
  fillPercent: number;
  fillRule: string;
  wireBreakdown: WireBreakdown[];
  mixedInsulation: boolean;
  minSize?: string;
  minSizeData?: any;
  conduitType?: string;
  conduitData?: any;
  allowableFill?: number;
  actualFillPercent?: number;
  compliant?: boolean;
  selectedConduit?: any;
}

// Wire presets for common circuits
const wirePresets = {
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

// Get available conduit types grouped by category
const metalConduits = Object.keys(getConduitsByCategory('Metal Conduits'));
const nonmetallicConduits = Object.keys(getConduitsByCategory('Nonmetallic Conduits'));
const flexibleConduits = Object.keys(getConduitsByCategory('Flexible Conduits'));

// Main conduit types for the interface
const mainConduitTypes = ['EMT', 'PVC-40', 'PVC-80', 'RMC', 'IMC', 'LFMC', 'FMC'];

const ConduitFillCalculator = () => {
  const [mode, setMode] = useState('findConduit');
  const [wires, setWires] = useState<Wire[]>([]);
  const [selectedConduit, setSelectedConduit] = useState({
    type: 'EMT',
    size: '3/4'
  });
  const [results, setResults] = useState<Results | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [initialWireType, setInitialWireType] = useState('');
  const [initialWireSize, setInitialWireSize] = useState('12');
  const [initialWireQuantity, setInitialWireQuantity] = useState(1);
  const [initialWireRole, setInitialWireRole] = useState('phase');

  const addWire = () => {
    if (wires.length === 0 && initialWireType) {
      // Add the configured initial wire
      const newWire: Wire = { 
        id: Date.now(), 
        type: initialWireType, 
        size: initialWireType === 'CUSTOM' ? 'custom' : initialWireSize,
        quantity: initialWireQuantity,
        role: initialWireRole
      };
      
      // For custom wires, set the customArea
      if (initialWireType === 'CUSTOM') {
        newWire.customArea = parseFloat(initialWireSize) || 0.01;
      }
      
      setWires([newWire]);
      
      // Reset initial form
      setInitialWireType('');
      setInitialWireSize('12');
      setInitialWireQuantity(1);
      setInitialWireRole('phase');
    } else {
      // Add a new default wire
      setWires([...wires, { 
        id: Date.now(), 
        type: 'THHN', 
        size: '12', 
        quantity: 1,
        role: 'phase'
      }]);
    }
  };

  const addPreset = (presetKey: string) => {
    const preset = wirePresets[presetKey as keyof typeof wirePresets];
    const newWires = preset.wires.map((wire: any, index: number): Wire => ({
      ...wire,
      id: Date.now() + index
    }));
    setWires([...wires, ...newWires]);
    setShowPresets(false);
  };

  const removeWire = (id: number) => {
    setWires(wires.filter(w => w.id !== id));
  };

  const updateWire = (id: number, field: string, value: string | number) => {
    setWires(wires.map(w => 
      w.id === id ? { ...w, [field]: value } : w
    ));
  };

  const clearAllWires = () => {
    setWires([]);
    setResults(null);
  };

  const resetAll = () => {
    setWires([]);
    setSelectedConduit({ type: 'EMT', size: '3/4' });
    setMode('findConduit');
    setResults(null);
  };

  const calculateFill = () => {
    if (wires.length === 0) {
      setResults(null);
      return;
    }

    let totalWireArea = 0;
    const wireBreakdown = [];
    let hasInvalidWire = false;

    wires.forEach(wire => {
      const wireType = wireTypes[wire.type];
      
      // Get area - either from custom area or standard lookup
      let area: number;
      if (wire.type === 'CUSTOM') {
        area = wire.customArea || 0;
        if (area <= 0 || area > 10) {
          hasInvalidWire = true;
          return;
        }
      } else {
        area = wireType?.areas[wire.size];
        if (!area || !wireType) {
          hasInvalidWire = true;
          return;
        }
      }
      
      const quantity = parseInt(wire.quantity);
      if (isNaN(quantity) || quantity < 1) {
        hasInvalidWire = true;
        return;
      }
      
      const wireTotal = area * quantity;
      totalWireArea += wireTotal;
      wireBreakdown.push({
        ...wire,
        areaEach: area,
        areaTotal: wireTotal,
        wireLabel: wireType.label
      });
    });

    if (hasInvalidWire) {
      setResults(null);
      return;
    }

    const totalWireCount = wires.reduce((sum, w) => sum + parseInt(w.quantity), 0);
    
    // Determine fill rule
    const fillRule = getFillRule(totalWireCount);

    // Check for mixed insulation
    const insulationSet = new Set(wires.map(w => w.type));
    const mixedInsulation = insulationSet.size > 1;

    if (mode === 'findConduit') {
      const conduitType = selectedConduit.type;
      const conduitInfo = conduitTypes[conduitType as keyof typeof conduitTypes];
      const sizes = Object.keys(conduitInfo?.sizes || {});
      
      let minSize: string | null = null;
      let minSizeData = null;

      for (const size of sizes) {
        const conduitData = conduitInfo.sizes[size as keyof typeof conduitInfo.sizes];
        const allowableFill = conduitData.total * fillRule.percent;
        
        if (totalWireArea <= allowableFill) {
          minSize = size;
          minSizeData = {
            ...conduitData,
            allowableFill,
            actualFill: totalWireArea,
            fillPercentage: (totalWireArea / conduitData.total) * 100
          };
          break;
        }
      }

      setResults({
        mode: 'findConduit',
        totalWireArea,
        totalWireCount,
        fillPercent: fillRule.percent,
        fillRule: fillRule.reason,
        wireBreakdown: wireBreakdown as WireBreakdown[],
        minSize: minSize || undefined,
        minSizeData,
        conduitType,
        mixedInsulation
      });
    } else {
      const conduitInfo = conduitTypes[selectedConduit.type];
      const conduitData = conduitInfo?.sizes[selectedConduit.size];
      
      if (!conduitData) {
        setResults(null);
        return;
      }
      
      const allowableFill = conduitData.total * fillRule.percent;
      const actualFillPercent = (totalWireArea / conduitData.total) * 100;
      const compliant = totalWireArea <= allowableFill;

      setResults({
        mode: 'checkFit',
        totalWireArea,
        totalWireCount,
        fillPercent: fillRule.percent,
        fillRule: fillRule.reason,
        wireBreakdown: wireBreakdown as WireBreakdown[],
        conduitData,
        allowableFill,
        actualFillPercent,
        compliant,
        selectedConduit,
        mixedInsulation
      });
    }
  };

  useEffect(() => {
    calculateFill();
  }, [wires, mode, selectedConduit]);

  const getFillColor = (percentage) => {
    if (percentage <= 40) return 'bg-green-500';
    if (percentage <= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            NEC Conduit Fill Calculator
          </h1>
          <p className="text-sm text-gray-700">
            Calculate conduit sizing based on NEC Chapter 9, Tables 1, 4 & 5
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-gray-700">
          {/* LEFT COLUMN - Form */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMode('findConduit')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'findConduit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Find Min Size
              </button>
              <button
                onClick={() => setMode('checkFit')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'checkFit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Check Fit
              </button>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Conduit Type</h2>
              
              {/* Metal Conduits */}
              <div className="mb-3">
                <h3 className="text-xs font-medium text-gray-600 mb-1">🔩 Metal Conduits</h3>
                <div className="grid grid-cols-3 gap-1">
                  {metalConduits.map(type => (
                    <IconWithTooltip
                      key={type}
                      tooltip={conduitTypes[type as keyof typeof conduitTypes]?.description || type}
                    >
                      <button
                        onClick={() => setSelectedConduit({ ...selectedConduit, type })}
                        className={`py-1.5 px-2 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                          selectedConduit.type === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <ConduitIcon type={type} size={16} />
                        {type}
                      </button>
                    </IconWithTooltip>
                  ))}
                </div>
              </div>

              {/* Nonmetallic Conduits */}
              <div className="mb-3">
                <h3 className="text-xs font-medium text-gray-600 mb-1">🧱 Nonmetallic Conduits</h3>
                <div className="grid grid-cols-3 gap-1">
                  {nonmetallicConduits.map(type => (
                    <IconWithTooltip
                      key={type}
                      tooltip={conduitTypes[type as keyof typeof conduitTypes]?.description || type}
                    >
                      <button
                        onClick={() => setSelectedConduit({ ...selectedConduit, type })}
                        className={`py-1.5 px-2 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                          selectedConduit.type === type
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <ConduitIcon type={type} size={16} />
                        {type === 'PVC-40' ? 'PVC Sch 40' :
                         type === 'PVC-80' ? 'PVC Sch 80' :
                         type === 'PVC-A' ? 'PVC-A' :
                         type === 'PVC-EB' ? 'PVC-EB' : type}
                      </button>
                    </IconWithTooltip>
                  ))}
                </div>
              </div>

              {/* Flexible Conduits */}
              <div className="mb-3">
                <h3 className="text-xs font-medium text-gray-600 mb-1">🌊 Flexible Conduits</h3>
                <div className="grid grid-cols-2 gap-1">
                  {flexibleConduits.map(type => (
                    <IconWithTooltip
                      key={type}
                      tooltip={conduitTypes[type as keyof typeof conduitTypes]?.description || type}
                    >
                      <button
                        onClick={() => setSelectedConduit({ ...selectedConduit, type })}
                        className={`py-1.5 px-2 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                          selectedConduit.type === type
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <ConduitIcon type={type} size={16} />
                        {type}
                      </button>
                    </IconWithTooltip>
                  ))}
                </div>
              </div>

              {/* Show conduit info for selected type */}
              {selectedConduit.type && conduitTypes[selectedConduit.type as keyof typeof conduitTypes] && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 mt-2">
                  <div className="text-xs">
                    <div className="font-medium text-gray-800">
                      {conduitTypes[selectedConduit.type as keyof typeof conduitTypes].name}
                    </div>
                    <div className="text-gray-600 mt-0.5">
                      {conduitTypes[selectedConduit.type as keyof typeof conduitTypes].description}
                    </div>
                    <div className="text-blue-600 text-xs mt-1">
                      {conduitTypes[selectedConduit.type as keyof typeof conduitTypes].article}
                    </div>
                  </div>
                </div>
              )}

              {mode === 'checkFit' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Conduit Size
                  </label>
                  <select
                    value={selectedConduit.size}
                    onChange={(e) => setSelectedConduit({ ...selectedConduit, size: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {Object.keys(conduitTypes[selectedConduit.type]?.sizes || {}).map(size => (
                      <option key={size} value={size}>{size}"</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Wires</h2>
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className="text-xs px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  {showPresets ? 'Hide' : 'Show'} Presets
                </button>
              </div>

              {showPresets && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                  <h3 className="text-xs font-semibold text-purple-900 mb-2">Common Circuits</h3>
                  <div className="grid grid-cols-1 gap-1">
                    {Object.entries(wirePresets).map(([key, preset]) => (
                      <button
                        key={key}
                        onClick={() => addPreset(key)}
                        className="text-xs px-2 py-1.5 bg-white border border-purple-200 rounded hover:bg-purple-100 transition-colors text-left"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Always show wire form when no wires exist */}
              {wires.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <p className="text-xs text-blue-800 mb-2">Configure your first wire:</p>
                  <div className="flex gap-2">
                    <select
                      value={initialWireType}
                      onChange={(e) => {
                        setInitialWireType(e.target.value);
                        // Update available sizes when wire type changes
                        if (e.target.value) {
                          const availableSizes = Object.keys(wireTypes[e.target.value].areas);
                          if (!availableSizes.includes(initialWireSize)) {
                            setInitialWireSize(availableSizes[0]);
                          }
                        }
                      }}
                      className={`flex-1 px-2 py-2 text-xs rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        initialWireType 
                          ? 'border border-gray-300 bg-white' 
                          : 'border-2 shadow-sm animate-pulse'
                      }`}
                      style={!initialWireType ? {
                        borderColor: '#00c950',
                        backgroundColor: '#f0fff4'
                      } : {}}
                    >
                      <option value="">→ Select wire type to begin...</option>
                      {[
                        ['CUSTOM', wireTypes.CUSTOM],
                        ...Object.entries(wireTypes).filter(([key]) => key !== 'CUSTOM')
                      ].map(([key, type]) => (
                        <option key={key} value={key}>
                          {type.label}
                        </option>
                      ))}
                    </select>

                    {initialWireType === 'CUSTOM' ? (
                      <input
                        type="number"
                        min="0.0001"
                        max="10"
                        step="0.0001"
                        value={initialWireSize}
                        onChange={(e) => setInitialWireSize(e.target.value)}
                        placeholder="0.0123"
                        className="w-20 px-2 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-yellow-50 text-center"
                        title="Wire area in square inches"
                      />
                    ) : (
                      <select
                        value={initialWireSize}
                        onChange={(e) => setInitialWireSize(e.target.value)}
                        disabled={!initialWireType}
                        className="w-20 px-2 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100"
                      >
                        {initialWireType ? 
                          Object.keys(wireTypes[initialWireType].areas).map(size => (
                            <option key={size} value={size}>
                              {size.includes('/') ? size : `#${size}`}
                            </option>
                          )) : 
                          <option value="12">#12</option>
                        }
                      </select>
                    )}

                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={initialWireQuantity}
                      onChange={(e) => setInitialWireQuantity(parseInt(e.target.value) || 1)}
                      disabled={!initialWireType}
                      className="w-14 px-2 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100"
                      placeholder="Qty"
                    />

                    <select
                      value={initialWireRole}
                      onChange={(e) => setInitialWireRole(e.target.value)}
                      disabled={!initialWireType}
                      className="w-20 px-2 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100"
                    >
                      <option value="phase">Phase</option>
                      <option value="neutral">Neutral</option>
                      <option value="ground">Ground</option>
                      <option value="spare">Spare</option>
                    </select>

                    <div className="px-3 py-2 bg-gray-100 rounded-lg flex items-center justify-center">
                      <X size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* Show actual wires */}
              {wires.map((wire) => {
                const availableSizes = Object.keys(wireTypes[wire.type]?.areas || {});
                return (
                  <div key={wire.id} className="flex gap-2 mb-2">
                    <select
                      value={wire.type}
                      onChange={(e) => {
                        const newType = e.target.value;
                        updateWire(wire.id, 'type', newType);
                        
                        if (newType === 'CUSTOM') {
                          // Initialize custom area when switching to custom wire
                          updateWire(wire.id, 'customArea', 0.01);
                        } else {
                          // Handle standard wire type size selection
                          const newAvailableSizes = Object.keys(wireTypes[newType].areas);
                          const newSize = newAvailableSizes.includes(wire.size) ? 
                            wire.size : newAvailableSizes[0];
                          if (newSize !== wire.size) {
                            updateWire(wire.id, 'size', newSize);
                          }
                        }
                      }}
                      className="flex-1 px-2 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      {[
                        ['CUSTOM', wireTypes.CUSTOM],
                        ...Object.entries(wireTypes).filter(([key]) => key !== 'CUSTOM')
                      ].map(([key, type]) => (
                        <option key={key} value={key}>
                          {type.label}
                        </option>
                      ))}
                    </select>

                    {wire.type === 'CUSTOM' ? (
                      <input
                        type="number"
                        min="0.0001"
                        max="10"
                        step="0.0001"
                        value={wire.customArea || ''}
                        onChange={(e) => updateWire(wire.id, 'customArea', parseFloat(e.target.value) || 0)}
                        placeholder="0.0123"
                        className="w-20 px-2 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-yellow-50 text-center"
                        title="Wire area in square inches"
                      />
                    ) : (
                      <select
                        value={wire.size}
                        onChange={(e) => updateWire(wire.id, 'size', e.target.value)}
                        className="w-20 px-2 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        {availableSizes.map(size => (
                          <option key={size} value={size}>
                            {size.includes('/') ? size : `#${size}`}
                          </option>
                        ))}
                      </select>
                    )}

                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={wire.quantity}
                      onChange={(e) => updateWire(wire.id, 'quantity', e.target.value)}
                      className="w-14 px-2 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="Qty"
                    />

                    <select
                      value={wire.role}
                      onChange={(e) => updateWire(wire.id, 'role', e.target.value)}
                      className="w-20 px-2 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="phase">Phase</option>
                      <option value="neutral">Neutral</option>
                      <option value="ground">Ground</option>
                      <option value="spare">Spare</option>
                    </select>

                    <button
                      onClick={() => removeWire(wire.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}

              <button
                onClick={addWire}
                disabled={wires.length === 0 && !initialWireType}
                className={`mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  wires.length === 0 && !initialWireType
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <Plus size={16} />
                {wires.length === 0 ? 'Add First Wire' : 'Add Wire'}
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-gray-800 mb-1">📋 NEC References</h4>
              <ul className="text-xs text-gray-700 space-y-0.5">
                <li>• Table 1: Fill percentages</li>
                <li>• Table 4: Conduit dimensions</li>
                <li>• Table 5: Wire areas</li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN - Results */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            {results ? (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Results</h2>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <Info className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-sm text-blue-900 mb-1">NEC Fill Rule</h3>
                      <p className="text-xs text-blue-800">
                        {results.totalWireCount} conductor{results.totalWireCount !== 1 ? 's' : ''} = Max {(results.fillPercent * 100).toFixed(0)}% fill
                      </p>
                      <p className="text-xs text-blue-700 mt-0.5">{results.fillRule}</p>
                    </div>
                  </div>
                </div>

                {results.mixedInsulation && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="text-yellow-600 mt-0.5 flex-shrink-0" size={18} />
                      <div>
                        <h3 className="font-semibold text-sm text-yellow-900 mb-1">Mixed Insulation Types</h3>
                        <p className="text-xs text-yellow-800">
                          Different wire types detected. Allowed by NEC, but may complicate installation and pulling.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <h3 className="text-sm font-semibold mb-2">Wire Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-2 py-1 text-left">Type</th>
                          <th className="px-2 py-1 text-left">Size</th>
                          <th className="px-2 py-1 text-left">Role</th>
                          <th className="px-2 py-1 text-right">Qty</th>
                          <th className="px-2 py-1 text-right">Area (in²)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.wireBreakdown.map((wire, i) => (
                          <tr key={i} className={`border-t ${wire.role === 'ground' ? 'bg-green-50' : ''}`}>
                            <td className={`px-2 py-1 ${wire.role === 'ground' ? 'text-green-700 font-medium' : ''}`}>
                              {wire.role === 'ground' ? '⚡ ' : ''}{wire.wireLabel}
                            </td>
                            <td className="px-2 py-1">
                              {wire.type === 'CUSTOM' 
                                ? (
                                  <span>
                                    <span className="text-orange-600">🔧</span> Custom ({wire.areaEach.toFixed(4)}in²)
                                  </span>
                                ) 
                                : wire.size.includes('/') ? wire.size : `#${wire.size}`}
                            </td>
                            <td className="px-2 py-1 capitalize text-gray-600">
                              {wire.role === 'ground' ? 'EGC' : wire.role}
                            </td>
                            <td className="px-2 py-1 text-right">{wire.quantity}</td>
                            <td className="px-2 py-1 text-right font-semibold">
                              {wire.areaTotal.toFixed(4)}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
                          <td colSpan="4" className="px-2 py-1 text-right">Total:</td>
                          <td className="px-2 py-1 text-right">{results.totalWireArea.toFixed(4)} in²</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {results.mode === 'findConduit' ? (
                  <div>
                    {results.minSize ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-2 mb-3">
                          <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                          <div>
                            <h3 className="text-lg font-bold text-green-900">
                              {results.minSize}" {results.conduitType}
                            </h3>
                            <p className="text-xs text-green-800">
                              Minimum conduit size required
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="bg-white p-2 rounded">
                            <div className="text-xs text-gray-700 font-medium">Total Area</div>
                            <div className="text-sm font-bold">
                              {results.minSizeData.total.toFixed(3)} in²
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <div className="text-xs text-gray-700 font-medium">Allowable</div>
                            <div className="text-sm font-bold">
                              {results.minSizeData.allowableFill.toFixed(3)} in²
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <div className="text-xs text-gray-700 font-medium">Wire Area</div>
                            <div className="text-sm font-bold">
                              {results.minSizeData.actualFill.toFixed(3)} in²
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <div className="text-xs text-gray-700 font-medium">Fill %</div>
                            <div className="text-sm font-bold text-green-600">
                              {results.minSizeData.fillPercentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-800 font-medium mb-1">Fill Visualization:</div>
                          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div
                              className={`h-full ${getFillColor(results.minSizeData.fillPercentage)} transition-all duration-500 flex items-center justify-center text-white font-semibold text-xs`}
                              style={{ width: `${results.minSizeData.fillPercentage}%` }}
                            >
                              {results.minSizeData.fillPercentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
                          <div>
                            <h3 className="text-lg font-bold text-red-900 mb-1">
                              No Suitable Conduit
                            </h3>
                            <p className="text-xs text-red-800">
                              Too many wires for largest {results.conduitType} conduit. Reduce wires or use different type.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className={`${results.compliant ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-4`}>
                      <div className="flex items-start gap-2 mb-3">
                        {results.compliant ? (
                          <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                        ) : (
                          <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
                        )}
                        <div>
                          <h3 className={`text-lg font-bold mb-1 ${results.compliant ? 'text-green-900' : 'text-red-900'}`}>
                            {results.compliant ? 'Code Compliant ✓' : 'NOT Compliant ✗'}
                          </h3>
                          <p className={`text-xs ${results.compliant ? 'text-green-800' : 'text-red-800'}`}>
                            {results.selectedConduit.size}" {results.selectedConduit.type}
                            {results.compliant ? ' works!' : ' too small'}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-white p-2 rounded">
                          <div className="text-xs text-gray-700 font-medium">Total Area</div>
                          <div className="text-sm font-bold">
                            {results.conduitData.total.toFixed(3)} in²
                          </div>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <div className="text-xs text-gray-700 font-medium">Allowable</div>
                          <div className="text-sm font-bold">
                            {results.allowableFill.toFixed(3)} in²
                          </div>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <div className="text-xs text-gray-700 font-medium">Wire Area</div>
                          <div className="text-sm font-bold">
                            {results.totalWireArea.toFixed(3)} in²
                          </div>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <div className="text-xs text-gray-700 font-medium">Fill %</div>
                          <div className={`text-sm font-bold ${results.compliant ? 'text-green-600' : 'text-red-600'}`}>
                            {results.actualFillPercent.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-800 font-medium mb-1">Fill Visualization:</div>
                        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative">
                          <div
                            className={`h-full ${getFillColor(results.actualFillPercent)} transition-all duration-500 flex items-center justify-center text-white font-semibold text-xs`}
                            style={{ width: `${Math.min(results.actualFillPercent, 100)}%` }}
                          >
                            {results.actualFillPercent.toFixed(1)}%
                          </div>
                          <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-black opacity-50"
                            style={{ left: `${results.fillPercent * 100}%` }}
                          >
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap bg-black text-white px-1.5 py-0.5 rounded">
                              Max
                            </div>
                          </div>
                        </div>
                      </div>

                      {!results.compliant && (
                        <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-2">
                          <p className="text-xs text-yellow-800">
                            <strong>Tip:</strong> Use larger conduit or fewer wires
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Clear Actions - Bottom of Results */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={clearAllWires}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
                    >
                      <Trash2 size={16} />
                      Clear Wires
                    </button>
                    <button
                      onClick={resetAll}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-50 text-red-700 text-sm rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                    >
                      <RotateCcw size={16} />
                      Reset All
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-center">
                    Clear wires only or reset everything to start over
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-600">
                <div className="text-center">
                  <Info size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold">Add wires to see results</p>
                  <p className="text-xs mt-1">Click "Add Wire" or use a preset</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-800 bg-white rounded-lg shadow-lg p-3">
          <p>⚠️ Reference only. Consult a licensed electrician and verify with local code.</p>
        </div>
      </div>
    </div>
  );
};

export default ConduitFillCalculator;
