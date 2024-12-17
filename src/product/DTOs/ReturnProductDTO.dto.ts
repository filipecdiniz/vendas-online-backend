import { ProductEntity } from "../Entities/product.entity";

export class ReturnProductDTO {
    id: number;
    name: string;
    price: number;
    image: string;

    constructor(product: ProductEntity){
        this.id = product.id
        this.name = product.name
        this.price = product.price
        this.image = product.image
    }
}