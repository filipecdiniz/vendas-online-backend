import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnCategoryDTO } from './DTOs/ReturnCategory.dto';
import { CategoryService } from './category.service';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateCategoryDTO } from './DTOs/CreateCategory.dto';
import { CategoryEntity } from './Entities/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDTO[]> {
        return (await this.categoryService.findAllCategories()).map(category => new ReturnCategoryDTO(category));
    }

    @Post()
    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDTO : CreateCategoryDTO): Promise<CategoryEntity> {
        return await this.categoryService.createCategory(createCategoryDTO);
    }
}
