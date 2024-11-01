export class Size {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  clone(): Size {
    return new Size(this.width, this.height);
  }
}
