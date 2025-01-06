import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'payment_status'})
export class PaymentStatusEntity {
    @PrimaryGeneratedColumn(`rowid`)
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt', nullable: false})
    updatedAt: Date;
}