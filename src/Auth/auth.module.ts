import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module.js';
import { commonModule } from '../common/pipes/common.module.js';
import { UserService } from '../user/user.service.js';

@Module({
  imports: [UserService, commonModule],
})
export class AuthModule {}
