import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { HashingService } from '../common/hashing/hashing.service.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    const erro = new UnauthorizedException('Senha ou usuario invalido');

    if (!user) {
      throw erro;
    }

    const isPassValid = await this.hashingService.compare(
      loginDto.senha,
      user.password,
    );

    if (!isPassValid) {
      throw erro;
    }
  }
}
