import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDTO } from './DTOs/CreateAddressDTO.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum'; 
import { UserID } from 'src/decorators/userID.decorator';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService) { }

    @Post()
    @Roles(UserType.User)
    @UsePipes(ValidationPipe)
    async createAddress(@Body() createAddressDTO: CreateAddressDTO, @UserID() userId: number): Promise<AddressEntity> {
        return await this.addressService.createAdress(createAddressDTO, userId);
    }
}
