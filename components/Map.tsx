import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, point } from "leaflet";
import styles from './Map.module.scss';
import 'leaflet/dist/leaflet.css';
import 'node_modules/react-leaflet-cluster/lib/assets/MarkerCluster.Default.css';
import L from 'leaflet';
import { Artifact } from './api';
import dynamic from 'next/dynamic';

const GraffitoOverlay = dynamic(() => import('./GraffitoOverlay'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

interface MapProps {
  artifacts: Artifact[];
}

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38]
});

const createClusterCustomIcon: (cluster: any) => L.DivIcon = (cluster) => {
  return L.divIcon({
    html: `<div style="background-image: linear-gradient(135deg, #e95095, #7049ba); height: 2em; width: 2em; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.2rem; box-shadow: 0 0 0px 5px #fff;"><span>${cluster.getChildCount()}</span></div>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};


const MapPane = () => {
  const map = useMap();

  useEffect(() => {
      const saveMapState = () => {
        console.log("Map moved")
          const center = map.getCenter();
          const zoom = map.getZoom();
          localStorage.setItem('mapState', JSON.stringify({ center, zoom }));
      };

      map.on('moveend', saveMapState);

      // Cleanup the event listener when the component is unmounted
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

  return null;
};

const Map: React.FC<MapProps> = ({ artifacts = [] }) => {
  const [MarkerIcon, setMarkerIcon] = useState<L.Icon>();

  useEffect(() => {
    import('leaflet').then((L) => {
      const markerIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
      });

      setMarkerIcon(markerIcon);
    });
  }, []);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedGraffito, setSelectedGraffito] = useState<Artifact | null>(null);

  const openOverlay = (artifact: Artifact) => {
    setSelectedGraffito(artifact);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedGraffito(null);
  };

  return (
    <MapContainer
      doubleClickZoom={true}
      id="mapId"
      zoom={14}
      center={[48.217, 16.3727]}
      preferCanvas={true}
      className={`${styles.mapContainer} ${isOverlayOpen ? 'no-pointer' : ''}`}
    >
      <LayersControl collapsed={false}>
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
        <LayersControl.Overlay checked name="Graffiti marker">
          <MarkerClusterGroup
            
            iconCreateFunction={createClusterCustomIcon}
          >
            {artifacts.map((artifact) => {
              if (artifact.latitude !== null && artifact.longitude !== null) {
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
      </LayersControl>
      {/* Conditionally render the GraffitoOverlay based on isOverlayOpen state */}
      {isOverlayOpen && selectedGraffito && (
        <GraffitoOverlay
          graffito={selectedGraffito}
          onClose={closeOverlay}
        />
      )}
    </MapContainer>
  );
};

export default Map;