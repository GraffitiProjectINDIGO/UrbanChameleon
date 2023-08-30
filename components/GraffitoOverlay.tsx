import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import { Icon } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
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
  const mapRef = useRef(null);
  const [mapImage, setMapImage] = useState<string | null>(null);

  const captureMap = async () => {
    const mapElement = mapRef.current;
    if (mapElement) {
      const canvas = await html2canvas(mapElement, {
        useCORS: true,
      });
      const capturedImage = canvas.toDataURL('image/png');
      setMapImage(capturedImage);
    }
  };
  useEffect(() => {
    captureMap();
  }, []);

  const MyDocument = ({ mapImage }) => (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.cardHeader}>Graffito: {graffito.title}</Text>
          <Image src={graffito.imageUrl} style={pdfStyles.image} />
          <Text style={pdfStyles.cardBody}>
            Description: {graffito.description}
          </Text>
          <Text style={pdfStyles.cardBody}>
            Graffito Type: {graffito.types}
          </Text>
          <Text style={pdfStyles.cardBody}>
            Start Date of Visibility: {graffito.startDate}
          </Text>
          <Text style={pdfStyles.cardBody}>
            End Date of Visibility: {graffito.endDate}
          </Text>
          <Text style={pdfStyles.cardBody}>
            Colours used: {graffito.colours}
          </Text>
          <Text style={pdfStyles.cardBody}>Area covered: {graffito.area}</Text>
          <Text style={pdfStyles.cardBody}>
            Graffitist: {graffito.graffitist}
          </Text>
          {mapImage && <Image src={mapImage} />}{' '}
        </View>
        <View style={pdfStyles.logoContainer}>
          <Image src={'data:image/png;base64,...'} style={pdfStyles.logo} />
        </View>
      </Page>
    </Document>
  );

  const exportPDF = async () => {
    const mapImage = await captureMap();
  };

  if (!graffito) return null;

  const pdfStyles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: 16,
    },
    cardHeader: {
      backgroundColor: 'rgba(196, 196, 196, 0.3)',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 12,
      fontSize: 24,
      fontWeight: 'bold',
    },
    cardBody: {
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 16,
    },
    section: {
      margin: 10,
      padding: 16,
      flexGrow: 1,
      backgroundColor: 'rgba(196, 196, 196, 0.3)',
      borderRadius: 12,
    },
    image: {
      width: '100%',
      height: 200,
      marginVertical: 40,
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    logo: {
      width: 50,
      height: 50,
    },
  });

  const handleExportPDF = () => {
    captureMap();
  };

  return (
    <div id="graffitoOverlay" className={styles.overlay}>
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
            <p>
              <strong>Graffitist:</strong> {graffito.graffitist}
            </p>
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
        <div className="flex justify-center mt-5">
          <PDFDownloadLink
            document={<MyDocument mapImage={mapImage} />}
            fileName={`${graffito.title}.pdf`}
          >
            {({ blob, url, loading, error }) => (
              <button className="bg-gradient-to-r from-e95095 via-e95095 to-7049ba text-white font-bold py-2 px-4 rounded flex items-center justify-center">
                <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                {loading ? 'Loading document...' : 'Export as PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default GraffitoOverlay;
