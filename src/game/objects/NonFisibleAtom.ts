import Constants from '../constants/Constants';
import CircleMeshRenderer from '../engine/canvas/entityrenderer/CircleMeshRenderer';
import EntityManager from '../engine/EntityManager';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import Rotation2d from '../engine/valueobjects/Rotation2d';
import { Size } from '../engine/valueobjects/Size';
import MathUtil from '../util/MathUtil';
import FastNeutron from './FastNeutron';
import Neutron from './Neutron';
import UraniumAtom from './UraniumAtom';

export default class NonFisibleAtom extends GameObject {
  private halfLife: number = 9000;
  private timeToEmit: number;
  private timeToUranium: number;
  constructor(position: Point2d) {
    var radius = Constants.ATOM_RADIUS;
    super(new Transform(position, new Size(radius * 2, radius * 2)), new CircleMeshRenderer('rgb(187, 187, 187)', 1));
    this.timeToEmit = MathUtil.randomInt(0, this.halfLife);
    this.timeToUranium = this.calculateTimeToUranium();
  }
  calculateTimeToUranium(): number {
    return MathUtil.randomInt(0, this.halfLife);
  }
  update(updateInfo: { deltaTime: number }): void {
    this.timeToEmit -= 1;
    var timeToUraniumRatio =
      EntityManager.getInstance()
        .getAllEntitites()
        .filter((entity) => entity instanceof Neutron).length / Constants.MAX_NEUTRONS_ON_SCREEN;

    this.timeToUranium -= 1 * timeToUraniumRatio**4;

    if (this.timeToUranium <= 0) {
      this.transformToUranium();
    }

    if (this.timeToEmit <= 0) {
      this.emitNeutrons();
    }
  }
  private transformToUranium() {
    EntityManager.getInstance().addEntity(new UraniumAtom(this.transform.position.clone()));
    this.deleteObject();
  }
  private emitNeutrons() {
    EntityManager.getInstance().addEntity(new FastNeutron(new Point2d(this.transform.position.x, this.transform.position.y), Rotation2d.random()));
    this.timeToEmit = MathUtil.randomInt(0, this.halfLife);
  }
  handleInput(updateInfo: { deltaTime: number }): void {}
}
