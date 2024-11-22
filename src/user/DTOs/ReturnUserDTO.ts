import { UserEntity } from "../Entities/user.entity";

export class ReturnUserDTO {
    id: number
    name: string;
    email: string;
    cpf: string;
    phone: string;

    constructor(userEntity: UserEntity){
        this.id = userEntity.id
        this.name = userEntity.name
        this.cpf = userEntity.cpf
        this.email = userEntity.email
        this.phone = userEntity.phone
    }
}