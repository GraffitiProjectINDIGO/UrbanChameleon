import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Icon } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Artifact } from '../components/api';
import styles from './GraffitoOverlay.module.scss';

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

  const exportPDF = async () => {
    const overlay = document.getElementById('graffitoOverlay');
    if (overlay) {
      try {
        // Ensure the overlay has non-zero dimensions
        if (overlay.clientHeight === 0 || overlay.clientWidth === 0) {
          throw new Error('Overlay dimensions are zero');
        }

        const canvas = await html2canvas(overlay, {
          useCORS: true, // Enable CORS
        });

        const imgData = canvas.toDataURL('image/png');
        if (imgData === 'data:,') {
          throw new Error('Canvas Data URL is empty');
        }

        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${graffito?.title}.pdf`);
      } catch (error) {
        console.error('Error in PDF generation:', error);
      }
    }
  };

  return (
    <div id="graffitoOverlay">
      <div onClick={(e) => e.stopPropagation()} className={styles.overlay}>
        <div className={styles['overlay-content']}>
          <div className={styles['card-header']}>
            <h1 className={styles['card-title']}>Graffito: {graffito.title}</h1>
            <button onClick={onClose} className={styles['close-button']}>
              X
            </button>
          </div>
          <img
            src={graffito.imageUrl}
            alt={graffito.title}
            className={styles.image}
          />
          <div className={styles['description-map-container']}>
            <div className="text-black flex-1">
              <p>
                <strong>Description:</strong> {graffito.description}
              </p>
              <p>
                <strong>Graffito Type:</strong> {graffito.types}
              </p>
              <p>
                <strong>Start Date of Visibility:</strong> {graffito.startDate}
              </p>
              <p>
                <strong>End Date of Visibility:</strong> {graffito.endDate}
              </p>
              <p>
                <strong>Colours used:</strong> {graffito.colours}
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
              <div className={styles['map-container']}>
                <MapContainer
                  center={[graffito.latitude, graffito.longitude]}
                  zoom={16}
                  style={{ height: '100%', width: '100%' }}
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
          {/*  <button
            className="bg-gradient-to-r from-e95095 via-e95095 to-7049ba text-white font-bold place-items-center justify-center py-2 px-4 rounded mt-4"
            onClick={exportPDF}
          >
            Export as PDF
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default GraffitoOverlay;
