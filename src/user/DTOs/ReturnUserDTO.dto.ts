import { ReturnAddressDTO } from "src/address/DTOs/ReturnAddressDTO.dto";
import { UserEntity } from "../Entities/user.entity";

export class ReturnUserDTO {
    id: number
    name: string;
    email: string;
    cpf: string;
    phone: string;
    addresses?: ReturnAddressDTO[];

    constructor(userEntity: UserEntity){
        this.id = userEntity.id
        this.name = userEntity.name
        this.cpf = userEntity.cpf
        this.email = userEntity.email
        this.phone = userEntity.phone
        this.addresses = userEntity.addresses ? userEntity.addresses.map((adress) => new ReturnAddressDTO(adress)) : undefined;
    }
}