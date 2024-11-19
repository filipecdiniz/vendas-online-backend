import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1731968539165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public."user" (
            "userId" serial4 NOT NULL,
            "name" varchar NOT NULL,
            email varchar NOT NULL,
            cpf varchar NOT NULL,
            phone varchar NOT NULL,
            "password" varchar NOT NULL,
            type_user int4 NOT NULL,
            created_at timestamp DEFAULT now() NOT NULL,
            updated_at timestamp DEFAULT now() NOT NULL,
            CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"));
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.user;
        `)
    }

}
