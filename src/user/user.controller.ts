import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './user.service.js';
import { jwtAuthGuard } from '../Auth/guards/jwt-auth.guard.js';
import { AuthenticRequest } from '../types/authentic-request.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';
import { UserResponseDto } from '../post/dto/user-response.dto.js';

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(jwtAuthGuard)
  @Get('me')
  async getById(@Req() req: AuthenticRequest) {
    const user = await this.userService.findOneByOrFail({ id: req.user.id });
 
    return new UserResponseDto(user);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    return new UserResponseDto(user);
  }

  @UseGuards(jwtAuthGuard)
  @Patch('me')
  async update(@Req() req: AuthenticRequest, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(req.user.id, dto);

    return new UserResponseDto(user);
  }

  @UseGuards(jwtAuthGuard)
  @Patch('me/password')
  async updatePassword(
    @Req() req: AuthenticRequest,
    @Body() dto: UpdatePasswordDto,
  ) {
    const user = await this.userService.updatePassword(req.user.id, dto);

    return new UserResponseDto(user);
  }
}
