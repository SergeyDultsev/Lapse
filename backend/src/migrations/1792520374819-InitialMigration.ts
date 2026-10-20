import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1792520374819 implements MigrationInterface {
  name = 'InitialMigration1792520374819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "post_entity" (
                "postId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "textContent" character varying NOT NULL,
                "countLike" integer NOT NULL DEFAULT '0',
                "countComment" integer NOT NULL DEFAULT '0',
                "countView" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid,
                CONSTRAINT "PK_e6461981f60738a45d7f4769c13" PRIMARY KEY ("postId")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_entity" (
                "userId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "bio" character varying NOT NULL DEFAULT '',
                "countFollowers" integer NOT NULL DEFAULT '0',
                "countSubscriptions" integer NOT NULL DEFAULT '0',
                "countPosts" integer NOT NULL DEFAULT '0',
                "refreshTokenHash" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"),
                CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"),
                CONSTRAINT "PK_fa501a26ccfaded22ce966337e9" PRIMARY KEY ("userId")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "comment_entity" (
                "commentId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "textContent" character varying NOT NULL,
                "countLike" integer NOT NULL DEFAULT '0',
                "countReplies" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "parentCommentId" uuid,
                "userId" uuid,
                "postId" uuid,
                CONSTRAINT "PK_4d518d4e4d8250e81ae623fc498" PRIMARY KEY ("commentId")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "post_entity"
            ADD CONSTRAINT "FK_5e32998d7ac08f573cde04fbfa5" FOREIGN KEY ("userId") REFERENCES "user_entity"("userId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment_entity"
            ADD CONSTRAINT "FK_26785190e6785e3eb1fdd63b63a" FOREIGN KEY ("parentCommentId") REFERENCES "comment_entity"("commentId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment_entity"
            ADD CONSTRAINT "FK_e391949c5735c084dddcb6e6468" FOREIGN KEY ("userId") REFERENCES "user_entity"("userId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment_entity"
            ADD CONSTRAINT "FK_8149ef6edc077bb121ae704e3a8" FOREIGN KEY ("postId") REFERENCES "post_entity"("postId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_8149ef6edc077bb121ae704e3a8"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_e391949c5735c084dddcb6e6468"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_26785190e6785e3eb1fdd63b63a"
        `);
    await queryRunner.query(`
            ALTER TABLE "post_entity" DROP CONSTRAINT "FK_5e32998d7ac08f573cde04fbfa5"
        `);
    await queryRunner.query(`
            DROP TABLE "comment_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "user_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "post_entity"
        `);
  }
}
