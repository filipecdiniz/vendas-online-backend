import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/CreateUserDTO.dto';
import { UserService } from './user.service';
import { UserEntity } from './Entities/user.entity';
import { ReturnUserDTO } from './DTOs/ReturnUserDTO.dto';
import { UpdatePasswordDTO } from './DTOs/UpdatePassword.dto';
import { UserID } from 'src/decorators/userID.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';


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
    @UsePipes(ValidationPipe)
    async findUserById(@Param('userId') userId: number): Promise<ReturnUserDTO> {
        return new ReturnUserDTO(await this.UserService.findUserByIdUsingRelations(userId));
    }

    @Patch()
    @Roles(UserType.Admin, UserType.User)
    @UsePipes(ValidationPipe)
    async updateUserPassword(@UserID() userId: number, @Body() updatePasswordDTO: UpdatePasswordDTO): Promise<UserEntity> {
        return await this.UserService.updateUserPassword(updatePasswordDTO, userId);
    }
}
