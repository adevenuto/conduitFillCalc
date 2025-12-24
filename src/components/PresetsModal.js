import React, { useState } from 'react';
import { Plus, Minus, Check, X } from 'lucide-react';
import Modal from './Modal';
import { wirePresets } from '../utils/nec/wirePresets';

const PresetsModal = ({ isOpen, onClose, onSelectPreset }) => {
  const [selectedPresets, setSelectedPresets] = useState({});
  // Categorize presets
  const presetCategories = {
    residential: {
      title: '🏠 Residential Circuits',
      description: 'Common household electrical circuits',
      presets: [
        'singlePhase120V',
        'singlePhase120VNeutral', 
        'singlePhase240V',
        'singlePhase240VNeutral',
        'multiWireBranchCircuit',
        'range50A',
        'acCondenser',
        'waterHeater',
        'emergencyLighting'
      ]
    },
    commercial: {
      title: '🏢 Commercial/Industrial',
      description: 'Three-phase and heavy-duty circuits',
      presets: [
        'threePhase208Y120V',
        'threePhase480V',
        'threePhase480Y277V',
        'subpanelFeeder',
        'highTempMotor'
      ]
    },
    specialized: {
      title: '⚡ Specialized Circuits',
      description: 'Control, communication, and specialty applications',
      presets: [
        'controlCircuit',
        'fireAlarm',
        'catVDataCable',
        'pvSolar'
      ]
    }
  };

  const togglePreset = (presetKey) => {
    setSelectedPresets(prev => {
      const newSelected = { ...prev };
      if (newSelected[presetKey]) {
        delete newSelected[presetKey];
      } else {
        newSelected[presetKey] = { quantity: 1 };
      }
      return newSelected;
    });
  };

  const updateQuantity = (presetKey, quantity) => {
    if (quantity < 1) return;
    setSelectedPresets(prev => ({
      ...prev,
      [presetKey]: { quantity }
    }));
  };

  const clearSelection = () => {
    setSelectedPresets({});
  };

  const handleAddSelected = () => {
    // Call onSelectPreset for each selected preset with its quantity
    Object.entries(selectedPresets).forEach(([presetKey, { quantity }]) => {
      onSelectPreset(presetKey, quantity);
    });
    setSelectedPresets({});
    onClose();
  };

  const PresetCard = ({ presetKey, preset }) => {
    const wireCount = preset.wires.reduce((sum, wire) => sum + wire.quantity, 0);
    const uniqueTypes = [...new Set(preset.wires.map(wire => wire.type))].length;
    const isSelected = !!selectedPresets[presetKey];
    const quantity = selectedPresets[presetKey]?.quantity || 1;
    
    return (
      <div 
        className={`bg-white border-2 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer group ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
        }`}
      >
        <div 
          className="flex items-start justify-between mb-2"
          onClick={() => togglePreset(presetKey)}
        >
          <h4 className={`font-semibold text-sm transition-colors ${
            isSelected ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-700'
          }`}>
            {preset.name}
          </h4>
          <div className="flex items-center gap-2">
            {isSelected ? (
              <Check size={18} className="text-blue-500" />
            ) : (
              <Plus size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            )}
          </div>
        </div>
        
        <div className="text-xs text-gray-600 mb-2">
          {wireCount} conductor{wireCount !== 1 ? 's' : ''} • {uniqueTypes} wire type{uniqueTypes !== 1 ? 's' : ''}
        </div>
        
        <div className="space-y-1 mb-3">
          {preset.wires.map((wire, index) => (
            <div key={index} className="flex justify-between text-xs">
              <span className="text-gray-700">
                {wire.quantity}× {wire.type} {wire.type === 'CUSTOM' ? '' : `#${wire.size}`}
              </span>
              <span className={`capitalize font-medium ${
                wire.role === 'ground' ? 'text-emerald-600' : 
                wire.role === 'phase' ? 'text-blue-600' : 
                wire.role === 'neutral' ? 'text-gray-600' : 'text-purple-600'
              }`}>
                {wire.role === 'ground' ? 'EGC' : wire.role}
              </span>
            </div>
          ))}
        </div>

        {isSelected && (
          <div className="flex items-center justify-center gap-2 pt-2 border-t border-blue-200">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateQuantity(presetKey, quantity - 1);
              }}
              disabled={quantity <= 1}
              className="p-1 rounded hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-semibold min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateQuantity(presetKey, quantity + 1);
              }}
              className="p-1 rounded hover:bg-blue-100"
              type="button"
            >
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const CategorySection = ({ category }) => {
    return (
      <div className="mb-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            {category.title}
          </h3>
          <p className="text-sm text-gray-600">
            {category.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {category.presets.map(presetKey => {
            const preset = wirePresets[presetKey];
            if (!preset) return null;
            
            return (
              <PresetCard 
                key={presetKey} 
                presetKey={presetKey} 
                preset={preset} 
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Wire Circuit Presets"
      maxWidth="max-w-5xl"
    >
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Quick Start Guide</h3>
          <p className="text-sm text-blue-800 mb-2">
            Select multiple presets and adjust quantities to add common wire configurations to your calculation.
          </p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Click presets to select them, then adjust quantities with +/- buttons</li>
            <li>• You can select multiple presets at once</li>
            <li>• Presets are based on common electrical installations</li>
            <li>• You can still add individual wires manually after adding presets</li>
          </ul>
        </div>

        {Object.entries(presetCategories).map(([key, category]) => (
          <CategorySection key={key} category={category} />
        ))}
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            Don't see what you need? You can always add individual wires manually after closing this dialog.
          </p>
        </div>
      </div>

      {/* Selection Footer */}
      {Object.keys(selectedPresets).length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">
                {Object.keys(selectedPresets).length} preset{Object.keys(selectedPresets).length !== 1 ? 's' : ''} selected
              </span>
              <span className="text-gray-500 ml-2">
                (Total: {Object.values(selectedPresets).reduce((sum, { quantity }) => sum + quantity, 0)} circuit{Object.values(selectedPresets).reduce((sum, { quantity }) => sum + quantity, 0) !== 1 ? 's' : ''})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearSelection}
                className="text-sm px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear Selection
              </button>
              <button
                onClick={handleAddSelected}
                className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Selected Presets
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PresetsModal;
