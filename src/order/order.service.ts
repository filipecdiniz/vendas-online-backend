import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './Entities/order.entity';
import { CreateOrderDTO } from './DTOs/CreateOrderDTO.dto';
import { Repository } from 'typeorm';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderEntity: Repository<OrderEntity>,
        private readonly paymentService: PaymentService
    ) { }

    async createOrder(createOrderDTO: CreateOrderDTO, cartId: number) {
        return this.paymentService.createPayment(createOrderDTO);
    }   
}
