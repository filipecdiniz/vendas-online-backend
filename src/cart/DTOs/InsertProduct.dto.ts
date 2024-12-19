import { IsNumber } from "class-validator";

export class InsertProductDTO {
    @IsNumber()
    productId: number;

    @IsNumber()
    amount: number;
}