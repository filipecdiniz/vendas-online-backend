import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './Entities/order.entity';
import { CreateOrderDTO } from './DTOs/CreateOrderDTO.dto';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderEntity: Repository<OrderEntity>
    ) { }

    async createOrder(createOrderDTO: CreateOrderDTO, cartId: number) {
        return null;
    }   
}
