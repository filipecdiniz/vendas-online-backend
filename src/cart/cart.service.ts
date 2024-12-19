import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './Entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertProductDTO } from './DTOs/InsertProduct.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>
    ) { }

    async createCart(userId: number): Promise<CartEntity> {
        return await this.cartRepository.save({
            active: true,
            userId
        });
    }

    async verifyActiveCart(userId: number): Promise<CartEntity> {
        const cart = await this.cartRepository.findOne({
            where: { userId }
        });

        if (!cart) throw new NotFoundException(`Active cart not found!`);

        return cart;
    }

    async insertProduct(insertProductDTO: InsertProductDTO, userId: number): Promise<CartEntity> {
        const cart = await this.verifyActiveCart(userId).catch(async () => {
            return this.createCart(userId)
        });

        return cart;
    }
}
