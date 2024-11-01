import GameObject from '../gameobjects/GameObject';
import BoxCollider from './BoxCollider';
import CircleCollider from './CircleCollider';

export default abstract class Collider {
  gameObject: GameObject;
  tag: string;

  constructor(gameObject: GameObject, tag: string) {
    this.gameObject = gameObject;
    this.tag = tag;
  }

  abstract checkCollision(otherCollider: Collider): Collider | undefined;
  abstract checkCollisionBox(otherCollider: BoxCollider): boolean;
  abstract checkCollisionCircle(otherCollider: CircleCollider): boolean;
}
