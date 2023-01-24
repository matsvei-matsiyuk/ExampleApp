import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/DTO/createUser.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginUserDto } from 'src/users/DTO/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.authService.signup(createUserDto);
    return this.authService.login(createUserDto.email);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/log-in')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.email);
  }
}
