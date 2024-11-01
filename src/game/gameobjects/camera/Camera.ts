import { SceneRenderer } from '../../canvas/SceneRenderer';
import { Point2d } from '../../valueobjects/Point2d';
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
