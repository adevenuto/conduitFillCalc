import React from 'react';
import { Plus } from 'lucide-react';
import Modal from './Modal';
import { wirePresets } from '../utils/nec/wirePresets';

const PresetsModal = ({ isOpen, onClose, onSelectPreset }) => {
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

  const handlePresetClick = (presetKey) => {
    onSelectPreset(presetKey);
    onClose();
  };

  const PresetCard = ({ presetKey, preset }) => {
    const wireCount = preset.wires.reduce((sum, wire) => sum + wire.quantity, 0);
    const uniqueTypes = [...new Set(preset.wires.map(wire => wire.type))].length;
    
    return (
      <div 
        className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        onClick={() => handlePresetClick(presetKey)}
      >
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-sm text-slate-800 group-hover:text-blue-700 transition-colors">
            {preset.name}
          </h4>
          <Plus 
            size={18} 
            className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" 
          />
        </div>
        
        <div className="text-xs text-gray-600 mb-2">
          {wireCount} conductor{wireCount !== 1 ? 's' : ''} • {uniqueTypes} wire type{uniqueTypes !== 1 ? 's' : ''}
        </div>
        
        <div className="space-y-1">
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
            Select a preset to automatically add common wire configurations to your calculation.
          </p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Each preset adds multiple wires at once</li>
            <li>• Presets are based on common electrical installations</li>
            <li>• You can still add individual wires after selecting a preset</li>
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
    </Modal>
  );
};

export default PresetsModal;
