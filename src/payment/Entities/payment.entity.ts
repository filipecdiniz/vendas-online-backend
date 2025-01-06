import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity({ name: 'payment' })
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class PaymentEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'price', nullable: false })
    price: number;

    @Column({ name: 'discount', nullable: false })
    discount: number;

    @Column({ name: 'final_price', nullable: false })
    finalPrice: number;

    @Column({ name: 'type', nullable: false })
    type: string;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;
}