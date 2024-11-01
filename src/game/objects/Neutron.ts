import CircleMeshRenderer from '../engine/canvas/entityrenderer/CircleMeshRenderer';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import { Size } from '../engine/valueobjects/Size';

export default class Neutron extends GameObject {
  direction: number = 1;
  speed: number = 2;
  constructor(position: Point2d) {
    super(new Transform(new Point2d(-500, 0), new Size(20, 20)), new CircleMeshRenderer('grey'), ['neutron']);
  }
  update(updateInfo: { deltaTime: number }): void {
    // this.transform.position.x += this.speed ;
  }
  handleInput(updateInfo: { deltaTime: number }): void {}
}
