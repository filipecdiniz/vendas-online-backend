import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './Entities/order.entity';
import { PaymentModule } from 'src/payment/payment.module';
import { CartModule } from 'src/cart/cart.module';
import { OrderProductModule } from 'src/order-product/order-product.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    PaymentModule,
    CartModule,
    OrderProductModule,
    ProductModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
