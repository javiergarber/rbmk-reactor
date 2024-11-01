import { Point2d } from '../valueobjects/Point2d';
import Rotation2d from '../valueobjects/Rotation2d';
import { Size } from '../valueobjects/Size';

export default class Transform {
  position: Point2d;
  size: Size;
  rotation: Rotation2d;
  constructor(position: Point2d, size: Size, rotation?: Rotation2d) {
    this.position = position;
    this.size = size;
    this.rotation = rotation || new Rotation2d(0);
  }

  clone(): Transform {
    return new Transform(this.position.clone(), this.size.clone(), this.rotation.clone());
  }
}
