import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDTO {
    complement: string;
    number: number;
    cep: string;
    city?: any;

    constructor(address: AddressEntity) {
        this.complement = address.complement
        this.number = address.number
        this.cep = address.cep
        // this.city = address.cityId
    }
}