import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'address' })
export class AddressEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @Column({ name: 'complement', nullable: false })
    complement: string;

    @Column({ name: 'number', nullable: false })
    number: number;

    @Column({ name: 'cep', nullable: false })
    cep: string;

    @Column({name: 'city_id', nullable: false})
    cityId: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}