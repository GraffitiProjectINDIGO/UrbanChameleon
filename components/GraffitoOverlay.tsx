import { Icon } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Artifact } from '../components/api';

interface GraffitoOverlayProps {
  graffito: Artifact | null;
  onClose: () => void;
}

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
});

const GraffitoOverlay: React.FC<GraffitoOverlayProps> = ({
  graffito,
  onClose,
}) => {
  if (!graffito) return null;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-2000">
        <div className="bg-white rounded-lg w-11/12 h-4/5 overflow-y-auto p-4 relative text-black">
          <div className="bg-gray-200 bg-opacity-50 sticky top-0 p-4 z-10 flex justify-between items-center rounded-lg">
            <h1 className="text-2xl font-bold mb-0 inline-block">
              Graffito: {graffito.title}
            </h1>
            <button
              onClick={onClose}
              className="bg-navbar-gradient text-white px-4 py-2 rounded-full"
            >
              X
            </button>
          </div>
          <img
            src={graffito.imageUrl}
            alt={graffito.title}
            className="w-full h-auto rounded-md mb-4"
          />

          <div className="flex">
            <div className="text-black flex-1">
              <p>
                <strong>Description:</strong> {graffito.description}
              </p>
              <p>
                <strong>Graffito Type:</strong> {graffito.types}
              </p>
              <p>
                <strong>Start Date of Visibilty:</strong> {graffito.startDate}
              </p>
              <p>
                <strong>End Date of Visibilty:</strong> {graffito.endDate}
              </p>
              <p>
                <strong>Colors used:</strong> {graffito.colours}
              </p>
              <p>
                <strong>Area covered:</strong> {graffito.area}
              </p>
              {graffito.graffitist && (
                <p>
                  <strong>Graffitist:</strong> {graffito.graffitist}
                </p>
              )}
            </div>
            {graffito.latitude && graffito.longitude && (
              <div className="flex-1 mt-4 flex justify-end items-center">
                <MapContainer
                  center={[graffito.latitude, graffito.longitude]}
                  zoom={16}
                  style={{ height: '100px', width: '100px' }}
                  dragging={false}
                  zoomControl={false}
                  doubleClickZoom={false}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[graffito.latitude, graffito.longitude]}
                    icon={customIcon}
                  />
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraffitoOverlay;
