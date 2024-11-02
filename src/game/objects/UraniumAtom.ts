import Constants from '../constants/Constants';
import CircleMeshRenderer from '../engine/canvas/entityrenderer/CircleMeshRenderer';
import CircleCollider from '../engine/colliders/CircleCollider';
import Collider from '../engine/colliders/Collider';
import CollisionManager from '../engine/colliders/CollisionManager';
import EntityManager from '../engine/EntityManager';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import SoundManager from '../engine/sound/SoundManager';
import { Point2d } from '../engine/valueobjects/Point2d';
import Rotation2d from '../engine/valueobjects/Rotation2d';
import { Size } from '../engine/valueobjects/Size';
import Neutron from './Neutron';
import NonFisibleAtom from './NonFisibleAtom';
import XenonAtom from './XenonAtom';

export default class UraniumAtom extends GameObject {
  direction: number = 1;
  constructor(position: Point2d) {
    var radius = Constants.ATOM_RADIUS;
    super(new Transform(position, new Size(radius * 2, radius * 2)), new CircleMeshRenderer('rgb(34, 140, 255)', 1));
    this.setCollider(new CircleCollider(this, radius, 'uranium'));
  }
  update(updateInfo: { deltaTime: number }): void {
    // this.transform.position.x += this.speed ;
    var otherCollider = CollisionManager.getInstance().checkCollisionWithTagged(this.colider, 'neutron');
    if (otherCollider) {
      this.handleNeutronCollision(otherCollider);
    }
  }
  private handleNeutronCollision(otherCollider: Collider) {
    this.createNonFisibleAtom();
    this.spawnNeutrons();
    this.deleteObject();
    if (otherCollider.gameObject instanceof Neutron) {
      otherCollider.gameObject.triggerAbsorb();
    }
  }

  private createNonFisibleAtom() {
    var decayIntoXenon = Math.random() < Constants.XENON_DECAYMENT_PROBABILITY;
    if (decayIntoXenon) {
      EntityManager.getInstance().addEntity(new XenonAtom(this.transform.position.clone()));
    } else {
      EntityManager.getInstance().addEntity(new NonFisibleAtom(this.transform.position.clone()));
    }
  }

  private spawnNeutrons() {
    for (let i = 0; i < 3; i++) {
      EntityManager.getInstance().addEntity(new Neutron(this.transform.position.clone(), Rotation2d.random()));
    }
    // EntityManager.getInstance().addEntity(new Neutron(this.transform.position.clone(), Rotation2d.right()));
  }

  handleInput(updateInfo: { deltaTime: number }): void {}
}
