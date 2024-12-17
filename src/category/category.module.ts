import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './Entities/category.entity'; 
import { CategoryController } from './category.controller';

@Module({
    providers: [CategoryService],
    exports: [CategoryService],
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [CategoryController]
}) export class CategoryModule { }
