import React, { useState, useEffect } from 'react';
import { Plus, X, AlertCircle, CheckCircle, Info, Trash2, RotateCcw, Minus, ChevronDown, ChevronUp, Sparkle } from 'lucide-react';
import { wireTypes, conduitTypes, getConduitsByCategory, getFillRule, wirePresets } from './utils/nec/index.js';
import { WireIcon, ConduitIcon, IconWithTooltip } from './components/Icons.js';
import PresetsModal from './components/PresetsModal.js';

// Get available conduit types grouped by category
const metalConduits = Object.keys(getConduitsByCategory('Metal Conduits'));
const nonmetallicConduits = Object.keys(getConduitsByCategory('Nonmetallic Conduits'));
const flexibleConduits = Object.keys(getConduitsByCategory('Flexible Conduits'));

const ConduitFillCalculator = () => {
  const [mode, setMode] = useState('findConduit');
  
  // NEW STATE STRUCTURE - Two separate arrays instead of one mixed array
  const [presetInstances, setPresetInstances] = useState([]);
  const [individualWires, setIndividualWires] = useState([]);
  
  const [selectedConduitCategory, setSelectedConduitCategory] = useState('Metal');
  
  const [selectedConduit, setSelectedConduit] = useState({
    type: 'EMT',
    size: '3/4'
  });
  const [results, setResults] = useState(null);
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  
  // Initial wire form state (only used when no wires exist)
  const [initialWireType, setInitialWireType] = useState('');
  const [initialWireSize, setInitialWireSize] = useState('12');
  const [initialWireQuantity, setInitialWireQuantity] = useState(1);
  const [initialWireRole, setInitialWireRole] = useState('phase');
  
  // Footer expansion state
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);

  // Update presets from modal - replaces all preset instances
  const handleUpdatePresets = (selectedPresets) => {
    const newInstances = Object.entries(selectedPresets).map(([presetKey, { quantity }]) => ({
      id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      presetKey,
      quantity
    }));
    setPresetInstances(newInstances);
  };

  // Update preset instance quantity
  const updatePresetQuantity = (instanceId, quantity) => {
    if (quantity < 1) return;
    setPresetInstances(prev =>
      prev.map(instance =>
        instance.id === instanceId ? { ...instance, quantity } : instance
      )
    );
  };

  // Remove preset instance
  const removePresetInstance = (instanceId) => {
    setPresetInstances(prev => prev.filter(instance => instance.id !== instanceId));
  };

  // Add individual wire from initial form
  const addWireFromForm = () => {
    if (!initialWireType) return;

    const newWire = { 
      id: `wire-${Date.now()}`,
      type: initialWireType, 
      size: initialWireType === 'CUSTOM' ? 'custom' : initialWireSize,
      quantity: initialWireQuantity,
      role: initialWireRole
    };
    
    if (initialWireType === 'CUSTOM') {
      newWire.customArea = parseFloat(initialWireSize) || 0.01;
    }
    
    setIndividualWires(prev => [...prev, newWire]);
    
    // Reset form
    setInitialWireType('');
    setInitialWireSize('12');
    setInitialWireQuantity(1);
    setInitialWireRole('phase');
  };

  // Add empty individual wire
  const addIndividualWire = () => {
    setIndividualWires(prev => [...prev, { 
      id: `wire-${Date.now()}`,
      type: '', 
      size: '12', 
      quantity: 1,
      role: 'phase'
    }]);
  };

  // Update individual wire
  const updateIndividualWire = (wireId, field, value) => {
    setIndividualWires(prev =>
      prev.map(wire =>
        wire.id === wireId ? { ...wire, [field]: value } : wire
      )
    );
  };

  // Remove individual wire
  const removeIndividualWire = (wireId) => {
    setIndividualWires(prev => prev.filter(wire => wire.id !== wireId));
  };

  // Expand all wires for calculation
  const getAllWires = () => {
    const allWires = [];

    // Expand preset instances into individual wires
    presetInstances.forEach(instance => {
      const preset = wirePresets[instance.presetKey];
      if (!preset) return;

      // Create wires for each circuit in this instance
      for (let circuitNum = 0; circuitNum < instance.quantity; circuitNum++) {
        preset.wires.forEach((wire, wireIdx) => {
          allWires.push({
            ...wire,
            id: `${instance.id}-circuit${circuitNum}-wire${wireIdx}`,
            presetInstanceId: instance.id,
            presetKey: instance.presetKey,
            presetName: preset.name,
            circuitNumber: circuitNum + 1
          });
        });
      }
    });

    // Add individual wires
    individualWires.forEach(wire => {
      allWires.push(wire);
    });

    return allWires;
  };

  // Check if any individual wires are incomplete
  const hasIncompleteWires = individualWires.some(wire => wire.type === '');
  const hasAnyWires = individualWires.length > 0;

  const clearAllWires = () => {
    setPresetInstances([]);
    setIndividualWires([]);
    setResults(null);
  };

  const resetAll = () => {
    setPresetInstances([]);
    setIndividualWires([]);
    setSelectedConduit({ type: 'EMT', size: '3/4' });
    setMode('findConduit');
    setResults(null);
  };

  const calculateFill = () => {
    const allWires = getAllWires();
    
    if (allWires.length === 0) {
      setResults(null);
      return;
    }

    let totalWireArea = 0;
    const wireBreakdown = [];

    // Only process complete wires
    const completeWires = allWires.filter(wire => wire.type && wire.type !== '');
    
    if (completeWires.length === 0) {
      return;
    }

    completeWires.forEach(wire => {
      const wireType = wireTypes[wire.type];
      
      // Get area - either from custom area or standard lookup
      let area;
      if (wire.type === 'CUSTOM') {
        area = wire.customArea || 0;
        if (area <= 0 || area > 10) {
          return; // Skip invalid custom wires
        }
      } else {
        area = wireType?.areas[wire.size];
        if (!area || !wireType) {
          return; // Skip invalid wires
        }
      }
      
      const quantity = parseInt(wire.quantity);
      if (isNaN(quantity) || quantity < 1) {
        return; // Skip invalid quantities
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

    if (wireBreakdown.length === 0) {
      return;
    }

    const totalWireCount = completeWires.reduce((sum, w) => sum + parseInt(w.quantity), 0);
    
    // Determine fill rule
    const fillRule = getFillRule(totalWireCount);

    // Check for mixed insulation
    const insulationSet = new Set(completeWires.map(w => w.type));
    const mixedInsulation = insulationSet.size > 1;

    if (mode === 'findConduit') {
      const conduitType = selectedConduit.type;
      const conduitInfo = conduitTypes[conduitType];
      const sizes = Object.keys(conduitInfo?.sizes || {});
      
      let minSize = null;
      let minSizeData = null;

      for (const size of sizes) {
        const conduitData = conduitInfo.sizes[size];
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
        wireBreakdown: wireBreakdown,
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
        wireBreakdown: wireBreakdown,
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
  }, [presetInstances, individualWires, mode, selectedConduit]);

  const getFillColor = (percentage) => {
    if (percentage <= 40) return 'bg-emerald-500';
    if (percentage <= 50) return 'bg-blue-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-100 via-slate-50 to-gray-100">
      <div className="mx-auto max-w-7xl">
        {/* Main Header with SEO-rich content */}
        <header className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-slate-800">
            NEC Conduit Fill Calculator - Electrical Wire Sizing Tool
          </h1>
          <p className="text-sm text-gray-600">
            Calculate electrical conduit fill percentages and conduit sizing based on NEC Chapter 9, Tables 1, 4 & 5
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Professional tool for electricians to determine proper conduit sizing for EMT, PVC, Rigid, IMC, and Flexible conduit types
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 text-gray-800 lg:grid-cols-2 lg:items-start">
          {/* LEFT COLUMN - Form */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMode('findConduit')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'findConduit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
                }`}
              >
                Find Min Size
              </button>
              <button
                onClick={() => setMode('checkFit')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'checkFit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
                }`}
              >
                Check Fit
              </button>
            </div>

<div className="mb-4">
  <h2 className="mb-2 text-lg font-semibold text-slate-800">Conduit Type</h2>
  
  {/* Tabbed Conduit Type Selection */}
  <div className="mb-3">
    <div className="flex border-b border-gray-200">
      <button 
        className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
          selectedConduitCategory === 'Metal' 
            ? 'border-b-2 border-blue-600 text-blue-600' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => setSelectedConduitCategory('Metal')}
      >
        <Sparkle size={16} />
        Metal
      </button>
      <button 
        className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
          selectedConduitCategory === 'Nonmetallic' 
            ? 'border-b-2 border-blue-600 text-blue-600' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => setSelectedConduitCategory('Nonmetallic')}
      >
        <Sparkle size={16} />
        Nonmetallic
      </button>
      <button 
        className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
          selectedConduitCategory === 'Flexible' 
            ? 'border-b-2 border-blue-600 text-blue-600' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => setSelectedConduitCategory('Flexible')}
      >
        <Sparkle size={16} />
        Flexible
      </button>
    </div>

    {/* Conduit Type Grid */}
    <div className="grid grid-cols-3 gap-1 mt-3">
      {(selectedConduitCategory === 'Metal' ? metalConduits : 
        selectedConduitCategory === 'Nonmetallic' ? nonmetallicConduits : 
        flexibleConduits).map(type => (
        <IconWithTooltip
          key={type}
          tooltip={conduitTypes[type]?.description || type}
        >
          <button
            onClick={() => setSelectedConduit({ ...selectedConduit, type })}
            className={`py-1.5 px-2 rounded text-xs font-medium transition-colors flex items-center gap-1 border-2 ${
              selectedConduit.type === type
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
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

              {/* Show conduit info for selected type */}
              {selectedConduit.type && conduitTypes[selectedConduit.type] && (
                <div className="p-2 mt-2 border border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-xs">
                    <div className="font-medium text-slate-800">
                      {conduitTypes[selectedConduit.type].name}
                    </div>
                    <div className="text-gray-600 mt-0.5">
                      {conduitTypes[selectedConduit.type].description}
                    </div>
                    <div className="mt-1 text-xs text-blue-600">
                      {conduitTypes[selectedConduit.type].article}
                    </div>
                  </div>
                </div>
              )}

              {mode === 'checkFit' && (
                <div className="mt-3">
                  <label className="block mb-1 text-sm font-medium text-slate-800">
                    Conduit Size
                  </label>
                  <select
                    value={selectedConduit.size}
                    onChange={(e) => setSelectedConduit({ ...selectedConduit, size: e.target.value })}
                    className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <h2 className="text-lg font-semibold text-slate-800">Wires</h2>
                <button
                  onClick={() => setShowPresetsModal(true)}
                  className="flex items-center gap-1 px-3 py-2 text-xs text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Plus size={14} />
                  {presetInstances.length > 0 ? 'Manage Presets' : 'Browse Presets'}
                </button>
              </div>
              
              

              {/* Preset Instances */}
              {presetInstances.map((instance) => {
                const preset = wirePresets[instance.presetKey];
                if (!preset) return null;

                return (
                  <div key={instance.id} className="p-3 mb-4 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-blue-800">
                          📋 {preset.name}
                        </span>
                      </div>
                      <button
                        onClick={() => removePresetInstance(instance.id)}
                        className="p-1 text-red-600 rounded hover:bg-red-100"
                        title="Remove entire preset"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Quantity control */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-blue-700">Circuits:</span>
                      <button
                        onClick={() => updatePresetQuantity(instance.id, instance.quantity - 1)}
                        disabled={instance.quantity <= 1}
                        className="p-1 bg-white rounded hover:bg-blue-100 disabled:opacity-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold text-blue-900 min-w-[2rem] text-center">
                        {instance.quantity}
                      </span>
                      <button
                        onClick={() => updatePresetQuantity(instance.id, instance.quantity + 1)}
                        className="p-1 bg-white rounded hover:bg-blue-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Show wires for each circuit */}
                    {[...Array(instance.quantity)].map((_, circuitIdx) => (
                      <div key={circuitIdx}>
                        {circuitIdx > 0 && <hr className="my-2 border-blue-300" />}
                        <div className="mb-1 text-xs text-blue-600">Circuit {circuitIdx + 1}:</div>
                        {preset.wires.map((wire, wireIdx) => (
                          <div key={wireIdx} className="flex justify-between mb-1 ml-2 text-xs text-gray-700">
                            <span>
                              {wire.quantity}× {wireTypes[wire.type]?.label || wire.type} #{wire.size}
                            </span>
                            <span className={`capitalize ${
                              wire.role === 'ground' ? 'text-emerald-600' : 
                              wire.role === 'phase' ? 'text-blue-600' : 
                              'text-gray-600'
                            }`}>
                              {wire.role === 'ground' ? 'EGC' : wire.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Show initial wire form when no wires exist */}
              {!hasAnyWires && (
                <div className="p-3 mb-3 bg-white border rounded-lg">
                  <p className="mb-2 text-xs text-blue-800">Configure your first wire:</p>
                  <div className="flex gap-2">
                    <select
                      value={initialWireType}
                      onChange={(e) => {
                        setInitialWireType(e.target.value);
                        if (e.target.value) {
                          const availableSizes = Object.keys(wireTypes[e.target.value].areas);
                          if (!availableSizes.includes(initialWireSize)) {
                            setInitialWireSize(availableSizes[0]);
                          }
                        }
                      }}
                      className={`flex-1 px-2 py-2 text-xs rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all ${
                        initialWireType 
                          ? 'border border-gray-300 bg-white text-gray-800' 
                          : 'border-2 shadow-sm animate-pulse'
                      }`}
                      style={!initialWireType ? {
                        borderColor: '#f59e0b',
                        backgroundColor: '#fffbeb',
                        color: '#92400e'
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
                        className="w-20 px-2 py-2 text-xs text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-yellow-50 text-amber-900"
                        title="Wire area in square inches"
                      />
                    ) : (
                      <select
                        value={initialWireSize}
                        onChange={(e) => setInitialWireSize(e.target.value)}
                        disabled={!initialWireType}
                        className="w-20 px-2 py-2 text-xs text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100 disabled:text-gray-400"
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
                      className="px-2 py-2 text-xs text-gray-800 bg-white border border-gray-300 rounded-lg w-14 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100 disabled:text-gray-400"
                      placeholder="Qty"
                    />

                    <select
                      value={initialWireRole}
                      onChange={(e) => setInitialWireRole(e.target.value)}
                      disabled={!initialWireType}
                      className="w-20 px-2 py-2 text-xs text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      <option value="phase">Phase</option>
                      <option value="neutral">Neutral</option>
                      <option value="ground">Ground</option>
                      <option value="spare">Spare</option>
                    </select>

                    <button
                      onClick={addWireFromForm}
                      disabled={!initialWireType}
                      className="px-3 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Individual Wires */}
              {individualWires.length > 0 && (
                <div className="mb-4">
                  {presetInstances.length > 0 && (
                    <div className="mb-2 text-xs font-medium text-gray-600">Individual Wires:</div>
                  )}
                  {individualWires.map((wire) => {
                    const availableSizes = Object.keys(wireTypes[wire.type]?.areas || {});
                    return (
                      <div key={wire.id} className="flex gap-2 mb-2">
                        <select
                          value={wire.type}
                          onChange={(e) => {
                            const newType = e.target.value;
                            updateIndividualWire(wire.id, 'type', newType);
                            
                            if (newType === 'CUSTOM') {
                              updateIndividualWire(wire.id, 'customArea', 0.01);
                            } else if (newType !== '') {
                              const newAvailableSizes = Object.keys(wireTypes[newType].areas);
                              const newSize = newAvailableSizes.includes(wire.size) ? 
                                wire.size : newAvailableSizes[0];
                              if (newSize !== wire.size) {
                                updateIndividualWire(wire.id, 'size', newSize);
                              }
                            }
                          }}
                          className={`flex-1 px-2 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            wire.type === '' 
                              ? 'border-red-300 bg-red-50 text-red-700' 
                              : 'border-gray-300 bg-white text-gray-800'
                          }`}
                        >
                          <option value="">→ Select wire type</option>
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
                            onChange={(e) => updateIndividualWire(wire.id, 'customArea', parseFloat(e.target.value) || 0)}
                            placeholder="0.0123"
                            className="w-20 px-2 py-2 text-xs text-center text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-yellow-50"
                            title="Wire area in square inches"
                          />
                        ) : (
                          <select
                            value={wire.size}
                            onChange={(e) => updateIndividualWire(wire.id, 'size', e.target.value)}
                            className="w-20 px-2 py-2 text-xs text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                          onChange={(e) => updateIndividualWire(wire.id, 'quantity', e.target.value)}
                          className="px-2 py-2 text-xs text-gray-800 bg-white border border-gray-300 rounded-lg w-14 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Qty"
                        />

                        <select
                          value={wire.role}
                          onChange={(e) => updateIndividualWire(wire.id, 'role', e.target.value)}
                          className="w-20 px-2 py-2 text-xs text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="phase">Phase</option>
                          <option value="neutral">Neutral</option>
                          <option value="ground">Ground</option>
                          <option value="spare">Spare</option>
                        </select>

                        <button
                          onClick={() => removeIndividualWire(wire.id)}
                          className="px-3 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={addIndividualWire}
                disabled={hasIncompleteWires || individualWires.length === 0}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  hasIncompleteWires || individualWires.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500'
                }`}
              >
                <Plus size={16} />
                {hasIncompleteWires ? 'Select Wire Type First' : 
                individualWires.length === 0 ? 'Add First Wire Above' : 
                'Add Individual Wire'}
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <article className="bg-white border border-gray-200 rounded-lg shadow">
                {/* Toggle Button */}
                <button
                  onClick={() => setIsFooterExpanded(!isFooterExpanded)}
                  className="flex items-center justify-between w-full p-4 text-left"
                  aria-expanded={isFooterExpanded}
                  aria-controls="seo-footer-content"
                >
                  <h2 className="text-xl font-bold text-slate-800">
                    Electrical Conduit Fill Calculator
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Details
                    </span>
                    {isFooterExpanded ? (
                      <ChevronUp className="text-gray-600" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-600" size={20} />
                    )}
                  </div>
                </button>
                
                {/* Collapsible Content */}
                <div
                  id="seo-footer-content"
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isFooterExpanded 
                      ? 'max-h-[2000px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!isFooterExpanded}
                >
                  <div className="p-6 pt-0 space-y-4 text-sm text-gray-700">
                  <section>
                    <h3 className="mb-2 font-semibold text-slate-800">What is NEC Conduit Fill?</h3>
                    <p className="leading-relaxed">
                      NEC conduit fill refers to the maximum amount of electrical wire or cable that can be safely installed 
                      within a conduit according to the National Electrical Code (NEC). Proper conduit fill calculations ensure 
                      safe electrical installations by preventing overheating and allowing for proper wire pulling during installation.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="mb-2 font-semibold text-slate-800">How Does This Calculator Work?</h3>
                    <p className="leading-relaxed">
                      This free online tool calculates conduit fill based on NEC Chapter 9 specifications. It uses Table 1 
                      (percentage fill), Table 4 (conduit and tubing dimensions), and Table 5 (wire dimensions) to determine 
                      whether your wire configuration fits within a specific conduit size or to find the minimum conduit size needed.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="mb-2 font-semibold text-slate-800">Supported Conduit Types</h3>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      <div>
                        <p className="font-medium text-blue-700">Metal Conduits:</p>
                        <ul className="ml-4 text-xs list-disc">
                          <li>EMT (Electrical Metallic Tubing)</li>
                          <li>RMC (Rigid Metal Conduit)</li>
                          <li>IMC (Intermediate Metal Conduit)</li>
                          <li>FMC (Flexible Metal Conduit)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-blue-700">Nonmetallic Conduits:</p>
                        <ul className="ml-4 text-xs list-disc">
                          <li>PVC Schedule 40 & 80</li>
                          <li>ENT (Electrical Nonmetallic Tubing)</li>
                          <li>LFMC (Liquidtight Flexible)</li>
                          <li>LFNC (Liquidtight Flexible Nonmetallic)</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="mb-2 font-semibold text-slate-800">Understanding NEC Fill Percentages</h3>
                    <p className="leading-relaxed">
                      According to NEC Table 1, the maximum conduit fill depends on the number of conductors:
                    </p>
                    <ul className="mt-2 ml-4 space-y-1 list-disc">
                      <li><strong>1 conductor:</strong> 53% maximum fill</li>
                      <li><strong>2 conductors:</strong> 31% maximum fill</li>
                      <li><strong>3 or more conductors:</strong> 40% maximum fill</li>
                    </ul>
                    <p className="mt-2 leading-relaxed">
                      These percentages ensure adequate space for heat dissipation and ease of wire installation.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="mb-2 font-semibold text-slate-800">Who Should Use This Tool?</h3>
                    <p className="leading-relaxed">
                      This electrical conduit fill calculator is designed for:
                    </p>
                    <ul className="mt-2 ml-4 space-y-1 list-disc">
                      <li>Licensed electricians planning installations</li>
                      <li>Electrical engineers designing electrical systems</li>
                      <li>Electrical contractors estimating materials</li>
                      <li>Building inspectors verifying code compliance</li>
                      <li>Electrical apprentices and students learning NEC requirements</li>
                    </ul>
                  </section>
                  
                  <section className="p-3 border border-yellow-300 rounded-lg bg-yellow-50">
                    <h3 className="mb-2 font-semibold text-yellow-900">⚠️ Important Disclaimer</h3>
                    <p className="text-xs leading-relaxed text-yellow-800">
                      This calculator is provided as a reference tool only. Always verify calculations with current NEC code books, 
                      consult with a licensed electrician, and comply with local electrical codes and regulations. The creators of 
                      this tool assume no liability for any installations based on these calculations.
                    </p>
                  </section>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* RIGHT COLUMN - Results */}
          <div className="lg:sticky lg:top-4 p-4 bg-white border border-gray-200 rounded-lg shadow lg:self-start lg:max-h-[calc(100vh-2rem)] flex flex-col">
            {results ? (
              <div className="flex flex-col h-full overflow-hidden">
                <h2 className="flex-shrink-0 mb-3 text-xl font-bold text-slate-800">Results</h2>

                <div className="flex-shrink-0 p-3 mb-3 border rounded-lg bg-blue-50">
                  <div className="flex items-start gap-2">
                    <Info className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="mb-1 text-sm font-semibold text-blue-900">NEC Fill Rule</h3>
                      <p className="text-xs text-blue-800">
                        {results.totalWireCount} conductor{results.totalWireCount !== 1 ? 's' : ''} = Max {(results.fillPercent * 100).toFixed(0)}% fill
                      </p>
                      <p className="text-xs text-blue-700 mt-0.5">{results.fillRule}</p>
                    </div>
                  </div>
                </div>

                {results.mode === 'findConduit' ? (
                  <div className="flex-shrink-0">
                    {results.minSize ? (
                      <div className="p-4 border rounded-lg bg-emerald-50 border-emerald-300">
                        <div className="flex items-start gap-2 mb-3">
                          <CheckCircle className="flex-shrink-0 text-emerald-600" size={24} />
                          <div>
                            <h3 className="text-lg font-bold text-emerald-900">
                              {results.minSize}" {results.conduitType}
                            </h3>
                            <p className="text-xs text-emerald-700">
                              Minimum conduit size required
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="p-2 bg-white border border-gray-200 rounded">
                            <div className="text-xs font-medium text-gray-700">Total Area</div>
                            <div className="text-sm font-bold text-gray-900">
                              {results.minSizeData.total.toFixed(3)} in²
                            </div>
                          </div>
                          <div className="p-2 bg-white border border-gray-200 rounded">
                            <div className="text-xs font-medium text-gray-700">Allowable</div>
                            <div className="text-sm font-bold text-gray-900">
                              {results.minSizeData.allowableFill.toFixed(3)} in²
                            </div>
                          </div>
                          <div className="p-2 bg-white border border-gray-200 rounded">
                            <div className="text-xs font-medium text-gray-700">Wire Area</div>
                            <div className="text-sm font-bold text-gray-900">
                              {results.minSizeData.actualFill.toFixed(3)} in²
                            </div>
                          </div>
                          <div className="p-2 bg-white border border-gray-200 rounded">
                            <div className="text-xs font-medium text-gray-700">Fill %</div>
                            <div className="text-sm font-bold text-emerald-600">
                              {results.minSizeData.fillPercentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="mb-1 text-xs font-medium text-gray-800">Fill Visualization:</div>
                          <div className="w-full h-6 overflow-hidden bg-gray-200 rounded-full">
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
                      <div className="p-4 border border-red-300 rounded-lg bg-red-50">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="flex-shrink-0 text-red-600" size={24} />
                          <div>
                            <h3 className="mb-1 text-lg font-bold text-red-900">
                              No Suitable Conduit
                            </h3>
                            <p className="text-xs text-red-700">
                              Too many wires for largest {results.conduitType} conduit. Reduce wires or use different type.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-shrink-0">
                    <div className={`${results.compliant ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'} border rounded-lg p-4`}>
                      <div className="flex items-start gap-2 mb-3">
                        {results.compliant ? (
                          <CheckCircle className="flex-shrink-0 text-emerald-600" size={24} />
                        ) : (
                          <AlertCircle className="flex-shrink-0 text-red-600" size={24} />
                        )}
                        <div>
                          <h3 className={`text-lg font-bold mb-1 ${results.compliant ? 'text-emerald-900' : 'text-red-900'}`}>
                            {results.compliant ? 'Code Compliant ✓' : 'NOT Compliant ✗'}
                          </h3>
                          <p className={`text-xs ${results.compliant ? 'text-emerald-700' : 'text-red-700'}`}>
                            {results.selectedConduit.size}" {results.selectedConduit.type}
                            {results.compliant ? ' works!' : ' too small'}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="p-2 bg-white border border-gray-200 rounded">
                          <div className="text-xs font-medium text-gray-700">Total Area</div>
                          <div className="text-sm font-bold text-gray-900">
                            {results.conduitData.total.toFixed(3)} in²
                          </div>
                        </div>
                        <div className="p-2 bg-white border border-gray-200 rounded">
                          <div className="text-xs font-medium text-gray-700">Allowable</div>
                          <div className="text-sm font-bold text-gray-900">
                            {results.allowableFill.toFixed(3)} in²
                          </div>
                        </div>
                        <div className="p-2 bg-white border border-gray-200 rounded">
                          <div className="text-xs font-medium text-gray-700">Wire Area</div>
                          <div className="text-sm font-bold text-gray-900">
                            {results.totalWireArea.toFixed(3)} in²
                          </div>
                        </div>
                        <div className="p-2 bg-white border border-gray-200 rounded">
                          <div className="text-xs font-medium text-gray-700">Fill %</div>
                          <div className={`text-sm font-bold ${results.compliant ? 'text-emerald-600' : 'text-red-600'}`}>
                            {results.actualFillPercent.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 text-xs font-medium text-gray-800">Fill Visualization:</div>
                        <div className="relative w-full h-6 overflow-hidden bg-gray-200 rounded-full">
                          <div
                            className={`h-full ${getFillColor(results.actualFillPercent)} transition-all duration-500 flex items-center justify-center text-white font-semibold text-xs`}
                            style={{ width: `${Math.min(results.actualFillPercent, 100)}%` }}
                          >
                            {results.actualFillPercent.toFixed(1)}%
                          </div>
                          <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-gray-800 opacity-50"
                            style={{ left: `${results.fillPercent * 100}%` }}
                          >
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap bg-gray-800 text-white px-1.5 py-0.5 rounded">
                              Max
                            </div>
                          </div>
                        </div>
                      </div>

                      {!results.compliant && (
                        <div className="p-2 mt-3 border border-yellow-300 rounded bg-yellow-50">
                          <p className="text-xs text-yellow-800">
                            <strong>Tip:</strong> Use larger conduit or fewer wires
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Clear Actions */}
                <div className="flex-shrink-0 pt-3 mt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={clearAllWires}
                      className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm text-gray-100 transition-colors rounded-lg bg-slate-600 hover:bg-slate-500"
                    >
                      <Trash2 size={16} />
                      Clear Wires
                    </button>
                    <button
                      onClick={resetAll}
                      className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-500"
                    >
                      <RotateCcw size={16} />
                      Reset All
                    </button>
                  </div>
                  <p className="my-1 text-xs text-center text-gray-600">
                    Clear wires only or reset everything to start over
                  </p>
                </div>

                {results.mixedInsulation && (
                  <div className="flex-shrink-0 p-3 mb-3 border border-yellow-300 rounded-lg bg-yellow-50">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="text-yellow-600 mt-0.5 flex-shrink-0" size={18} />
                      <div>
                        <h3 className="mb-1 text-sm font-semibold text-yellow-900">Mixed Insulation Types</h3>
                        <p className="text-xs text-yellow-800">
                          Different wire types detected. Allowed by NEC, but may complicate installation and pulling.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex-1 min-h-0 mb-3 overflow-y-auto">
                  <h3 className="sticky top-0 z-10 pb-1 mb-2 text-sm font-semibold bg-white text-slate-800">Wire Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-2 py-1 text-left text-gray-700">Type</th>
                          <th className="px-2 py-1 text-left text-gray-700">Size</th>
                          <th className="px-2 py-1 text-left text-gray-700">Role</th>
                          <th className="px-2 py-1 text-right text-gray-700">Qty</th>
                          <th className="px-2 py-1 text-right text-gray-700">Area (in²)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const rows = [];
                          const presetGroups = {};
                          const individualWires = [];
                          
                          results.wireBreakdown.forEach(wire => {
                            if (wire.presetInstanceId) {
                              const key = `${wire.presetInstanceId}-${wire.circuitNumber}`;
                              if (!presetGroups[key]) {
                                presetGroups[key] = {
                                  presetName: wire.presetName,
                                  circuitNumber: wire.circuitNumber,
                                  wires: [],
                                  totalArea: 0
                                };
                              }
                              presetGroups[key].wires.push(wire);
                              presetGroups[key].totalArea += wire.areaTotal;
                            } else {
                              individualWires.push(wire);
                            }
                          });

                          // Add preset groups
                          Object.values(presetGroups).forEach((group) => {
                            rows.push(
                              <tr key={`header-${group.presetName}-${group.circuitNumber}`} className="bg-blue-100 border-t-2 border-blue-300">
                                <td colSpan="4" className="px-2 py-1 text-xs font-semibold text-blue-800">
                                  📋 {group.presetName} - Circuit {group.circuitNumber}
                                </td>
                                <td className="px-2 py-1 text-xs font-semibold text-right text-blue-800">
                                  {group.totalArea.toFixed(4)} in²
                                </td>
                              </tr>
                            );
                            
                            group.wires.forEach((wire, idx) => {
                              rows.push(
                                <tr key={`${group.presetName}-${group.circuitNumber}-${idx}`} 
                                    className={`border-t border-blue-200 bg-blue-50 ${wire.role === 'ground' ? 'bg-emerald-100' : ''}`}>
                                  <td className={`px-2 py-1 pl-4 ${wire.role === 'ground' ? 'text-emerald-700 font-medium' : 'text-gray-800'}`}>
                                    <span className="mr-1 text-blue-400">▸</span>
                                    {wire.role === 'ground' ? '⚡ ' : ''}{wire.wireLabel}
                                  </td>
                                  <td className="px-2 py-1 text-gray-800">
                                    {wire.type === 'CUSTOM' 
                                      ? <span><span className="text-blue-600">🔧</span> Custom ({wire.areaEach.toFixed(4)}in²)</span>
                                      : wire.size.includes('/') ? wire.size : `#${wire.size}`}
                                  </td>
                                  <td className="px-2 py-1 text-gray-600 capitalize">
                                    {wire.role === 'ground' ? 'EGC' : wire.role}
                                  </td>
                                  <td className="px-2 py-1 text-right text-gray-800">{wire.quantity}</td>
                                  <td className="px-2 py-1 font-semibold text-right text-blue-600">
                                    {wire.areaTotal.toFixed(4)}
                                  </td>
                                </tr>
                              );
                            });
                          });

                          // Add individual wires
                          if (Object.keys(presetGroups).length > 0 && individualWires.length > 0) {
                            const individualTotal = individualWires.reduce((sum, wire) => sum + wire.areaTotal, 0);
                            rows.push(
                              <tr key="individual-header" className="bg-gray-100 border-t-2 border-gray-300">
                                <td colSpan="4" className="px-2 py-1 text-xs font-semibold text-gray-700">
                                  Individual Wires
                                </td>
                                <td className="px-2 py-1 text-xs font-semibold text-right text-gray-700">
                                  {individualTotal.toFixed(4)} in²
                                </td>
                              </tr>
                            );
                          }
                          
                          individualWires.forEach((wire, i) => {
                            rows.push(
                              <tr key={`individual-${i}`} className={`border-t border-gray-200 ${wire.role === 'ground' ? 'bg-emerald-50' : ''}`}>
                                <td className={`px-2 py-1 ${Object.keys(presetGroups).length > 0 ? 'pl-4' : ''} ${wire.role === 'ground' ? 'text-emerald-700 font-medium' : 'text-gray-800'}`}>
                                  {Object.keys(presetGroups).length > 0 && <span className="mr-1 text-gray-400">▸</span>}
                                  {wire.role === 'ground' ? '⚡ ' : ''}{wire.wireLabel}
                                </td>
                                <td className="px-2 py-1 text-gray-800">
                                  {wire.type === 'CUSTOM' 
                                    ? <span><span className="text-blue-600">🔧</span> Custom ({wire.areaEach.toFixed(4)}in²)</span>
                                    : wire.size.includes('/') ? wire.size : `#${wire.size}`}
                                </td>
                                <td className="px-2 py-1 text-gray-600 capitalize">
                                  {wire.role === 'ground' ? 'EGC' : wire.role}
                                </td>
                                <td className="px-2 py-1 text-right text-gray-800">{wire.quantity}</td>
                                <td className="px-2 py-1 font-semibold text-right text-blue-600">
                                  {wire.areaTotal.toFixed(4)}
                                </td>
                              </tr>
                            );
                          });
                          
                          rows.push(
                            <tr key="total" className="font-bold border-t-2 border-blue-400 bg-gray-50">
                              <td colSpan="4" className="px-2 py-1 text-right text-gray-800">Total:</td>
                              <td className="px-2 py-1 text-right text-blue-600">{results.totalWireArea.toFixed(4)} in²</td>
                            </tr>
                          );
                          
                          return rows;
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <Info size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold">Add wires to see results</p>
                  <p className="mt-1 text-xs">Click "Add Wire" or use a preset</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
      
      {/* Presets Modal */}
      <PresetsModal
        isOpen={showPresetsModal}
        onClose={() => setShowPresetsModal(false)}
        currentPresetInstances={presetInstances}
        onUpdatePresets={handleUpdatePresets}
      />
    </div>
  );
};

export default ConduitFillCalculator;
