import Constants from '../constants/Constants';
import VoidedMeshRenderer from '../engine/canvas/entityrenderer/VoidedMeshRenderer';
import EntityManager from '../engine/EntityManager';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import Input from '../engine/input/Input';
import { Point2d } from '../engine/valueobjects/Point2d';
import { Size } from '../engine/valueobjects/Size';
import ControlRod from './ControlRod';
import ModeratorRod from './ModeratorRod';
import Neutron from './Neutron';

export default class ControlPanel extends GameObject {
  private controlRods: ControlRod[] = [];
  public static instance: ControlPanel;
  private bz5HasBeenPressed: boolean = false;
  private waterCoolingRate: number;
  static getInstance(): ControlPanel {
    if (!this.instance) {
      this.instance = new ControlPanel(new Transform(new Point2d(0, 0), new Size(0, 0)), new VoidedMeshRenderer());
    }
    return this.instance;
  }

  constructor(transform: Transform, meshRenderer: VoidedMeshRenderer) {
    super(transform, meshRenderer);
    this.waterCoolingRate = Constants.WATER_COOLING_RATE;
  }

  update(updateInfo: { deltaTime: number }): void {
    var numberOfNeutrons = EntityManager.getInstance()
      .getAllEntitites()
      .filter((predicate) => predicate instanceof Neutron).length;

    if (this.waterCoolingRate != 0) {
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
    } else {
      this.controlRods.forEach((rod) => rod.remove());
      this.insertGroup1();
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
  handleInput(updateInfo: { deltaTime: number }): void {
    if (Input.keys.isKeyPressend('b')) {
      this.bz5();
    }
    if (Input.keys.isKeyPressend('d')) {
      this.dieselStop();
    }
  }
  dieselStop() {
    this.waterCoolingRate = 0;
  }
  bz5() {
    if (this.bz5HasBeenPressed) return;
    this.controlRods.forEach((rod) => {
      EntityManager.getInstance().addEntity(new ModeratorRod(rod.transform.position.x));
      rod.deleteObject();
    });

    this.bz5HasBeenPressed = true;
  }

  public addControlRod(controlRod: ControlRod) {
    this.controlRods.push(controlRod);
  }

  public removeControlRod(controlRod: ControlRod) {
    this.controlRods.splice(this.controlRods.indexOf(controlRod), 1);
  }

  public getAllControlRods() {
    return this.controlRods;
  }

  public getWaterCoolingRate() {
    return this.waterCoolingRate;
  }
}
