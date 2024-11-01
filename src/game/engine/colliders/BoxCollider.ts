import CircleCollider from './CircleCollider';
import Collider from './Collider';

export default class BoxCollider extends Collider {
  checkCollisionBox(otherCollider: BoxCollider): boolean {
    throw new Error('Method not implemented.');
  }
  checkCollisionCircle(otherCollider: CircleCollider): boolean {


    var circleDistanceX = Math.abs(otherCollider.gameObject.transform.position.x - this.gameObject.transform.position.x);
    var circleDistanceY = Math.abs(otherCollider.gameObject.transform.position.y - this.gameObject.transform.position.y);

    if (circleDistanceX > (this.gameObject.transform.size.width/2 + otherCollider.radius)) { return false; }
    if (circleDistanceY > (this.gameObject.transform.size.height/2 + otherCollider.radius)) { return false; }

    if (circleDistanceX <= (this.gameObject.transform.size.width/2)) { return true; } 
    if (circleDistanceY <= (this.gameObject.transform.size.height/2)) { return true; }

    var cornerDistanceSq = (circleDistanceX - this.gameObject.transform.size.width/2)^2 +
                         (circleDistanceY - this.gameObject.transform.size.height/2)^2;

    return (cornerDistanceSq <= (otherCollider.radius^2));
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
