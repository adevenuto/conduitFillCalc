import React, { useEffect } from 'react';
import { X, PanelRightClose } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'max-w-4xl', 
  variant = 'center', 
  slideFrom = 'right' 
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

  const slideInClasses = {
    right: 'translate-x-full',
    left: '-translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full'
  };

  const slideInPositionClasses = {
    right: 'right-0 top-0 h-full',
    left: 'left-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {variant === 'center' ? (
        <div className="flex items-center justify-center min-h-full p-4">
          <div 
            className={`relative w-full ${maxWidth} bg-white rounded-xl shadow-2xl transform transition-all duration-300 scale-100 opacity-100`}
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
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div 
          className={`fixed ${slideInPositionClasses[slideFrom]} w-[90%] max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0 translate-y-0' : slideInClasses[slideFrom]
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
          <div className="px-6 py-4 max-h-[90vh] overflow-y-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
