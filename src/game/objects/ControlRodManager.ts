import Constants from '../constants/Constants';
import VoidedMeshRenderer from '../engine/canvas/entityrenderer/VoidedMeshRenderer';
import EntityManager from '../engine/EntityManager';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import { Size } from '../engine/valueobjects/Size';
import ControlRod from './ControlRod';
import Neutron from './Neutron';

export default class ControlRodManager extends GameObject {
  private controlRods: ControlRod[] = [];
  public static instance: ControlRodManager;
  static getInstance(): ControlRodManager {
    if (!this.instance) {
      this.instance = new ControlRodManager(new Transform(new Point2d(0, 0), new Size(0, 0)), new VoidedMeshRenderer());
    }
    return this.instance;
  }

  update(updateInfo: { deltaTime: number }): void {
    var numberOfNeutrons = EntityManager.getInstance()
      .getAllEntitites()
      .filter((predicate) => predicate instanceof Neutron).length;

    this.controlRods.forEach((rod) => rod.remove());
    if (numberOfNeutrons > Constants.MAX_NEUTRONS_ON_SCREEN * 0.33) {
      this.insertGroup1();
    }
    if (numberOfNeutrons > Constants.MAX_NEUTRONS_ON_SCREEN * 0.66) {
      this.insertGroup2();
    }
    if (numberOfNeutrons > Constants.MAX_NEUTRONS_ON_SCREEN) {
      this.insertGroup3();
    }
  }
  insertGroup1() {
    this.controlRods.forEach((rod, index) => {
      if (index % 4 == 0) rod.insert();
    });
  }
  insertGroup2() {
    this.controlRods.forEach((rod, index) => {
      if (index % 2 == 0) rod.insert();
    });
  }
  insertGroup3() {
    this.controlRods.forEach((rod, index) => {
      if (index % 1 == 0) rod.insert();
    });
  }
  handleInput(updateInfo: { deltaTime: number }): void {}

  public addControlRod(controlRod: ControlRod) {
    this.controlRods.push(controlRod);
  }

  public removeControlRod(controlRod: ControlRod) {
    this.controlRods.splice(this.controlRods.indexOf(controlRod), 1);
  }

  public getAllControlRods() {
    return this.controlRods;
  }
}
