import EntityManager from '../EntityManager';
import MeshRenderer from '../canvas/entityrenderer/MeshRenderer';
import Collider from '../colliders/Collider';
import CollisionManager from '../colliders/CollisionManager';
import Transform from './Transform';
import Camera from './camera/Camera';

type UpdateInfoType = {
  deltaTime: number;
};

export default abstract class GameObject {
  meshRenderer: MeshRenderer;
  transform: Transform;
  colider?: Collider;

  constructor(transform: Transform, meshRenderer: MeshRenderer) {
    this.transform = transform;
    this.meshRenderer = meshRenderer;
  }

  abstract update(updateInfo: UpdateInfoType): void;

  public draw(camera: Camera) {
    if (!this.meshRenderer.isInScene(camera.transform, this.transform)) {
      return;
    }
    this.meshRenderer.draw(camera.transform, this.transform);
  }

  abstract handleInput(updateInfo: UpdateInfoType): void;

  public setCollider(collider: Collider) {
    CollisionManager.getInstance().addCollider(collider);
    this.colider = collider;
  }

  public deleteObject() {
    if (this.colider) {
      CollisionManager.getInstance().removeCollider(this.colider!);
    }
    EntityManager.getInstance().removeEntity(this);
  }
}
