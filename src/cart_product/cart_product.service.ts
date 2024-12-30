import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './Entities/cart_product.entity';
import { Repository } from 'typeorm';
import { InsertProductDTO } from 'src/cart/DTOs/InsertProduct.dto';
import { CartEntity } from 'src/cart/Entities/cart.entity';
import { ProductService } from 'src/product/product.service';


@Injectable()
export class CartProductService {
    constructor(
        @InjectRepository(CartProductEntity)
        private readonly cartProductRepository: Repository<CartProductEntity>,
        private readonly productService: ProductService
    ) { }

    async createProductInCart(insertProductDTO: InsertProductDTO, cartId: number) {
        return await this.cartProductRepository.save({
            productId: insertProductDTO.productId,
            amount: insertProductDTO.amount,
            cartId
        })
    }

    async verifyProductInCart(productId: number, cartId: number) {
        const cartProduct = await this.cartProductRepository.findOne({
            where: {
                productId: productId,
                cartId
            }
        });

        if (!cartProduct) throw new NotFoundException(`Product not found in cart!`);

        return cartProduct;
    }

    async insertProduct(insertProductDTO: InsertProductDTO, cart: CartEntity): Promise<CartProductEntity> {

        //this code returns an error if productID doesn't exists in database.
        await this.productService.findProductById(insertProductDTO.productId);
        const cartProduct = await this.verifyProductInCart(insertProductDTO.productId, cart.id).catch(async () => undefined);

        if (!cartProduct) {
            return await this.createProductInCart(insertProductDTO, cart.id);
        }

        return await this.cartProductRepository.save({
            ...cartProduct,
            amount: cartProduct.amount += insertProductDTO.amount
        })
    }
}
