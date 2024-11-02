import Constants from '../constants/Constants';
import CircleMeshRenderer from '../engine/canvas/entityrenderer/CircleMeshRenderer';
import EntityManager from '../engine/EntityManager';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import Rotation2d from '../engine/valueobjects/Rotation2d';
import { Size } from '../engine/valueobjects/Size';
import MathUtil from '../util/MathUtil';
import Neutron from './Neutron';
import UraniumAtom from './UraniumAtom';

export default class NonFisibleAtom extends GameObject {
  private halfLife: number = 10000;
  private timeToEmit: number;
  private timeToUranium: number;
  constructor(position: Point2d) {
    var radius = Constants.ATOM_RADIUS;
    super(new Transform(position, new Size(radius * 2, radius * 2)), new CircleMeshRenderer('rgb(187, 187, 187)', 1));
    this.timeToEmit = MathUtil.randomInt(0, this.halfLife);
    this.timeToUranium = MathUtil.randomInt(0, this.halfLife);
  }
  update(updateInfo: { deltaTime: number }): void {
    this.timeToEmit -= 1;
    this.timeToUranium -= 1;
    if (this.timeToEmit <= 0) {
      this.emitNeutrons();
    }
    if (this.timeToUranium <= 0) {
      this.transformToUranium();
    }
  }
  transformToUranium() {
    EntityManager.getInstance().addEntity(new UraniumAtom(this.transform.position.clone()));
    this.deleteObject();
  }
  emitNeutrons() {
    EntityManager.getInstance().addEntity(new Neutron(new Point2d(this.transform.position.x, this.transform.position.y), Rotation2d.random()));
    this.timeToEmit = MathUtil.randomInt(0, this.halfLife);
  }
  handleInput(updateInfo: { deltaTime: number }): void {}
}
