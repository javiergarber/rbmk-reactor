import Constants from '../constants/Constants';
import RectangleMeshRenderer from '../engine/canvas/entityrenderer/RectangleMeshRenderer';
import BoxCollider from '../engine/colliders/BoxCollider';
import Collider from '../engine/colliders/Collider';
import CollisionManager from '../engine/colliders/CollisionManager';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import { Size } from '../engine/valueobjects/Size';
import ControlPanel from './ControlPanel';
import Neutron from './Neutron';

export default class Water extends GameObject {
  private colors = [
    'rgb(220, 236, 253)',
    'rgb(223, 227, 246)',
    'rgb(225, 218, 240)',
    'rgb(228, 208, 233)',
    'rgb(231, 199, 226)',
    'rgb(234, 190, 219)',
    'rgb(237, 180, 213)',
    'rgb(241, 165, 195)',
    'rgb(243, 120, 137)',
    'rgb(244, 77, 77)'
  ];
  private gasColor = 'rgb(255, 255, 255)';
  private temperature: number = 0;
  constructor(position: Point2d) {
    super(new Transform(position, new Size(Constants.WATER_SIDE, Constants.WATER_SIDE)), new RectangleMeshRenderer('rgb(220, 236, 253)', 0));
    this.setCollider(new BoxCollider(this, 'water'));
  }
  update(updateInfo: { deltaTime: number }): void {
    var neutronCollider = CollisionManager.getInstance().checkCollisionWithTagged(this.colider, 'neutron');
    if (neutronCollider) {
      this.temperature += Constants.WATER_HEATING_RATE;
      this.handleNeutronCollision(neutronCollider);
    } else {
      if (this.temperature > 0) {
        this.temperature -= ControlPanel.getInstance().getWaterCoolingRate();
      } else {
        this.temperature = 0;
      }
    }
    this.paintWater();
  }
  paintWater() {
    var meshRenderer = this.meshRenderer as RectangleMeshRenderer;
    if (this.temperature <= 100) {
      // Calcular el índice correspondiente en la array de colores
      var index = Math.floor(this.temperature / 10);
      meshRenderer.setColor(this.colors[index]);
    } else {
      meshRenderer.setColor(this.gasColor);
    }
  }
  handleInput(updateInfo: { deltaTime: number }): void {}

  handleNeutronCollision(neutronCollider: Collider) {
    if (this.temperature > 100) {
      //no absorve cuando no hay agua
      return;
    }
    if (neutronCollider.gameObject instanceof Neutron) {
      var shouldConsumeNeutron = Math.random() < Constants.WATER_NEUTRON_ABSORPTION_PROBABILITY;
      if (shouldConsumeNeutron) {
        neutronCollider.gameObject.triggerAbsorb();
      }
    }
  }
}
