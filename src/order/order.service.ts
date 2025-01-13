import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './Entities/order.entity';
import { CreateOrderDTO } from './DTOs/CreateOrderDTO.dto';
import { Repository } from 'typeorm';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentEntity } from 'src/payment/Entities/payment.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private readonly paymentService: PaymentService,
        private readonly cartService: CartService,
        private readonly orderProductService: OrderProductService
    ) { }

    async createOrder(createOrderDTO: CreateOrderDTO, cartId: number, userId: number) {
        const payment: PaymentEntity = await this.paymentService.createPayment(createOrderDTO);

        const order = this.orderRepository.save({
            addressId: createOrderDTO.addressId,
            date: new Date(),
            paymentId: payment.id,
            userId
        });

        const cart = await this.cartService.findCartByUserID(userId, true);

        cart.cartProduct?.forEach((cartProduct) => {
            this.orderProductService.createOrderProduct(
                cartProduct.id,
                cartProduct.id,
                0,
                cartProduct.amount
            )
        })

        return null;
    }
}
