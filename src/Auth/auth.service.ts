import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { HashingService } from '../common/hashing/hashing.service.js';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { jwtPayloadType } from '../types/jwt-payload-type.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
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

    const jwtPayload: jwtPayloadType = {
      sub: user.id,
      email: user.email,
    };

    const acessToken = await this.jwtService.signAsync(jwtPayload);

    return acessToken;
  }
}
