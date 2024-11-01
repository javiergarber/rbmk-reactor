import { Point2d } from '../../valueobjects/Point2d';
import { Size } from '../../valueobjects/Size';
import GameObject from '../GameObject';
import Transform from '../Transform';

export default class Camera {
  transform: Transform;
  static instance: Camera;

  constructor(transform: Transform) {
    this.transform = transform;
    Camera.instance = this;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Camera(new Transform(new Point2d(0, 0), new Size(0, 0)));
    }
    return this.instance;
  }

  drawScene(entities: GameObject[]) {
    entities.forEach((entity) => {
      entity.draw(this);
    });
  }
}
