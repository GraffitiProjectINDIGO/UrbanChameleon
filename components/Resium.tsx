import { Cartesian3 } from 'cesium';
import React, { useEffect, useRef, useState } from 'react';
import { Entity, Viewer } from 'resium';
import { Artifact } from './api';

interface ResiumProps {
  artifacts?: Artifact[];
}

export default function Resium({ artifacts }: ResiumProps) {
  const [showEntities, setShowEntities] = useState(true);

  return (
    <div>
      <Viewer full>
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
