import { MigrationInterface, QueryRunner } from 'typeorm';

export class manyToMany1632822049476 implements MigrationInterface {
  name = 'manyToMany1632822049476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "UserGroup" ("groupId" uuid NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_d9e45bce314f2b14f9f2a3939ca" PRIMARY KEY ("groupId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ec0179bbbc4551b1ac57e5fb1b" ON "UserGroup" ("groupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_07ebdcdf94d172d763cdf7b8fd" ON "UserGroup" ("userId") `,
    );
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "age"`);
    await queryRunner.query(`ALTER TABLE "public"."user" ADD "age" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."group" DROP CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."group" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "public"."group" ADD "id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."group" ADD CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "public"."group" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "public"."group" ADD "name" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."group" DROP COLUMN "permissions"`);
    await queryRunner.query(
      `CREATE TYPE "public"."group_permissions_enum" AS ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."group" ADD "permissions" "public"."group_permissions_enum" array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserGroup" ADD CONSTRAINT "FK_ec0179bbbc4551b1ac57e5fb1b1" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserGroup" ADD CONSTRAINT "FK_07ebdcdf94d172d763cdf7b8fd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "UserGroup" DROP CONSTRAINT "FK_07ebdcdf94d172d763cdf7b8fd9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserGroup" DROP CONSTRAINT "FK_ec0179bbbc4551b1ac57e5fb1b1"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."group" DROP COLUMN "permissions"`);
    await queryRunner.query(`DROP TYPE "public"."group_permissions_enum"`);
    await queryRunner.query(
      `ALTER TABLE "public"."group" ADD "permissions" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "public"."group" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "public"."group" ADD "name" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."group" DROP CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."group" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "public"."group" ADD "id" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."group" ADD CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "age"`);
    await queryRunner.query(`ALTER TABLE "public"."user" ADD "age" smallint NOT NULL`);
    await queryRunner.query(`DROP INDEX "IDX_07ebdcdf94d172d763cdf7b8fd"`);
    await queryRunner.query(`DROP INDEX "IDX_ec0179bbbc4551b1ac57e5fb1b"`);
    await queryRunner.query(`DROP TABLE "UserGroup"`);
  }
}
