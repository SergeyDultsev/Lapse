import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1780299753116 implements MigrationInterface {
    name = 'InitialMigration1780299753116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ALTER COLUMN "countFollowers"
            SET DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ALTER COLUMN "countSubscriptions"
            SET DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ALTER COLUMN "countSubscriptions" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ALTER COLUMN "countFollowers" DROP DEFAULT
        `);
    }

}
