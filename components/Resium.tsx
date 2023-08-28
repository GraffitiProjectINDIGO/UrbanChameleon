import { Cartesian3, Ion, IonResource } from 'cesium';
import React, { useEffect, useRef, useState } from 'react';
import { Entity, Viewer } from 'resium';
import { Artifact } from './api';

require('dotenv').config();

interface ResiumProps {
  artifacts?: Artifact[];
}

export default function Resium({ artifacts }: ResiumProps) {
  const [showViewer, setShowViewer] = useState(false);
  const viewerRef = useRef<any>(null);
  /* const tilesetRef = useRef<any>(null); */
  const [showTileset, setShowTileset] = useState(true);
  const [showEntities, setShowEntities] = useState(true);
  /* const [fetchedData, setFetchedData] = useState<any>(null); */

  useEffect(() => {
    setShowViewer(true);
    return () => setShowViewer(false);
  }, []);

  /* useEffect(() => {
    fetch('/api/cesium')
      .then((response) => response.json())
      .then((data) => setFetchedData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); */

  useEffect(() => {
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;

      if (process.env.CESIUM_ACCESS_TOKEN) {
        Ion.defaultAccessToken = process.env.CESIUM_ACCESS_TOKEN;
      } else {
        console.error('CESIUM_ACCESS_TOKEN is not set in .env');
      }

      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(16.3727, 48.217, 500),
        orientation: {
          heading: 0.0,
          pitch: -Math.PI / 4.0,
          roll: 0.0,
        },
      });
    }
  }, [viewerRef]);

  /* const handleZoomToTileset = () => {
    if (tilesetRef.current) {
      viewerRef.current.cesiumElement.zoomTo(tilesetRef.current);
    }
  }; */

  /*  const handleZoomToEntity = (entity: any) => {
    viewerRef.current.cesiumElement.zoomTo(entity);
  }; */

  return (
    <div>
      {/* <div className="legend">
        <div>
          <input
            type="checkbox"
            checked={showTileset}
            onChange={() => setShowTileset(!showTileset)}
          />
          Tileset
          <button onClick={handleZoomToTileset}>Zoom</button>
        </div>
        <div>
          <input
            type="checkbox"
            checked={showEntities}
            onChange={() => setShowEntities(!showEntities)}
          />
          Entities
        </div>
      </div> */}
      <Viewer full ref={viewerRef}>
        {/* {showTileset && (
          <ResiumCesium3DTileset
            ref={tilesetRef}
            url={IonResource.fromAssetId(2197615)}
            onReady={(tileset) => {
              tilesetRef.current = tileset;
            }}
          />
        )} */}
        {showEntities &&
          artifacts &&
          artifacts.map((artifact) => {
            if (artifact.latitude !== null && artifact.longitude !== null) {
              return (
                <Entity
                  key={artifact.id}
                  name={artifact.title}
                  position={Cartesian3.fromDegrees(
                    artifact.longitude,
                    artifact.latitude,
                    100,
                  )}
                  point={{ pixelSize: 10 }}
                  description={artifact.title}
                />
              );
            }
            return null;
          })}
      </Viewer>
    </div>
  );
}
