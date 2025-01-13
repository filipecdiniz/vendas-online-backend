import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDTO } from './DTOs/CreateOrderDTO.dto';
import { OrderService } from './order.service';
import { UserID } from 'src/decorators/userID.decorator';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ) { };

    @Post('/cart/:cartId')
    @UsePipes(ValidationPipe)
    async createOrder(@Body() createOrderDTO: CreateOrderDTO, @Param('cartId') cartId: number, @UserID() userId: number) {
        return await this.orderService.createOrder(createOrderDTO, cartId, userId)
    }

}
