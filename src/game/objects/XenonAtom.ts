import Constants from '../constants/Constants';
import GameObject from '../engine/gameobjects/GameObject';
import { Point2d } from '../engine/valueobjects/Point2d';
import CircleMeshRenderer from '../engine/canvas/entityrenderer/CircleMeshRenderer';
import Transform from '../engine/gameobjects/Transform';
import { Size } from '../engine/valueobjects/Size';
import MathUtil from '../util/MathUtil';
import CircleCollider from '../engine/colliders/CircleCollider';
import CollisionManager from '../engine/colliders/CollisionManager';
import Collider from '../engine/colliders/Collider';
import Neutron from './Neutron';
import EntityManager from '../engine/EntityManager';
import NonFisibleAtom from './NonFisibleAtom';

export default class XenonAtom extends GameObject {
  static colors = ['rgb(187, 187, 187)', 'rgb(64, 64, 64)'];
  timeToDecay: number;
  canAbsorb: boolean = false;
  constructor(position: Point2d) {
    var radius = Constants.ATOM_RADIUS;
    super(new Transform(position, new Size(radius * 2, radius * 2)), new CircleMeshRenderer(XenonAtom.colors[0], 1));
    this.timeToDecay = MathUtil.randomInt(200, 400);
  }
  update(updateInfo: { deltaTime: number }): void {
    if (!this.canAbsorb) {
      if (this.timeToDecay > 0) {
        this.timeToDecay -= 1;
      } else {
        this.transformToXenon();
      }
    } else {
      var neutronCollider = CollisionManager.getInstance().checkCollisionWithTagged(this.colider, 'neutron');
      if (neutronCollider) {
        this.handleNeutronCollision(neutronCollider);
      }
    }
  }
  handleNeutronCollision(neutronCollider: Collider) {
    if (neutronCollider.gameObject instanceof Neutron) {
      neutronCollider.gameObject.triggerAbsorb();
      EntityManager.getInstance().addEntity(new NonFisibleAtom(this.transform.position.clone()));
      this.deleteObject();
    }
  }
  transformToXenon() {
    var meshRenderer = this.meshRenderer as CircleMeshRenderer;
    meshRenderer.setColor(XenonAtom.colors[1]);
    this.setCollider(new CircleCollider(this, Constants.ATOM_RADIUS, 'xenon'));
    this.canAbsorb = true;
  }
  handleInput(updateInfo: { deltaTime: number }): void {}
}
