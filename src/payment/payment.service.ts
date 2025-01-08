import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './Entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from 'src/order/DTOs/CreateOrderDTO.dto';
import { PaymentCreditCartEntity } from './Entities/payment-credit-card.entity';
import { PaymentType } from 'src/payment_status/Enums/payment-type.enum';
import { PaymentPixEntity } from './Entities/payment-pix.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>
    ) { }

    async createPayment(createOrderDTO: CreateOrderDTO): Promise<PaymentEntity> {
        if (createOrderDTO.amountPayments) {
            const paymentCreditCard = new PaymentCreditCartEntity(PaymentType.Done, 0, 0, 0, createOrderDTO)

            return await this.paymentRepository.save(paymentCreditCard)

        } else if (createOrderDTO.codePix && createOrderDTO.datePayment) {
            const paymentPix = new PaymentPixEntity(PaymentType.Done, 0, 0, 0, createOrderDTO)

            return await this.paymentRepository.save(paymentPix)
        } else {
            throw new BadRequestException(`Amount Payments or Code Pix not found!`)
        }
    }
}
