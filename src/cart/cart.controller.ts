import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { InsertProductDTO } from './DTOs/InsertProduct.dto'; 
import { CartEntity } from './Entities/cart.entity';
import { CartService } from './cart.service';
import { UserID } from 'src/decorators/userID.decorator';

@Roles(UserType.User)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async insertProduct(@Body() insertProductDTO: InsertProductDTO, @UserID() userId: number): Promise<CartEntity> {
        return await this.cartService.insertProduct(insertProductDTO, userId);
    }
}
