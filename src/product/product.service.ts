import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './Entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from './DTOs/CreateProductDTO.dto';
import { ReturnProductDTO } from './DTOs/ReturnProductDTO.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService
    ) { }

    async findAllProducts(): Promise<ProductEntity[]>{
        const products = await this.productRepository.find();

        if(!products || products.length < 1){
            throw new NotFoundException(`Not found products!`)
        }

        return products
    }

    async createProduct(createProductDTO: CreateProductDTO){
        await this.categoryService.findCategoryById(createProductDTO.categoryId);
        
        return await this.productRepository.save({
            ...createProductDTO,
        })
    }
}
