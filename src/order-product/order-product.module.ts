import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from './Entities/order-product.entity';

@Module({
  providers: [OrderProductService],
  imports: [TypeOrmModule.forFeature([OrderProductEntity])],
  exports: [OrderProductService]
})
export class OrderProductModule { }
