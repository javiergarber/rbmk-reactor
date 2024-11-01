import CircleMeshRenderer from '../engine/canvas/entityrenderer/CircleMeshRenderer';
import CircleCollider from '../engine/colliders/CircleCollider';
import Camera from '../engine/gameobjects/camera/Camera';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import SoundManager from '../engine/sound/SoundManager';
import { Point2d } from '../engine/valueobjects/Point2d';
import Rotation2d from '../engine/valueobjects/Rotation2d';
import { Size } from '../engine/valueobjects/Size';

export default class Neutron extends GameObject {
  speed: number = 0.5;
  rotation: Rotation2d;
  isAbsorbed: boolean = false;
  radius: number;
  decayingSpeed: number = 1;
  constructor(position: Point2d, rotation: Rotation2d) {
    var initialRadius = 5;
    super(new Transform(position, new Size(initialRadius * 2, initialRadius * 2)), new CircleMeshRenderer('rgb(64, 64, 64)', 3));
    this.setCollider(new CircleCollider(this, initialRadius, 'neutron'));
    this.rotation = rotation;
    this.radius = initialRadius;
    this.emitSound();
  }
  emitSound() {
    var values = ['geiger1', 'geiger2', 'geiger3'];
    SoundManager.getInstance().playSound(values[Math.floor(Math.random() * values.length)]);
  }
  update(updateInfo: { deltaTime: number }): void {
    this.moveFromFromRotation();
    this.handleOutOfScene();
    this.handleAbsorbed();
  }

  private handleOutOfScene() {
    if (!this.meshRenderer?.isInScene(Camera.getInstance().transform, this.transform)) {
      this.deleteObject();
    }
  }
  private moveFromFromRotation() {
    const radians = this.rotation.angle * (Math.PI / 180);

    const deltaX = Math.cos(radians) * this.speed; // velocidad normalizada
    const deltaY = Math.sin(radians) * this.speed; // velocidad normalizada

    this.transform.position.x += deltaX;
    this.transform.position.y += deltaY;
  }

  private handleAbsorbed() {
    if (!this.isAbsorbed) {
      return;
    }
    if (this.radius < 1) {
      this.deleteObject();
    }
    this.radius -= this.decayingSpeed;
    this.transform.size.width = this.radius * 2;
  }

  public triggerAbsorb() {
    this.speed = 0;
    this.isAbsorbed = true;
  }
  handleInput(updateInfo: { deltaTime: number }): void {}
}
