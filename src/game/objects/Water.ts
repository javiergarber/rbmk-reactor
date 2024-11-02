import Constants from '../constants/Constants';
import RectangleMeshRenderer from '../engine/canvas/entityrenderer/RectangleMeshRenderer';
import BoxCollider from '../engine/colliders/BoxCollider';
import Collider from '../engine/colliders/Collider';
import CollisionManager from '../engine/colliders/CollisionManager';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import { Size } from '../engine/valueobjects/Size';
import Neutron from './Neutron';

export default class Water extends GameObject {
  private colors = ['rgb(220, 236, 253)', 'rgb(245, 202, 209)', 'rgb(245, 154, 157)', 'rgb(244, 77, 77)', 'rgb(255, 255, 255)'];
  private temperature: number = 0;
  constructor(position: Point2d) {
    super(new Transform(position, new Size(Constants.WATER_SIDE, Constants.WATER_SIDE)), new RectangleMeshRenderer('rgb(220, 236, 253)', 0));
    this.setCollider(new BoxCollider(this, 'water'));
  }
  update(updateInfo: { deltaTime: number }): void {
    var neutronCollider = CollisionManager.getInstance().checkCollisionWithTagged(this.colider, 'neutron');
    if (neutronCollider) {
      this.temperature += Constants.WATER_TEMPERATURE_INCREASE;
      this.handleNeutronCollision(neutronCollider);
    } else {
      this.temperature -= Constants.WATER_TEMPERATURE_LOSS;
    }
    this.paintWater();
  }
  paintWater() {
    var meshRenderer = this.meshRenderer as RectangleMeshRenderer;
    if (this.temperature < 25) {
      meshRenderer.setColor(this.colors[0]);
    } else if (this.temperature < 25 && this.temperature < 50) {
      meshRenderer.setColor(this.colors[1]);
    } else if (this.temperature < 50 && this.temperature < 75) {
      meshRenderer.setColor(this.colors[2]);
    } else if (this.temperature < 75 && this.temperature < 100) {
      meshRenderer.setColor(this.colors[3]);
    } else {
      meshRenderer.setColor(this.colors[4]);
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
