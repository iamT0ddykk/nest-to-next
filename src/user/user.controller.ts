import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './user.service.js';
import { jwtAuthGuard } from '../Auth/guards/jwt-auth.guard.js';
import { AuthenticRequest } from '../types/authentic-request.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(jwtAuthGuard)
  @Get(':id')
  getById(@Req() req: AuthenticRequest, @Param('id', ParseIntPipe) id: number) {
    console.log(req.user.email);

    return `OI do user ${id}`;
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(jwtAuthGuard)
  @Patch('me')
  update(@Req() req: AuthenticRequest, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }
}
