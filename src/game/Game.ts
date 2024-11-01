import { SceneRenderer } from './engine/canvas/SceneRenderer';
import EntityManager from './engine/EntityManager';
import Camera from './engine/gameobjects/camera/Camera';
import Transform from './engine/gameobjects/Transform';
import Input from './engine/input/Input';
import { Point2d } from './engine/valueobjects/Point2d';
import { Size } from './engine/valueobjects/Size';
import Neutron from './objects/Neutron';

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  deltaTime: number;
  lastFrameTimestamp: number;
  fps: number;
  camera: Camera;
  running: boolean;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    SceneRenderer.init(canvas, context);
    EntityManager.init();
    this.canvas = canvas;
    this.context = context;
    this.deltaTime = 0;
    this.lastFrameTimestamp = Date.now();
    this.fps = 0;
    this.running = true;

    this.initInputSystem();
    this.initGame();
    this.camera = new Camera(new Transform(new Point2d(0, 0), new Size(this.canvas.width, this.canvas.height)));

    // Iniciar el bucle del juego
    this.startGameLoop();
  }

  private initInputSystem() {
    Input.keys.init();
  }
  private initGame() {
    EntityManager.getInstance().addEntity(new Neutron(new Point2d(0, 0)));
  }

  private startGameLoop() {
    const loop = (timeStamp: number) => {
      if (!this.running) return;
      this.gameLoop(timeStamp);
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  public stopGameLoop() {
    this.running = false;
  }

  private gameLoop(timeStamp: number) {
    // Calcular deltaTime en segundos
    let deltaTime = (timeStamp - this.lastFrameTimestamp) / 1000;

    // Limitar deltaTime a un valor máximo (por ejemplo, 0.1 segundos = 100 ms)
    deltaTime = Math.min(deltaTime, 0.1);
    deltaTime = Math.max(deltaTime, 0.005);

    this.lastFrameTimestamp = timeStamp;

    // Actualizar fps
    this.fps = Math.round(1 / deltaTime);

    this.handleInput(deltaTime * 1000);
    this.update(deltaTime * 1000);
    this.draw();
  }

  private handleInput(deltaTime: number) {
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
    SceneRenderer.getInstance().clear();
    this.camera.drawScene(EntityManager.getInstance().getAllEntitites());
    this.drawFps();
  }

  private drawFps() {
    SceneRenderer.getInstance().drawText('FPS: ' + this.fps, new Point2d(10, 30), 'black', '18px Arial');
  }
}
