import CircleMeshRenderer from '../engine/canvas/entityrenderer/CircleMeshRenderer';
import CircleCollider from '../engine/colliders/CircleCollider';
import Camera from '../engine/gameobjects/camera/Camera';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import Rotation2d from '../engine/valueobjects/Rotation2d';
import { Size } from '../engine/valueobjects/Size';

export default class Neutron extends GameObject {
  speed: number = 2;
  rotation: Rotation2d;
  isAbsorbed: boolean = false;
  radius: number;
  decayingSpeed: number = 1;
  constructor(position: Point2d, rotation: Rotation2d) {
    var initialRadius = 10;
    super(new Transform(position, new Size(initialRadius * 2, initialRadius * 2)), new CircleMeshRenderer('rgb(64, 64, 64)'));
    this.setCollider(new CircleCollider(this, initialRadius, 'neutron'));
    this.rotation = rotation;
    this.radius = initialRadius;
  }
  update(updateInfo: { deltaTime: number }): void {
    this.moveFromFromRotation();
    this.handleOutOfScene();
    this.handleAbsorbed();
  }

  handleOutOfScene() {
    if (!this.meshRenderer.isInScene(Camera.getInstance().transform, this.transform)) {
      this.deleteObject();
    }
  }
  moveFromFromRotation() {
    const radians = this.rotation.angle * (Math.PI / 180);

    const deltaX = Math.cos(radians) * this.speed; // velocidad normalizada
    const deltaY = Math.sin(radians) * this.speed; // velocidad normalizada
    
    this.transform.position.x += deltaX;
    this.transform.position.y += deltaY;
  }

  handleAbsorbed() {
    if (!this.isAbsorbed) {
      return;
    }
    if (this.radius < 1) {
      this.deleteObject();
    }
    this.radius -= this.decayingSpeed;
    this.transform.size.width = this.radius * 2;
  }

  triggerAbsorb() {
    this.speed = 0;
    this.isAbsorbed = true;
  }
  handleInput(updateInfo: { deltaTime: number }): void {}
}
