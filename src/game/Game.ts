import RectangleMeshRenderer from './canvas/entityrenderer/RectangleMeshRenderer';
import { SceneRenderer } from './canvas/SceneRenderer';
import EntityManager from './EntityManager';
import Camera from './gameobjects/camera/Camera';
import TestEntity from './gameobjects/TestEntity';
import Transform from './gameobjects/Transform';
import Input from './input/Input';
import { Point2d } from './valueobjects/Point2d';
import { Size } from './valueobjects/Size';

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  deltaTime: number;
  lastFrameTimestamp: number;
  fps: number;
  camera: Camera;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    SceneRenderer.init(canvas, context);
    EntityManager.init();
    this.canvas = canvas;
    this.context = context;
    this.deltaTime = 0;
    this.lastFrameTimestamp = Date.now();
    this.fps = 0;
    window.requestAnimationFrame(this.gameLoop.bind(this));

    this.initInputSystem();
    this.initGame();
    this.camera = new Camera(new Transform(new Point2d(0,0), new Size(this.canvas.width, this.canvas.height)));
  }

  private initInputSystem() {
    Input.keys.init();
  }
  private initGame() {
    EntityManager.getInstance().addEntity(new TestEntity(
     
     ));

  }

  private gameLoop(timeStamp: number) {
    this.deltaTime = timeStamp - this.lastFrameTimestamp;
    this.lastFrameTimestamp = timeStamp;
    this.fps = Math.round(1 / (this.deltaTime / 1000));

    this.handleInput(this.deltaTime);
    this.update(this.deltaTime);
    this.draw();

    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  private handleInput( deltaTime: number) {
    EntityManager.getInstance()
      .getAllEntitites()
      .forEach((entity) => {
        entity.handleInput({ deltaTime: deltaTime });
      });
  }

  private update(deltaTime: number) {
    EntityManager.getInstance()
      .getAllEntitites()
      .forEach((entity) => {
        entity.update({ deltaTime: deltaTime });
      });
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.camera.drawScene(EntityManager.getInstance().getAllEntitites());
    this.drawFps();
  }

  private drawFps() {
    SceneRenderer.getInstance().drawText('FPS: ' + this.fps, new Point2d(10, 30), 'black', '18px Arial');
  }
}
