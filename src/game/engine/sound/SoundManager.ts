export default class SoundManager {
  private isSoundEnabled: boolean = false;
  private sounds: { [key: string]: HTMLAudioElement } = {};
  static instance: SoundManager;

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      this.instance = new SoundManager();
    }
    return this.instance;
  }

  // Método para cargar un sonido
  public loadSound(name: string, url: string): void {
    const audio = new Audio(url);
    audio.load();
    this.sounds[name] = audio;
  }

  // Método para reproducir un sonido
  public playSound(name: string, volume: number = 1, loop: boolean = false): void {
    if (!this.isSoundEnabled) return;
    const sound = this.sounds[name];
    if (sound) {
      sound.volume = volume; // Ajustar el volumen
      sound.loop = loop; // Configurar si se reproduce en bucle
      sound.currentTime = 0; // Reiniciar el audio
      sound.play(); // Reproducir el sonido
    } else {
      console.warn(`Sound "${name}" not loaded.`);
    }
  }

  // Método para pausar un sonido
  public pauseSound(name: string): void {
    const sound = this.sounds[name];
    if (sound) {
      sound.pause();
    }
  }

  // Método para detener un sonido
  public stopSound(name: string): void {
    const sound = this.sounds[name];
    if (sound) {
      sound.pause();
      sound.currentTime = 0; // Reiniciar el audio
    }
  }

  enableSound() {
    this.isSoundEnabled = true;
  }
}
