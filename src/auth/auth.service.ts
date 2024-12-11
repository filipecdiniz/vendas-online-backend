import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/Entities/user.entity';
import { LoginDTO } from './DTOs/LoginDTO.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ) {

    }

    async login(loginDTO: LoginDTO): Promise<UserEntity> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDTO.email).catch(() => undefined)

        const validator = await compare(loginDTO.password, user?.password || '')

        if(!user || !validator) {
            throw new NotFoundException(`Email or password invalid!`)
        }

        return user

    }
}
