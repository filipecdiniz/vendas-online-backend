import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnUserDTO } from 'src/user/DTOs/ReturnUserDTO.dto';
import { LoginDTO } from './DTOs/LoginDTO.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UsePipes(ValidationPipe)
    @Post('login')
    async login(@Body() loginDTO: LoginDTO): Promise<ReturnUserDTO> {
        return new ReturnUserDTO(await this.authService.login(loginDTO));
    }
}
