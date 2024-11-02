import CircleCollider from './CircleCollider';
import Collider from './Collider';

export default class BoxCollider extends Collider {
  checkCollisionBox(otherCollider: BoxCollider): boolean {
    throw new Error('Method not implemented.');
  }
  checkCollisionCircle(otherCollider: CircleCollider): boolean {
    const { x: x1, y: y1 } = otherCollider.gameObject.transform.position;
    const { width: w1, height: h1 } = otherCollider.gameObject.transform.size;
    const { x: x2, y: y2 } = this.gameObject.transform.position;
    const { width: w2, height: h2 } = this.gameObject.transform.size;
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    if (dx > w1 / 2 + w2 / 2) return false;
    if (dy > h1 / 2 + h2 / 2) return false;

    if (dx <= w1 / 2) return true;
    if (dy <= h1 / 2) return true;

    const cornerDistance = (dx - w1 / 2) ** 2 + (dy - h1 / 2) ** 2;
    return cornerDistance <= otherCollider.radius ** 2;
      
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
