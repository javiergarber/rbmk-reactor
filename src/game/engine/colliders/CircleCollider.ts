import Collider from './Collider';
import BoxCollider from './BoxCollider';
import GameObject from '../gameobjects/GameObject';
import { Point2d } from '../valueobjects/Point2d';

export default class CircleCollider extends Collider {
  radius: number;
  constructor(gameObject: GameObject, radius: number, tag: string) {
    super(gameObject, tag);
    this.radius = radius;
  }

  checkCollisionBox(otherCollider: BoxCollider): boolean {
    const { x: x1, y: y1 } = this.gameObject.transform.position;
    const { width: w1, height: h1 } = this.gameObject.transform.size;
    const { x: x2, y: y2 } = otherCollider.gameObject.transform.position;
    const { width: w2, height: h2 } = otherCollider.gameObject.transform.size;
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    if (dx > w1 / 2 + w2 / 2) return false;
    if (dy > h1 / 2 + h2 / 2) return false;

    if (dx <= w1 / 2) return true;
    if (dy <= h1 / 2) return true;

    const cornerDistance = (dx - w1 / 2) ** 2 + (dy - h1 / 2) ** 2;
    return cornerDistance <= this.radius ** 2;
  }
  checkCollisionCircle(otherCollider: CircleCollider): boolean {
    const distance = Point2d.distance(this.gameObject.transform.position, otherCollider.gameObject.transform.position);
    return distance < this.radius + otherCollider.radius;
  }

  checkCollision(otherCollider: Collider): Collider | undefined {
    if (otherCollider instanceof CircleCollider) {
      if (this.checkCollisionCircle(otherCollider)) return otherCollider;
    }
    if (otherCollider instanceof BoxCollider) {
      if (this.checkCollisionBox(otherCollider)) return otherCollider;
    }
    return undefined;
  }
}
