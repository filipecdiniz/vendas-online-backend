import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './Entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from './DTOs/CreateCategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) { }

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();

        if (!categories || categories.length < 1) {
            throw new NotFoundException(`Categories empty!`);
        }

        return categories;
    }

    async createCategory(createCategoryDTO: CreateCategoryDTO): Promise<CategoryEntity> {
        const categoryExists = await this.findCategoryByName(createCategoryDTO.name).catch(() => undefined);

        if (categoryExists) {
            throw new BadRequestException(`Category name ${createCategoryDTO.name} alredy exists!`);
        };

        return await this.categoryRepository.save({
            name: createCategoryDTO.name
        });
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = this.categoryRepository.findOne({
            where: { name }
        })

        if (!category) {
            throw new NotFoundException(`Category name ${name} doesn't exists!`);
        }

        return category
    }

    async findCategoryById(id: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {id}
        })

        if(!category){
            throw new NotFoundException(`Doesn't exist a category if id ${id}`)
        }

        return category
    }
}
