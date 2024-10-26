import { IBaseEntity } from './base-entity.interface';

export class BaseEntity implements IBaseEntity {
  fromDao<T>(this: T, dao: Partial<T>): T {
    return Object.assign(this, dao);
  }
}
