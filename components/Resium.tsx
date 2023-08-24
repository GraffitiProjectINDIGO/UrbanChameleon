import './Resium.module.scss';
import { Cartesian3, Cesium3DTileset, Ion } from 'cesium';
import React, { useEffect, useRef, useState } from 'react';
import { Entity, Viewer } from 'resium';

require('dotenv').config();

export default function Resium() {
  const [showViewer, setShowViewer] = useState(false);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    setShowViewer(true);
    return () => setShowViewer(false);
  }, []);

  useEffect(() => {
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;

      if (process.env.CESIUM_ACCESS_TOKEN) {
        Ion.defaultAccessToken = process.env.CESIUM_ACCESS_TOKEN;
      } else {
        console.error('CESIUM_ACCESS_TOKEN is not set in .env');
      }
    }
  }, [viewerRef]);

  return showViewer ? (
    <Viewer className="viewer-container" ref={viewerRef}>
      <Entity
        name="Vienna"
        position={Cartesian3.fromDegrees(16.3798, 48.2167, 100)}
        point={{ pixelSize: 10 }}
        description="This is Vienna!"
      />
    </Viewer>
  ) : null;
}
