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
    throw new Error('Method not implemented.');
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
