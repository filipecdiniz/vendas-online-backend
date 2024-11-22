import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/CreateUserDTO.dto';
import { UserService } from './user.service';
import { UserEntity } from './Entities/user.entity';
import { ReturnUserDTO } from './DTOs/ReturnUserDTO.dto';


@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Get('')
    async getAllUsers(): Promise<ReturnUserDTO[]> {
        return (await this.UserService.getAllUsers()).map(
            (userEntity) => new ReturnUserDTO(userEntity)
        );
    }

    @Post('')
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
        return this.UserService.createUser(createUser);
    }

    @Get('/:userId')
    async findUserById(@Param('userId') userId: number): Promise<ReturnUserDTO> {
        return new ReturnUserDTO(await this.UserService.findUserByIdUsingRelations(userId));
    }
}
