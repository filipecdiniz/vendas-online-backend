import { Module } from '@nestjs/common';
import { CartProductService } from './cart_product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductEntity } from './Entities/cart_product.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [CartProductService],
  exports: [CartProductService],
  imports: [
    TypeOrmModule.forFeature([CartProductEntity]), ProductModule
  ]
})
export class CartProductModule {}
