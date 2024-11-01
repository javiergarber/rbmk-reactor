export default class Rotation2d {
  angle: number;
  constructor(angle: number) {
    if (angle < 0 || angle > 360) {
      throw new Error('Invalid angle');
    }
    this.angle = angle;
  }
}
