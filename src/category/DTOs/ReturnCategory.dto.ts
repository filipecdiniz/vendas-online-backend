import { CategoryEntity } from "../Entities/category.entity";

export class ReturnCategoryDTO {
    id: number;
    name: string;

    constructor(category: CategoryEntity){
        this.id = category.id
        this.name = category.name
    }
}