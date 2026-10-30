import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { commonModule } from '../common/pipes/common.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([User]), commonModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
