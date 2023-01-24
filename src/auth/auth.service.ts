import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/DTO/createUser.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const userByEmail = await this.usersService.getUserByEmail(
      createUserDto.email,
    );
    if (userByEmail) {
      throw new HttpException(
        'User with this email is already registered.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.createUser(createUserDto);
  }

  async login(email: string) {
    const userByEmail = await this.usersService.getUserByEmail(email);
    const payload = { email: userByEmail.email, sub: userByEmail.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
