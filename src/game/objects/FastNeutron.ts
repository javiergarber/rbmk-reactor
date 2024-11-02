import Constants from '../constants/Constants';
import ContouredCircleMeshRenderer from '../engine/canvas/entityrenderer/ContouredCircleMeshRenderer';
import CircleCollider from '../engine/colliders/CircleCollider';
import Collider from '../engine/colliders/Collider';
import CollisionManager from '../engine/colliders/CollisionManager';
import EntityManager from '../engine/EntityManager';
import Camera from '../engine/gameobjects/camera/Camera';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import SoundManager from '../engine/sound/SoundManager';
import { Point2d } from '../engine/valueobjects/Point2d';
import Rotation2d from '../engine/valueobjects/Rotation2d';
import { Size } from '../engine/valueobjects/Size';
import ModeratorRod from './ModeratorRod';
import Neutron from './Neutron';

export default class FastNeutron extends GameObject {
  speed: number = 1;
  rotation: Rotation2d;
  radius: number;
  decayingSpeed: number = 1;
  constructor(position: Point2d, rotation: Rotation2d) {
    var initialRadius = Constants.NEUTRON_RADIUS;
    var lineWidth = 4;
    super(
      new Transform(position, new Size(initialRadius * 2, initialRadius * 2)),
      new ContouredCircleMeshRenderer('rgb(64, 64, 64)', 'rgb(255, 255, 255)', lineWidth, 3)
    );
    this.setCollider(new CircleCollider(this, initialRadius, 'fast-neutron'));
    this.rotation = rotation;
    this.radius = initialRadius;
    this.emitSound();
  }

  update(updateInfo: { deltaTime: number }): void {
    this.moveFromFromRotation();
    this.handleOutOfScene();
    this.checkModetorRodCollision();
  }
  checkModetorRodCollision() {
    var otherCollider = CollisionManager.getInstance().checkCollisionWithTagged(this.colider, 'modetor-rod');
    if (otherCollider) {
      this.handleModeratorCollision(otherCollider);
    }
  }
  handleModeratorCollision(otherCollider: Collider) {
    if (otherCollider.gameObject instanceof ModeratorRod) {
      EntityManager.getInstance().addEntity(new Neutron(this.transform.position.clone(), Rotation2d.rotate(this.rotation.clone(), 180)));
      this.deleteObject();
    }
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
  private emitSound() {
    var values = ['geiger1', 'geiger2', 'geiger3'];
    SoundManager.getInstance().playSound(values[Math.floor(Math.random() * values.length)]);
  }
  handleInput(updateInfo: { deltaTime: number }): void {}
}
