import { CartEntity } from "../Entities/cart.entity";
import { ReturnCartProductDTO } from "src/cart_product/DTOs/ReturnCartProductDTO.dto";

export class ReturnCartDTO {
    id: number;
    cartProduct?: ReturnCartProductDTO[];

    constructor(cart: CartEntity) {
        this.id = cart.id;
        this.cartProduct = cart.cartProduct ? cart.cartProduct.map(product => new ReturnCartProductDTO(product)) : undefined;
    }
}