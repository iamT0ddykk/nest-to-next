import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { HashingService } from '../common/hashing/hashing.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async findOneByOrFail(userData: Partial<User>) {
    const user = await this.userRepository.findOneBy(userData);

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return user;
  }

  async failIfEmailExists(email: string) {
    const existsEmail = await this.userRepository.exists({
      where: {
        email,
      },
    });

    if (existsEmail) {
      throw new ConflictException('email ja existe');
    }
  }

  async create(dto: CreateUserDto) {
    await this.failIfEmailExists(dto.email);

    const hashedPassword = await this.hashingService.hash(dto.password);

    const newUser: CreateUserDto = {
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    };

    const created = this.userRepository.save(newUser);

    return created;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  save(user: User) {
    return this.userRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!dto.email && !dto.name) {
      throw new BadRequestException('envie algo');
    }

    const user = await this.findOneByOrFail({ id }); // {} pra ir direto no campo de id

    user.name = dto.name ?? user.name;

    if (dto.email && dto.email !== user.email) {
      await this.failIfEmailExists(dto.email);

      user.email = dto.email; //nao precisar verificar se tem user email pq  ja verifica if(!dto.email)
      user.forceLogout = true;
      console.log(dto);
    }

    return user;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    

    const user = await this.findOneByOrFail({ id }); // {} pra ir direto no campo de id



    return user;
  }
}
