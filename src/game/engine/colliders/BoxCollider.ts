import Collider from './Collider';
import CircleCollider from './CircleCollider';

export default class BoxCollider extends Collider {
  checkCollisionBox(otherCollider: BoxCollider): boolean {
    throw new Error('Method not implemented.');
  }
  checkCollisionCircle(otherCollider: CircleCollider): boolean {
    throw new Error('Method not implemented.');
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
