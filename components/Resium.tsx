import './Resium.module.scss';
import { Cartesian3 } from 'cesium';
import React, { useEffect, useState } from 'react';
import { Entity, Viewer } from 'resium';

export default function Resium() {
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    setShowViewer(true);
    return () => setShowViewer(false);
  }, []);

  return showViewer ? (
    <Viewer className="viewer-container">
      <Entity
        name="Vienna"
        position={Cartesian3.fromDegrees(16.3798, 48.2167, 100)}
        point={{ pixelSize: 10 }}
        description="This is Vienna!"
      />
    </Viewer>
  ) : null;
}
