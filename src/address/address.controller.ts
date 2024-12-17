import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDTO } from './DTOs/CreateAddressDTO.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum'; 
import { UserID } from 'src/decorators/userID.decorator';
import { ReturnAddressDTO } from './DTOs/ReturnAddressDTO.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(@Body() createAddressDTO: CreateAddressDTO, @UserID() userId: number): Promise<AddressEntity> {
        return await this.addressService.createAdress(createAddressDTO, userId);
    }

    @Get()
    @UsePipes(ValidationPipe)
    async findAdressByUserId(@UserID() userID: number): Promise<ReturnAddressDTO[]> {
        return (await this.addressService.findAdressByUserId(userID)).map(address => new ReturnAddressDTO(address))
    }
}
