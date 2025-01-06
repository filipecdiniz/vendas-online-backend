import { ChildEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { PaymentEntity } from "./Payment.entity";

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
    @Column({ name: 'code', nullable: false })
    code: number;

    @Column({ name: 'payment_date', nullable: false })
    paymentDate: Date;
}