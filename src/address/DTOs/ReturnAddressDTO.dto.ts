import { ReturnCityDTO } from "src/city/DTOs/ReturnCityDTO.dto";
import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDTO {
    id: number;
    complement: string;
    number: number;
    cep: string;
    city?: ReturnCityDTO;

    constructor(address: AddressEntity) {
        this.id = address.id;
        this.complement = address.complement;
        this.number = address.number;
        this.cep = address.cep;
        this.city = address.city ? new ReturnCityDTO(address.city) : undefined;
    }
}