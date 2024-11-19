import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/CreateUserDTO';
import UserService from './user.service';
import { UserEntity } from './Entities/user.entity';


@Controller('user')
export class UserController {
    constructor( private readonly UserService: UserService ) {}

    @Get('')
    async getAllUsers(): Promise<UserEntity[]>{
        return this.UserService.getAllUsers();
    }

    @Post('')
    async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
        return this.UserService.createUser(createUser);
    }
}
