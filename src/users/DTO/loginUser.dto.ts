import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @Length(0, 320)
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;
}
