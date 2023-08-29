import 'leaflet/dist/leaflet.css';
import 'node_modules/react-leaflet-cluster/lib/assets/MarkerCluster.Default.css';
import { faHome, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import L, { Icon, point } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Artifact, getArtifactsData } from './api';
import Backdrop from './Blackdrop';
import styles from './Map.module.scss';

// Dynamic import for GraffitoOverlay
const GraffitoOverlay = dynamic(() => import('./GraffitoOverlay'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface MapProps {
  artifacts: Artifact[];
}

// Function to create custom cluster icons
const createClusterCustomIcon: (cluster: any) => L.DivIcon = (cluster) => {
  return L.divIcon({
    html: `<div style="background-image: linear-gradient(135deg, #e95095, #7049ba); height: 2em; width: 2em; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.2rem; box-shadow: 0 0 0px 5px #fff;"><span>${cluster.getChildCount()}</span></div>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

// Function to group artifacts by type
const groupArtifactsByType = (artifacts: Artifact[]) => {
  const grouped: { [key: string]: Artifact[] } = {};
  artifacts.forEach((artifact) => {
    const type = artifact.types || 'Other Graffiti Types';
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(artifact);
  });
  return grouped;
};

interface MapPaneProps {
  isOverlayOpen: boolean;
}

const MapPane: React.FC<MapPaneProps> = ({ isOverlayOpen }) => {
  const map = useMap();

  const resetMapView = () => {
    map.setView([48.217, 16.3727], 14);
  };

  useEffect(() => {
    if (isOverlayOpen) {
      // Disable map interactions when overlay is open
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable(); // mobile
    } else {
      // Re-enable map interactions when overlay is closed
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      if (map.tap) map.tap.enable(); // mobile
    }
  }, [isOverlayOpen, map]);

  useEffect(() => {
    const saveMapState = () => {
      console.log('Map moved');
      const center = map.getCenter();
      const zoom = map.getZoom();
      localStorage.setItem('mapState', JSON.stringify({ center, zoom }));
    };

    map.on('moveend', saveMapState);

    return () => {
      map.off('moveend', saveMapState);
    };
  }, [map]);

  useEffect(() => {
    const mapState = localStorage.getItem('mapState');
    if (mapState) {
      const { center, zoom } = JSON.parse(mapState);
      map.setView(center, zoom);
    }
  }, [map]);

  return (
    <button onClick={resetMapView} className={styles.resetButton}>
      <FontAwesomeIcon icon={faHome} />
    </button>
  );
};

const Map: React.FC<MapProps> = ({ artifacts = [] }) => {
  const [markerIcon, setMarkerIcon] = useState<Icon | null>(null);
  const [typeColorMapping, setTypeColorMapping] = useState<{
    [key: string]: string;
  }>({});

  // Predefined colors
  const predefinedColors = [
    'rgb(39, 0, 137)', // indigo
    'rgb(241, 136, 31)', // orange
    'rgb(13, 172, 229)', // cyan
    'rgb(210, 20, 92)', // pink
    '#e95095', // violet
    '#7049ba', // lila
  ];

  // Initialize type-color mapping
  useEffect(() => {
    const newTypeColorMapping: { [key: string]: string } = {};
    let colorIndex = 0;

    artifacts.forEach((artifact) => {
      const type = artifact.types || 'Other Graffiti Types';
      if (!newTypeColorMapping[type]) {
        newTypeColorMapping[type] = predefinedColors[colorIndex];
        colorIndex = (colorIndex + 1) % predefinedColors.length;
      }
    });

    // Default color
    newTypeColorMapping['Other Graffiti Types'] = 'gray';

    setTypeColorMapping(newTypeColorMapping);
  }, [artifacts]);

  useEffect(() => {
    const overlays = document.querySelectorAll(
      '.leaflet-control-layers-overlays label',
    );
    overlays.forEach((labelElement) => {
      const type = (labelElement as HTMLElement).textContent?.trim();
      if (type) {
        const color = typeColorMapping[type] || 'gray';
        (labelElement as HTMLElement).classList.add('leaflet-custom-checkbox');
        (labelElement as HTMLElement).style.setProperty(
          '--checkbox-color',
          color,
        );
      }
    });
  }, [typeColorMapping]);

  // Function to generate SVG icon based on artifact type
  const generateSVGIcon = (artifactType: string) => {
    const color = typeColorMapping[artifactType] || 'gray';
    const icon = <FontAwesomeIcon icon={faLocationDot} color={color} />;
    return L.divIcon({
      html: `<div class="leaflet-fa-icon">${ReactDOMServer.renderToString(
        icon,
      )}</div>`,
      className: 'custom-icon',
      iconSize: [80, 100],
      iconAnchor: [0, 0],
      popupAnchor: [0, 0],
      tooltipAnchor: [0, 0],
    });
  };

  useEffect(() => {
    import('leaflet').then((L) => {
      const markerIcon = L.icon({
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [80, 100],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
      });

      setMarkerIcon(markerIcon);
    });
  }, []);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedGraffito, setSelectedGraffito] = useState<Artifact | null>(
    null,
  );

  const openOverlay = (artifact: Artifact) => {
    setSelectedGraffito(artifact);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedGraffito(null);
  };

  const groupedArtifacts = groupArtifactsByType(artifacts);

  return (
    <MapContainer
      doubleClickZoom={true}
      id="mapId"
      zoom={14}
      center={[48.217, 16.3727]}
      preferCanvas={true}
      className={`${styles.mapContainer} ${
        isOverlayOpen ? 'disable-pointer-events' : ''
      }`}
    >
      <div className={styles.mapWrapper}>
        {/* Legend for marker colors */}
        <div className={styles.legend}>
          {Object.keys(typeColorMapping).map((type) => (
            <div key={type}>
              <span
                className="checkmark"
                style={{ color: typeColorMapping[type] }}
              >
                ✓
              </span>{' '}
              {type}
            </div>
          ))}
        </div>
        <MapPane isOverlayOpen={isOverlayOpen} />
        <LayersControl collapsed={true}>
          <LayersControl.BaseLayer checked name="Watercolor">
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="ESRI grey">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Tiles"
            />
          </LayersControl.BaseLayer>
          {Object.keys(groupedArtifacts).map((type) => (
            <LayersControl.Overlay checked name={type} key={type}>
              <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
                {groupedArtifacts[type].map((artifact) => {
                  const customIcon = generateSVGIcon(type);
                  if (
                    artifact.latitude !== null &&
                    artifact.longitude !== null
                  ) {
                    return (
                      <Marker
                        key={artifact.id}
                        position={[artifact.latitude, artifact.longitude]}
                        icon={customIcon}
                      >
                        <Popup>
                          <h2 className="text-xl font-bold mb-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {artifact.title ?? ''}
                          </h2>
                          <img
                            src={artifact.imageUrl}
                            alt={artifact.title}
                            className="w-full h-auto rounded-md mb-4"
                          />
                          <button
                            onClick={() => openOverlay(artifact)}
                            className="bg-gradient-to-r from-e95095 to-7049ba text-white px-4 py-2 rounded-md mx-auto block z-10"
                          >
                            Graffito details
                          </button>
                        </Popup>
                      </Marker>
                    );
                  }
                  return null;
                })}
              </MarkerClusterGroup>
            </LayersControl.Overlay>
          ))}
        </LayersControl>
        {isOverlayOpen && selectedGraffito && (
          <Backdrop onClick={closeOverlay} />
        )}
        {isOverlayOpen && selectedGraffito && (
          <GraffitoOverlay graffito={selectedGraffito} onClose={closeOverlay} />
        )}
      </div>
    </MapContainer>
  );
};

export default Map;
