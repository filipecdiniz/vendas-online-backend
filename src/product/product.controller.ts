import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ProductService } from './product.service';
import { ReturnProductDTO } from './DTOs/ReturnProductDTO.dto';
import { CreateProductDTO } from './DTOs/CreateProductDTO.dto';
import { ProductEntity } from './Entities/product.entity';
import { UpdateProductDTO } from './DTOs/UpdateProductDTO';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async findAllProducts():Promise<ReturnProductDTO[]>{
        return (await this.productService.findAllProducts()).map((product) => new ReturnProductDTO(product));
    }

    @Post()
    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    async createProduct(@Body() createProductDTO: CreateProductDTO): Promise<ProductEntity>{
        return await this.productService.createProduct(createProductDTO);
    }

    @Roles(UserType.Admin)
    @Delete('/:productId')
    async deleteProduct(@Param('productId') productId: number) {
        return await this.productService.deleteProductById(productId);
    }

    @Roles(UserType.Admin)
    @Put('/:productId') 
    async updateProduct(@Body() updateProductDTO: UpdateProductDTO, @Param('productId') productId: number) {
        return await this.productService.updateProduct(updateProductDTO, productId);
    }

}
