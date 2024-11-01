export class Point2d {
  y: number;
  x: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static distance(point1: Point2d, point2: Point2d) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
  }

  clone(): Point2d {
    return new Point2d(this.x, this.y);
  }
}
