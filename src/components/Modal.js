import { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  isUpdate,
  hasChanges,
  selectedPresets,
  clearSelection,
  handleApply
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      
        <div 
          className={`fixed right-0 top-0 h-full w-[90%] max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
            isOpen ? 'translate-x-0 translate-y-0' : 'right-0 top-0 h-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          <div className="p-4 mt-auto bg-white border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {Object.keys(selectedPresets).length > 0 ? (
                  <>
                    <span className="font-semibold">
                      {Object.keys(selectedPresets).length} preset{Object.keys(selectedPresets).length !== 1 ? 's' : ''} selected
                    </span>
                    <span className="ml-2 text-gray-500">
                      (Total: {Object.values(selectedPresets).reduce((sum, { quantity }) => sum + quantity, 0)} circuit{Object.values(selectedPresets).reduce((sum, { quantity }) => sum + quantity, 0) !== 1 ? 's' : ''})
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500">No presets selected</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearSelection}
                  className="px-3 py-2 text-sm text-gray-600 transition-colors hover:text-gray-800"
                >
                  Clear Selection
                </button>
                <button
                  onClick={handleApply}
                  disabled={!hasChanges}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isUpdate ? 'Update Presets' : 'Add Selected Presets'}
                </button>
              </div>
            </div>
          </div>

        </div>


    </div>
  );
};

export default Modal;
