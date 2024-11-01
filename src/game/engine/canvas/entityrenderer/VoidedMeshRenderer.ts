import MeshRenderer from './MeshRenderer';
import Transform from '../../gameobjects/Transform';

export default class VoidedMeshRenderer extends MeshRenderer {
  draw(cameraTransform: Transform, gameObjectTransform: Transform): void {
    return;
  }
}
