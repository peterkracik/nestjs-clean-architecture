export interface IBaseEntity {
  fromDao<T>(this: T, dao: Partial<T>): T;
}
