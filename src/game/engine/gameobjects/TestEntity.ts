import CircleMeshRenderer from '../canvas/entityrenderer/CircleMeshRenderer';
import Input from '../input/Input';
import { Point2d } from '../valueobjects/Point2d';
import { Size } from '../valueobjects/Size';
import GameObject from './GameObject';
import Transform from './Transform';

export default class TestEntity extends GameObject {
  timeSinceLastSideChange: number = 0;
  direction: number = 1;
  speed: number = 100;
  constructor() {
    //TODO: no tiene mucho sentido lo del size para un circulo
    super(new Transform(new Point2d(0, 0), new Size(10, 10)), new CircleMeshRenderer('black'));
  }
  update(updateInfo: { deltaTime: number }): void {}
  handleInput(updateInfo: { deltaTime: number }): void {
    if (Input.keys.isKeyPressend('arrowright')) {
      this.transform.position.x += this.speed * (updateInfo.deltaTime / 1000);
    }
    if (Input.keys.isKeyPressend('arrowleft')) {
      this.transform.position.x -= this.speed * (updateInfo.deltaTime / 1000);
    }
    if (Input.keys.isKeyPressend('arrowup')) {
      this.transform.position.y -= this.speed * (updateInfo.deltaTime / 1000);
    }
    if (Input.keys.isKeyPressend('arrowdown')) {
      this.transform.position.y += this.speed * (updateInfo.deltaTime / 1000);
    }
  }
}