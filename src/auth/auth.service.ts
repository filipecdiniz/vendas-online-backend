import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/Entities/user.entity';
import { LoginDTO } from './DTOs/LoginDTO.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { ReturnLoginDTO } from './DTOs/ReturnLoginDTO.dto';
import { ReturnUserDTO } from 'src/user/DTOs/ReturnUserDTO.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDTO } from './DTOs/LoginPayloadDTO.dto';

@Injectable()
export class  AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {

    }

    async login(loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDTO.email).catch(() => undefined)

        const validator = await compare(loginDTO.password, user?.password || '')

        if(!user || !validator) {
            throw new NotFoundException(`Email or password invalid!`)
        }

        return {
            accessToken: this.jwtService.sign({... new LoginPayloadDTO(user)}),
            user: new ReturnUserDTO(user)
        }

    }
}
