import EntityManager from './engine/EntityManager';
import { Point2d } from './engine/valueobjects/Point2d';
import ControlRod from './objects/ControlRod';
import ControlRodManager from './objects/ControlRodManager';
import NonFisibleAtom from './objects/NonFisibleAtom';
import UraniumAtom from './objects/UraniumAtom';

export default class GameInitializer {
  static init() {
    var startX = -850;
    var startY = -300;
    var uraniumEnrichement = 0.1;
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 15; j++) {
        if (Math.random() < uraniumEnrichement) {
          EntityManager.getInstance().addEntity(new UraniumAtom(new Point2d(startX + i * 40, startY + j * 40)));
        } else {
          EntityManager.getInstance().addEntity(new NonFisibleAtom(new Point2d(startX + i * 40, startY + j * 40)));
        }
      }
    }

    var controlRodManager = ControlRodManager.getInstance();
    EntityManager.getInstance().addEntity(controlRodManager);
    for (let i = 0; i < 11; i++) {
      var controlRod = new ControlRod(new Point2d(-20 + startX + i * 160, startY + 200));
      controlRodManager.addControlRod(controlRod);
      EntityManager.getInstance().addEntity(controlRod);
    }

    // EntityManager.getInstance().addEntity(new Neutron(new Point2d(150, -400), new Rotation2d(45)));

    // EntityManager.getInstance().addEntity(new Neutron(new Point2d(-200, 0), Rotation2d.right()));
    // EntityManager.getInstance().addEntity(new ControlRod(new Point2d(100, 0)));
  }
}
