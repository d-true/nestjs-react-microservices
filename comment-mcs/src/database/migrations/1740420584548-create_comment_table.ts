import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentTable1740420584548 implements MigrationInterface {
    name = 'CreateCommentTable1740420584548';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "text" text NOT NULL,
                "user_id" uuid NOT NULL,
                "delete_on" TIMESTAMP WITH TIME ZONE,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_comment_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IX_comment_user_id" ON "comment" ("user_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IX_comment_user_id"
        `);
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
    }
}
