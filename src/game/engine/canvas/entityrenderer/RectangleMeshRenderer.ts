import Transform from '../../gameobjects/Transform';
import { Point2d } from '../../valueobjects/Point2d';
import { SceneRenderer } from '../SceneRenderer';
import MeshRenderer from './MeshRenderer';

export default class RectangleMeshRenderer extends MeshRenderer {
  private color: string;

  constructor(color: string) {
    super();
    this.color = color;
  }

  draw(cameraTransform: Transform, gameObjectTransform: Transform): void {
    const { x: cameraX, y: cameraY } = cameraTransform.position;
    const { width: cameraWidth, height: cameraHeight } = cameraTransform.size;
    const { x: gameObjectX, y: gameObjectY } = gameObjectTransform.position;
    SceneRenderer.getInstance().drawRect(
      new Point2d(cameraWidth / 2 - cameraX + gameObjectX, cameraHeight / 2 - cameraY + gameObjectY),
      gameObjectTransform.size,
      this.color
    );
  }
}
