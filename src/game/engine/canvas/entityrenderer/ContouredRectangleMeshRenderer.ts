import Transform from '../../gameobjects/Transform';
import { Point2d } from '../../valueobjects/Point2d';
import { SceneRenderer } from '../SceneRenderer';
import MeshRenderer from './MeshRenderer';

export default class ContouredRectangleMeshRenderer extends MeshRenderer {
  private interiorColor: string;
  private exteriorColor: string;
  private lineWidth: number;

  constructor(interiorColor: string, exteriorColor: string, lineWidth: number, zIndex: number = 0) {
    super(zIndex);
    this.interiorColor = interiorColor;
    this.exteriorColor = exteriorColor;
    this.lineWidth = lineWidth;
  }

  draw(cameraTransform: Transform, gameObjectTransform: Transform): void {
    const { x: cameraX, y: cameraY } = cameraTransform.position;
    const { width: cameraWidth, height: cameraHeight } = cameraTransform.size;
    const { x: gameObjectX, y: gameObjectY } = gameObjectTransform.position;
    SceneRenderer.getInstance().drawContouredRect(
      new Point2d(cameraWidth / 2 - cameraX + gameObjectX, cameraHeight / 2 - cameraY + gameObjectY),
      gameObjectTransform.size,
      this.interiorColor,
      this.exteriorColor,
      this.lineWidth
    );
  }
}
