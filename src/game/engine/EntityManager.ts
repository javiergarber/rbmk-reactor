import GameObject from './gameobjects/GameObject';

export default class EntityManager {
  static getInstance(): EntityManager {
    return this.instance;
  }
  entities: GameObject[] = [];
  public static instance: EntityManager;

  public static init() {
    this.instance = new EntityManager();
  }

  public addEntity(entity: GameObject) {
    this.entities.push(entity);
  }

  public removeEntity(entity: GameObject) {
    this.entities.splice(this.entities.indexOf(entity), 1);
  }

  public getEntitiesByTag(tag: string) {
    return this.entities.filter((entity) => entity.tags.includes(tag));
  }

  public getAllEntitites() {
    return this.entities;
  }
}
