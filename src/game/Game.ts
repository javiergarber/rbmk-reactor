import Constants from './constants/Constants';
import { SceneRenderer } from './engine/canvas/SceneRenderer';
import EntityManager from './engine/EntityManager';
import Camera from './engine/gameobjects/camera/Camera';
import Transform from './engine/gameobjects/Transform';
import Input from './engine/input/Input';
import SoundManager from './engine/sound/SoundManager';
import { Point2d } from './engine/valueobjects/Point2d';
import { Size } from './engine/valueobjects/Size';
import GameInitializer from './GameInitializer';
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

    this.initSoundManager();
    this.initInputSystem();
    this.initGame();
    this.camera = new Camera(new Transform(new Point2d(0, 0), new Size(this.canvas.width, this.canvas.height)));

    // Iniciar el bucle del juego
    this.startGameLoop();
  }
  initSoundManager() {
    var soundManager = SoundManager.getInstance();
    soundManager.loadSound('geiger1', '/sounds/geiger1.mp3');
    soundManager.loadSound('geiger2', '/sounds/geiger2.mp3');
    soundManager.loadSound('geiger3', '/sounds/geiger3.mp3');
  }

  private initInputSystem() {
    Input.keys.init();
  }
  private initGame() {
    GameInitializer.init();
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
    this.camera.drawScene(
      EntityManager.getInstance()
        .getAllEntitites()
        .sort((a, b) => a.meshRenderer.zIndex - b.meshRenderer.zIndex)
    );
    this.drawFps();
    this.drawNeutronsCount();
  }
  drawNeutronsCount() {
    var numberOfNeutrons = EntityManager.getInstance()
      .getAllEntitites()
      .filter((predicate) => predicate instanceof Neutron).length;

    SceneRenderer.getInstance().drawText(
      numberOfNeutrons + (numberOfNeutrons <= Constants.MAX_NEUTRONS_ON_SCREEN ? '⬆️' : '⬇️'),
      new Point2d(this.canvas.width / 2, 30),
      'black',
      '18px Arial'
    );
  }

  private drawFps() {
    SceneRenderer.getInstance().drawText('FPS: ' + this.fps, new Point2d(10, 30), 'black', '18px Arial');
  }
}
