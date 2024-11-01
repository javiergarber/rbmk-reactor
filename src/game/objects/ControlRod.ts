import RectangleMeshRenderer from '../engine/canvas/entityrenderer/RectangleMeshRenderer';
import BoxCollider from '../engine/colliders/BoxCollider';
import Collider from '../engine/colliders/Collider';
import CollisionManager from '../engine/colliders/CollisionManager';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import { Size } from '../engine/valueobjects/Size';
import Neutron from './Neutron';

export default class ControlRod extends GameObject {
  static MIN_HEIGHT: number = -700;
  static MAX_HEIGHT: number = 0;
  static height: number = 700;
  static width: number = 10;
  private movingDirection: number = 0;
  static speed: number = 0.5;
  constructor(position: Point2d) {
    super(new Transform(position, new Size(ControlRod.width, ControlRod.height)), new RectangleMeshRenderer('rgb(64, 64, 64)'));
    this.setCollider(new BoxCollider(this, 'controlRod'));
  }
  update(updateInfo: { deltaTime: number }): void {
    var otherCollider = CollisionManager.getInstance().checkCollisionWithTagged(this.colider, 'neutron');
    if (otherCollider) {
      this.handleNeutronCollision(otherCollider);
    }
    if (this.movingDirection == 1) {
      this.down();
    }
    if (this.movingDirection == -1) {
      this.up();
    }
  }
  private up() {
    if (this.transform.position.y > ControlRod.MIN_HEIGHT) {
      this.transform.position.y -= ControlRod.speed;
    }
  }
  private down() {
    if (this.transform.position.y < ControlRod.MAX_HEIGHT) {
      this.transform.position.y += ControlRod.speed;
    }
  }
  handleNeutronCollision(otherCollider: Collider) {
    if (otherCollider.gameObject instanceof Neutron) {
      otherCollider.gameObject.triggerAbsorb();
    }
  }
  handleInput(updateInfo: { deltaTime: number }): void {}

  remove() {
    this.movingDirection = -1;
  }
  insert(): void {
    this.movingDirection = 1;
  }
}
