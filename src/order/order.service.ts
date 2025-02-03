import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './Entities/order.entity';
import { CreateOrderDTO } from './DTOs/CreateOrderDTO.dto';
import { Repository } from 'typeorm';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentEntity } from 'src/payment/Entities/payment.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private readonly paymentService: PaymentService,
        private readonly cartService: CartService,
        private readonly orderProductService: OrderProductService,
        private readonly productService: ProductService
    ) { }

    async createOrder(createOrderDTO: CreateOrderDTO, cartId: number, userId: number): Promise<OrderEntity> {
        const payment: PaymentEntity = await this.paymentService.createPayment(createOrderDTO);

        const order = await this.orderRepository.save({
            addressId: createOrderDTO.addressId,
            date: new Date(),
            paymentId: payment.id,
            userId
        });

        const cart = await this.cartService.findCartByUserID(userId, true);

        const products = await this.productService.findAllProducts(cart.cartProduct.map((cartProduct) => cartProduct.productId))

        await Promise.all(cart.cartProduct?.map((cartProduct) => {
            this.orderProductService.createOrderProduct(
                cartProduct.productId,
                order.id,
                products.find((product) => product.id === cartProduct.productId)?.price || 0,
                cartProduct.amount
            )
        }))

        return order;
    }
}
