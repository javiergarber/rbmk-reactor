import Collider from './Collider';

export default class CollisionManager {
  private static instance: CollisionManager;
  private colliders: Map<string, Collider[]> = new Map<string, Collider[]>();
  public static getInstance(): CollisionManager {
    if (!CollisionManager.instance) {
      this.instance = new CollisionManager();
    }
    return this.instance;
  }

  public checkCollisionWithTagged(collider: Collider | undefined, tagToCheckCollion: string): Collider | undefined {
    if (!collider) {
      throw new Error('Collider cannot be undefined');
    }

    const taggedColliders = this.colliders.get(tagToCheckCollion);
    if (!taggedColliders) {
      return undefined;
    }

    for (const otherCollider of taggedColliders) {
      if (otherCollider === collider) {
        continue;
      }

      if (collider.checkCollision(otherCollider)) {
        return otherCollider;
      }
    }
    return undefined;
  }

  public addCollider(collider: Collider) {
    this.colliders.set(collider.tag, [...(this.colliders.get(collider.tag) || []), collider]);
  }

  public removeCollider(collider: Collider) {
    const colliders = this.colliders.get(collider.tag);
    if (!colliders) {
      return;
    }
    const index = colliders.indexOf(collider);
    if (index > -1) {
      colliders.splice(index, 1);
    }
  }
}
