import { InternalServerErrorException, Module } from '@nestjs/common';
import { commonModule } from '../common/pipes/common.module.js';
import { UserService } from '../user/user.service.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    
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
  providers: [UserService],
})
export class AuthModule {}
