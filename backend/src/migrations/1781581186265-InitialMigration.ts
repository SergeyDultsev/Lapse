import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1781581186265 implements MigrationInterface {
    name = 'InitialMigration1781581186265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "bio" character varying NOT NULL DEFAULT '',
                "countFollowers" integer NOT NULL DEFAULT '0',
                "countSubscriptions" integer NOT NULL DEFAULT '0',
                CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"),
                CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"),
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user_entity"
        `);
    }

}
