import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDTO } from './DTOs/CreateAddressDTO.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService) { }

    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(@Body() createAddressDTO: CreateAddressDTO, @Param('userId') userId: number): Promise<AddressEntity> {
        return await this.addressService.createAdress(createAddressDTO, userId);
    }
}
