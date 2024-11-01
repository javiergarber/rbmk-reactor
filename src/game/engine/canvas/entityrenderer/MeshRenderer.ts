import Transform from '../../gameobjects/Transform';

export default abstract class MeshRenderer {
  abstract draw(cameraTransform: Transform, gameObjectTransform: Transform): void;
  isInScene(cameraTransform: Transform, gameObjectTransform: Transform): boolean {
    var x = cameraTransform.position.x - cameraTransform.size.width / 2;
    var y = cameraTransform.position.y - cameraTransform.size.height / 2;
    if (
      gameObjectTransform.position.x - gameObjectTransform.size.width / 2 > cameraTransform.size.width + x ||
      x > gameObjectTransform.size.width + gameObjectTransform.position.x - gameObjectTransform.size.width / 2 ||
      gameObjectTransform.position.y - gameObjectTransform.size.height / 2 > cameraTransform.size.height + y ||
      y > gameObjectTransform.size.height + gameObjectTransform.position.y - gameObjectTransform.size.height / 2
    ) {
      return false;
    }
    return true;
  }
}
