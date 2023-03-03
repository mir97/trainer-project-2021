import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addTable1632154134440 implements MigrationInterface {
  name = 'addTable1632154134440';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'smallint',
          },
          {
            name: 'isDeleted',
            type: 'boolean',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'group',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'permissions',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
    await queryRunner.dropTable('group');
  }
}
