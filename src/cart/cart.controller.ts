import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { InsertProductDTO } from './DTOs/InsertProductDTO.dto';
import { CartService } from './cart.service';
import { UserID } from 'src/decorators/userID.decorator';
import { ReturnCartDTO } from './DTOs/ReturnCartDTO.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCartDTO } from './DTOs/UpdateCartDTO.dto';

@Roles(UserType.User)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async insertProduct(@Body() insertProductDTO: InsertProductDTO, @UserID() userId: number): Promise<ReturnCartDTO> {
        return new ReturnCartDTO(await this.cartService.insertProduct(insertProductDTO, userId));
    }

    @Get()
    @UsePipes(ValidationPipe)
    async findCartByUserID(@UserID() userID: number): Promise<ReturnCartDTO> {
        return new ReturnCartDTO(await this.cartService.findCartByUserID(userID, true))
    }

    @Delete()
    @UsePipes(ValidationPipe)
    async deleteCart(@UserID() userID: number): Promise<DeleteResult> {
        return await this.cartService.clearCart(userID)
    }

    @Delete('/product/:productID')
    @UsePipes(ValidationPipe)
    async deleteCartProduct(@UserID() userID: number, @Param('productID') productID: number): Promise<DeleteResult>{
        return await this.cartService.deleteCartProduct(productID, userID);
    }

    @Patch()
    @UsePipes(ValidationPipe)
    async updateCartProduct(@Body() updateCartProduct: UpdateCartDTO, @UserID() userId: number ): Promise<ReturnCartDTO> {
        return new ReturnCartDTO(await this.cartService.updateCartProduct(updateCartProduct, userId))
    }
}
