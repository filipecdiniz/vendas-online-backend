import { ChildEntity, Column } from "typeorm";
import { PaymentEntity } from "./Payment.entity";

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
    @Column({ name: 'amount_payments', nullable: false })
    amountPayments: number
}