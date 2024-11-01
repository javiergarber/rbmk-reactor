import MeshRenderer from '../canvas/entityrenderer/MeshRenderer';
import Transform from './Transform';
import Camera from './camera/Camera';

type UpdateInfoType = {
  deltaTime: number;
};

export default abstract class GameObject {
  meshRenderer: MeshRenderer;
  transform: Transform;
  tags: string[];

  constructor(transform: Transform, meshRenderer: MeshRenderer, tags: string[] = []) {
    this.transform = transform;
    this.meshRenderer = meshRenderer;
    this.tags = tags;
  }

  abstract update(updateInfo: UpdateInfoType): void;

  public draw(camera: Camera) {
    if (!this.meshRenderer.isInScene(camera.transform, this.transform)) {
      return;
    }
    this.meshRenderer.draw(camera.transform, this.transform);
  }

  abstract handleInput(updateInfo: UpdateInfoType): void;
}
