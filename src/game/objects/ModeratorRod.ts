import ContouredRectangleMeshRenderer from '../engine/canvas/entityrenderer/ContouredRectangleMeshRenderer';
import BoxCollider from '../engine/colliders/BoxCollider';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import { Size } from '../engine/valueobjects/Size';

export default class ModeratorRod extends GameObject {
  static height: number = 680;
  static width: number = 10;
  static speed: number = 0.5;
  constructor(horizontalPosition: number) {
    super(
      new Transform(new Point2d(horizontalPosition, 0), new Size(ModeratorRod.width, ModeratorRod.height)),
      new ContouredRectangleMeshRenderer('rgb(255, 255, 255)', 'rgb(64, 64, 64)', 8)
    );
    this.setCollider(new BoxCollider(this, 'modetor-rod'));
  }

  update(updateInfo: { deltaTime: number }): void {}
  handleInput(updateInfo: { deltaTime: number }): void {}
}
