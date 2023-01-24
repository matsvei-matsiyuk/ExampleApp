import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users/users.entity';
import { CreateUserDto } from './DTO/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;
    return this.usersRepository.save(createUserDto);
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.getUserByEmail(email);
    if (user) {
      const isPassMatch = await bcrypt.compare(pass, user.password);
      if (isPassMatch) {
        return user.id;
      }
      return null;
    }
    return null;
  }
}
