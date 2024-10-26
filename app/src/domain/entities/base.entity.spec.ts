import { BaseEntity } from './base.entity';

class TestEntity extends BaseEntity {
  id?: number;
  name?: string;
}

describe('BaseEntity', () => {
  describe('fromDao', () => {
    it('should assign properties from DAO to the entity instance', () => {
      const dao = { id: 1, name: 'Test Entity' };
      const entity = new TestEntity();

      const result = entity.fromDao(dao);

      expect(result).toBe(entity); // Ensure the method returns the same instance
      expect(result.id).toBe(dao.id);
      expect(result.name).toBe(dao.name);
    });

    it('should not overwrite existing properties if they are not in the DAO', () => {
      const dao = { name: 'Updated Name' };
      const entity = new TestEntity();
      entity.id = 1; // Pre-existing property

      const result = entity.fromDao(dao);

      expect(result.id).toBe(1); // Existing property should remain unchanged
      expect(result.name).toBe(dao.name);
    });

    it('should handle empty DAO objects gracefully', () => {
      const dao = {};
      const entity = new TestEntity();
      entity.id = 1;
      entity.name = 'Initial Name';

      const result = entity.fromDao(dao);

      expect(result.id).toBe(1);
      expect(result.name).toBe('Initial Name');
    });
  });
});
