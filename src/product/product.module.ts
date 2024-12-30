import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './Entities/product.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    CategoryModule
  ],
  exports: [ProductService]
})
export class ProductModule { }
