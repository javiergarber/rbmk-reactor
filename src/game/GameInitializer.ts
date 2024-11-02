import Constants from './constants/Constants';
import EntityManager from './engine/EntityManager';
import { Point2d } from './engine/valueobjects/Point2d';
import ControlRod from './objects/ControlRod';
import ControlRodManager from './objects/ControlRodManager';
import NonFisibleAtom from './objects/NonFisibleAtom';
import UraniumAtom from './objects/UraniumAtom';
import Water from './objects/Water';

export default class GameInitializer {
  static startX = -850;
  static startY = -300;
  static init() {
    this.createAtoms();
    this.createControlRods();
  }
  static createControlRods() {
    var controlRodManager = ControlRodManager.getInstance();
    EntityManager.getInstance().addEntity(controlRodManager);
    for (let i = 0; i < 11; i++) {
      var controlRod = new ControlRod(
        new Point2d(
          -(Constants.WATER_SEPARATION + Constants.WATER_SIDE) / 2 + this.startX + i*4 * (Constants.WATER_SEPARATION + Constants.WATER_SIDE),
          this.startY + (Constants.WATER_SEPARATION + Constants.WATER_SIDE)
        )
      );
      controlRodManager.addControlRod(controlRod);
      EntityManager.getInstance().addEntity(controlRod);
    }
  }
  static createAtoms() {
    var uraniumEnrichement = 0.1;

    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 15; j++) {
        var xPosition = this.startX + i * (Constants.WATER_SEPARATION + Constants.WATER_SIDE);
        var yPosition = this.startY + j * (Constants.WATER_SEPARATION + Constants.WATER_SIDE);
        if (Math.random() < uraniumEnrichement) {
          EntityManager.getInstance().addEntity(new UraniumAtom(new Point2d(xPosition, yPosition)));
        } else {
          EntityManager.getInstance().addEntity(new NonFisibleAtom(new Point2d(xPosition, yPosition)));
        }
        EntityManager.getInstance().addEntity(new Water(new Point2d(xPosition, yPosition)));
      }
    }
  }
}
