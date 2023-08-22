import React from 'react';
import { Artifact } from '../components/api';

interface GraffitoOverlayProps {
  graffito: Artifact;
  onClose: () => void;
}

const GraffitoOverlay: React.FC<GraffitoOverlayProps> = ({ graffito, onClose }) => {
  if (!graffito) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-2000">
      <div className="bg-white rounded-lg w-11/12 h-4/5 overflow-y-auto p-4 relative">
        <h1 className="text-2xl font-bold mb-4 inline-block">{graffito.title}</h1>
        <button 
          onClick={onClose} 
          className="bg-navbar-gradient text-white px-4 py-2 rounded-full absolute top-4 right-4"
        >
          X
        </button>
        <img src={graffito.imageUrl} alt={graffito.title} className="w-full h-auto rounded-md mb-4" />
        <p>{graffito.description}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default GraffitoOverlay;