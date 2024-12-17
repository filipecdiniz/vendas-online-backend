import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './Entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }

    async findAllProducts(): Promise<ProductEntity[]>{
        const products = await this.productRepository.find();

        if(!products || products.length < 1){
            throw new NotFoundException(`Not found products!`)
        }

        return products
    }
}
