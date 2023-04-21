import L from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
} from 'react-leaflet';
import styles from '../styles/Map.module.scss';

interface Artifact {
  id: number;
  title: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  artifacts: Artifact[];
}

const MapWithNoSSR = dynamic(
  () =>
    import('react-leaflet').then((mod) => {
      if (typeof window !== 'undefined') {
        require('leaflet/dist/leaflet.css');
        return mod.MapContainer;
      }
      return () => null;
    }),
  { ssr: false },
);

const Map: React.FC<MapProps> = ({ artifacts }) => {
  const [MarkerIcon, setMarkerIcon] = useState<L.Icon>();

  useEffect(() => {
    import('leaflet').then((L) => {
      const markerIcon = L.icon({
        iconUrl: 'marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowUrl: 'marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
      });
      setMarkerIcon(markerIcon);
    });
  }, []);

  function handleClick(e: L.LeafletMouseEvent) {
    console.log('Clicked', e.latlng);
  }

  return (
    <MapWithNoSSR
      doubleClickZoom={true}
      id="mapId"
      zoom={14}
      center={[48.217, 16.3727]}
      preferCanvas={true}
    >
      <LayersControl collapsed={false}>
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
        <LayersControl.Overlay checked name="Graffiti marker">
          <LayerGroup>
            {artifacts.map((artifact) => (
              <Marker
                key={artifact.id}
                position={[artifact.latitude, artifact.longitude]}
                icon={MarkerIcon}
              >
                <Popup>
                  <h2 className={styles.selectedArtifactTitle}>
                    {artifact.title ?? ''}
                  </h2>
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.title}
                    width={250}
                  />
                  <button
                    className="button"
                    onClick={() => console.log('More details clicked')}
                  >
                    More details
                  </button>
                </Popup>
                <Tooltip direction="top" opacity={1} sticky>
                  <img
                    src={
                      artifact.imageUrl.split(/".png"| ".jpg"/)[0] +
                      '?image_size=table'
                    }
                    alt={artifact.title}
                    width={50}
                  />
                </Tooltip>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapWithNoSSR>
  );
};

export default Map;
