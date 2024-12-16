import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnUserDTO } from 'src/user/DTOs/ReturnUserDTO.dto';
import { LoginDTO } from './DTOs/LoginDTO.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDTO } from './DTOs/ReturnLoginDTO.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UsePipes(ValidationPipe)
    @Post('login')
    async login(@Body() loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
        return await this.authService.login(loginDTO);
    }
}
