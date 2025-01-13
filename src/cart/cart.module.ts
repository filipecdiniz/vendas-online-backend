import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './Entities/cart.entity';
import { CartProductModule } from 'src/cart_product/cart_product.module';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    CartProductModule
  ],
  exports: [CartService]
})
export class CartModule {}
