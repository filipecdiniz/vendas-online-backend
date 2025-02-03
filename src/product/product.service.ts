import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { ProductEntity } from './Entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from './DTOs/CreateProductDTO.dto';
import { ReturnProductDTO } from './DTOs/ReturnProductDTO.dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDTO } from './DTOs/UpdateProductDTO';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService
    ) { }

    async findAllProducts(productId?: number[]): Promise<ProductEntity[]> {
        let findOptions = {}

        if (productId && productId.length > 0) {
            findOptions = {
                where: {
                    id: In(productId)
                }
            }
        }

        const products = await this.productRepository.find(findOptions);

        if (!products || products.length < 1) {
            throw new NotFoundException(`Not found products!`)
        }

        return products
    }

    async findProductById(productId: number): Promise<ProductEntity> {
        const product: ProductEntity | undefined = await this.productRepository.findOne({
            where: { id: productId }
        });

        if (!product) throw new NotFoundException(`No Product id ${productId} found!`);

        return product;
    }

    async createProduct(createProductDTO: CreateProductDTO) {
        await this.categoryService.findCategoryById(createProductDTO.categoryId);

        return await this.productRepository.save({
            ...createProductDTO,
        })
    }

    async deleteProductById(productId: number): Promise<any> {
        const product = await this.findProductById(productId)

        return await this.productRepository.delete({ id: productId })
    }

    async updateProduct(updateProductDTO: UpdateProductDTO, productId: number): Promise<ProductEntity> {
        const product = await this.findProductById(productId);

        return await this.productRepository.save({
            ...product,
            ...updateProductDTO
        })
    }
}
