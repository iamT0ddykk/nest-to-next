import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtPayloadType } from '../types/jwt-payload-type.js';
import { UserService } from '../user/user.service.js';
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new UnauthorizedException('sem autorizao (jwt-strategy)');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: jwtPayloadType) {
    const user = await this.userService.findById(payload.sub);

    if (!user || user.forceLogout) {
      throw new UnauthorizedException(
        'usuario nao existe, voce precisa fazer login',
      );
    }

    return user;
  }
}
