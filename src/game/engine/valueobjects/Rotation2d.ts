export default class Rotation2d {
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

  clone(): Rotation2d | undefined {
    return new Rotation2d(this.angle);
  }
}
