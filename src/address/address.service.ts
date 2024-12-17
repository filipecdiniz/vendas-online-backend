import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDTO } from './DTOs/CreateAddressDTO.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService
    ) { }

    async createAdress(createAddressDTO: CreateAddressDTO, userId: number): Promise<AddressEntity> {
        await this.userService.findUserById(userId);
        await this.cityService.findCityByCityId(createAddressDTO.cityId);

        return this.addressRepository.save({
            ...createAddressDTO,
            userId,
        })
    }

    async findAdressByUserId(userId: number): Promise<AddressEntity[]> {
        const addresses: AddressEntity[] | undefined = await this.addressRepository.find({
            where: {
                userId
            },
            relations: {
                city: {
                    state: true
                }
            }
        })

        if (!addresses || addresses.length < 1) {
            throw new NotFoundException(`Address not found for UserId: ${userId}`)
        }

        return addresses
    }
}
