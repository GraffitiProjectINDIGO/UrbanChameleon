import './Resium.module.scss';
import { Cartesian3, Cesium3DTileset, Ion } from 'cesium';
import React, { useEffect, useRef, useState } from 'react';
import { Entity, Viewer } from 'resium';

require('dotenv').config();

interface ResiumProps {
  artifacts?: Artifact[];
}

export default function Resium({ artifacts }: ResiumProps) {
  const [showViewer, setShowViewer] = useState(false);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    setShowViewer(true);
    return () => setShowViewer(false);
  }, []);

  useEffect(() => {
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;
      console.log(viewer.entities.values);

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

  return showViewer ? (
    <Viewer full className="viewer-container" ref={viewerRef}>
      {artifacts &&
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
  ) : null;
}
