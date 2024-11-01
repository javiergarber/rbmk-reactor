import { Point2d } from '../valueobjects/Point2d';
import { Size } from '../valueobjects/Size';

export class SceneRenderer {
  public static instance: SceneRenderer;
  context: CanvasRenderingContext2D;
  canvasElement: HTMLCanvasElement;

  private constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvasElement = canvas;
    this.context = context;
  }

  static init(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.instance = new SceneRenderer(canvas, context);
  }

  public static getInstance() {
    if (!SceneRenderer.instance) {
      throw new Error('SceneRenderer not initialized');
    }
    return SceneRenderer.instance;
  }

  public drawRect(position: Point2d, size: Size, color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(position.x - size.width / 2, position.y - size.height / 2, size.width, size.height);
  }

  public drawCircle(position: Point2d, radius: number, color: string) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    this.context.fill();
  }

  public drawText(text: string, position: Point2d, color: string, font?: string) {
    this.context.font = font || '30px Arial';
    this.context.fillStyle = color;
    this.context.fillText(text, position.x, position.y);
  }

  public drawImage(image: HTMLImageElement, position: Point2d, size: Size) {
    this.context.drawImage(image, position.x, position.y, size.width, size.height);
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }
}
