import { ProductEntity } from "src/product/Entities/product.entity";
import { CartProductEntity } from "../Entities/cart_product.entity";
import { ReturnProductDTO } from "src/product/DTOs/ReturnProductDTO.dto";
import { ReturnCartDTO } from "src/cart/DTOs/ReturnCartDTO.dto";

export class ReturnCartProductDTO {
    id: number;
    productID: number;
    amount: number;
    product?: ReturnProductDTO;
    cart?: ReturnCartDTO;

    constructor(cartProduct: CartProductEntity){
        this.id = cartProduct.id;
        this.productID = cartProduct.productId;
        this.amount = cartProduct.amount
        this.product = cartProduct.product ? new ReturnProductDTO(cartProduct.product) : undefined;
        this.cart = cartProduct.cart ? new ReturnCartDTO(cartProduct.cart) : undefined;
    }
}