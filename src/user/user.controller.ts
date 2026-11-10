import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './user.service.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const envValue = this.configService.get('TESTE', 'valor-padrao');
    return `OI do user ${id}, ${envValue}`;
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
