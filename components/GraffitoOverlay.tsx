import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from "leaflet";
import { Artifact } from '../components/api';

interface GraffitoOverlayProps {
  graffito: Artifact;
  onClose: () => void;
}

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38]
});

const GraffitoOverlay: React.FC<GraffitoOverlayProps> = ({ graffito, onClose }) => {
  if (!graffito) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-2000">
      <div className="bg-white rounded-lg w-11/12 h-4/5 overflow-y-auto p-4 relative text-black">
        <h1 className="text-2xl font-bold mb-4 inline-block">{graffito.title}</h1>
        <button 
          onClick={onClose} 
          className="bg-navbar-gradient text-white px-4 py-2 rounded-full absolute top-4 right-4"
        >
          X
        </button>
        <img src={graffito.imageUrl} alt={graffito.title} className="w-full h-auto rounded-md mb-4" />
        <p>{graffito.description}</p>
        <div className='text-black'>
          <p><strong>Type:</strong> {graffito.types}</p>
          <p><strong>Start Date:</strong> {graffito.startDate}</p>
          <p><strong>End Date:</strong> {graffito.endDate}</p>
          <p><strong>Colors:</strong> {graffito.colors}</p>
          <p><strong>Area:</strong> {graffito.area}</p>
          {graffito.graffitist && <p><strong>Graffitist:</strong> {graffito.graffitist}</p>}
        </div>
        {graffito.latitude && graffito.longitude && (
          <div className="mt-4">
            <MapContainer 
              center={[graffito.latitude, graffito.longitude]} 
              zoom={16} 
              style={{ height: '200px', width: '100%' }} 
              dragging={false} 
              zoomControl={false} 
              doubleClickZoom={false} 
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[graffito.latitude, graffito.longitude]} icon={customIcon} />
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraffitoOverlay;
