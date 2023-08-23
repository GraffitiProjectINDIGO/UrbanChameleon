import { Viewer, Entity } from 'resium';
import { Cartesian3 } from "cesium";

export default function Resium() {
  return (
    <Viewer full>
         <Entity
          name="Vienna"
          position={Cartesian3.fromDegrees(16.3798, 48.2167, 100)}
          point={{ pixelSize: 10 }}
          description="This is Vienna!"
      />
    </Viewer>
  );
}
