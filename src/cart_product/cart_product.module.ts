import { Module } from '@nestjs/common';
import { CartProductService } from './cart_product.service';

@Module({
  providers: [CartProductService]
})
export class CartProductModule {}
