import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
  LayersControl,
  LayerGroup,
} from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import styles from './Map.module.scss';
import 'leaflet/dist/leaflet.css';
import 'node_modules/react-leaflet-cluster/lib/assets/MarkerCluster.Default.css';
import L from 'leaflet';

interface Artifact {
  id: string;
  title: string;
  imageUrl: string;
  latitude: number | null;
  longitude: number | null;
}

interface MapProps {
  artifacts: Artifact[];
}

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38]
});

const createClusterCustomIcon: (cluster: any) => L.DivIcon = (cluster) => {
  console.log("Creating custom icon for cluster");
  return L.divIcon({
    html: `<div style="background-image: linear-gradient(135deg, #e95095, #7049ba); height: 2em; width: 2em; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.2rem; box-shadow: 0 0 0px 5px #fff;"><span>${cluster.getChildCount()}</span></div>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};


const MapPane = () => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
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

  return (
    <MapContainer
      doubleClickZoom={true}
      id="mapId"
      zoom={14}
      center={[48.217, 16.3727]}
      preferCanvas={true}
      style={{ marginTop: '10rem', paddingBottom: '10rem', height: 'calc(100vh - 10rem)' }}
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
                );
              }
              return null;
            })}
          </MarkerClusterGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;