import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { HashingService } from '../common/hashing/hashing.service.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(dto: CreateUserDto) {
    const existsEmail = await this.userRepository.exists({
      where: {
        email: dto.email,
      },
    });

    if (existsEmail) {
      throw new ConflictException('email ja existe');
    }

    const hashedPassword = await this.hashingService.hash(dto.password);

    const newUser: CreateUserDto = {
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    };

    const created = this.userRepository.save(newUser);

    console.log(created);
    return created;
  }
}
