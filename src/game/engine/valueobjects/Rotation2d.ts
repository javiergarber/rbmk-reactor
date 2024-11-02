export default class Rotation2d {
  static rotate(rotation: Rotation2d, angle: number): Rotation2d {
    if (rotation.angle + angle > 360) {
      return new Rotation2d(rotation.angle + angle - 360);
    } else if (rotation.angle + angle < 0) {
      return new Rotation2d(rotation.angle + angle + 360);
    } else {
      return new Rotation2d(rotation.angle + angle);
    }
  }
  angle: number;
  constructor(angle: number) {
    if (angle < 0 || angle > 360) {
      throw new Error('Invalid angle');
    }
    this.angle = angle;
  }

  static random() {
    return new Rotation2d(Math.random() * 360);
  }

  static right() {
    return new Rotation2d(0);
  }
  static down() {
    return new Rotation2d(90);
  }
  static left() {
    return new Rotation2d(180);
  }
  static up() {
    return new Rotation2d(270);
  }

  clone(): Rotation2d  {
    return new Rotation2d(this.angle);
  }
}
