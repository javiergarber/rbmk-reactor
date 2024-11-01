export default class Input {
  
  init() {
    window.addEventListener("keydown", (e) => {
      if (!this.inputArray.includes(e.key.toLowerCase())) {
        this.inputArray.push(e.key.toLowerCase());
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.inputArray.includes(e.key.toLowerCase())) {
        this.inputArray.splice(this.inputArray.indexOf(e.key.toLowerCase()), 1);
      }
    });
  }
  static keys = new Input();
  private inputArray: string[] = [];

  isKeyPressend(keyCode: string) {
    return this.inputArray.includes(keyCode);
  }
  public static getPressedKeys() {
    return Input.keys.inputArray;
  }


}
