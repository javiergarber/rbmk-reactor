import GameObject from '../GameObject';
import Transform from '../Transform';

export default class Camera {
  transform: Transform;

  constructor(transform: Transform) {
    this.transform = transform;
  }

  drawScene(entities: GameObject[]) {
    entities.forEach((entity) => {
      entity.draw(this);
    });
  }
}
