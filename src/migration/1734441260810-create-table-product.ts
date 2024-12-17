import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProduct1734441260810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.product (
                id serial4 NOT NULL,
                category_id int4 NOT NULL,
                "name" varchar NOT NULL,
                price int4 NOT NULL,
                image varchar NOT NULL,
                created_at timestamp DEFAULT now() NOT NULL,
                updated_at timestamp DEFAULT now() NOT NULL,
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.product;
        `)
    }

}
