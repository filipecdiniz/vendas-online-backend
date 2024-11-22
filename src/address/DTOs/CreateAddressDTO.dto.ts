import { IsInt, IsOptional, IsString } from "class-validator";


export class CreateAddressDTO {
    @IsString()
    @IsOptional()
    complement: string;

    @IsInt()
    number: number;

    @IsString()
    cep: string;

    @IsInt()
    cityId: number;
}