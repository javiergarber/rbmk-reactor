import CircleMeshRenderer from '../engine/canvas/entityrenderer/CircleMeshRenderer';
import CircleCollider from '../engine/colliders/CircleCollider';
import Collider from '../engine/colliders/Collider';
import CollisionManager from '../engine/colliders/CollisionManager';
import GameObject from '../engine/gameobjects/GameObject';
import Transform from '../engine/gameobjects/Transform';
import { Point2d } from '../engine/valueobjects/Point2d';
import { Size } from '../engine/valueobjects/Size';

export default class NonFisibleAtom extends GameObject {
  direction: number = 1;
  constructor(position: Point2d) {
    var radius = 20;
    super(new Transform(position, new Size(radius * 2, radius * 2)), new CircleMeshRenderer('rgb(187, 187, 187)'));
  }
  update(updateInfo: { deltaTime: number }): void {}
  handleInput(updateInfo: { deltaTime: number }): void {}
}
