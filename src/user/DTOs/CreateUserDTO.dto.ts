import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDTO {
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsString()
    cpf: string;

    @IsString()
    phone: string;

    @IsString()
    @Length(6, 20)
    password: string;
}