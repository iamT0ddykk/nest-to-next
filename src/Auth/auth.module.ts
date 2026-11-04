import { InternalServerErrorException, Module } from '@nestjs/common';
import { commonModule } from '../common/pipes/common.module.js';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';

@Module({
  imports: [
    UserModule,
    commonModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
          throw new InternalServerErrorException('nao tem secret, imbecil');
        }

        return {
          secret,
          signOptions: {
            expiresIn: (process.env.JWT_EXPIRATION as any) || '1d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
