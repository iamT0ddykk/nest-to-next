import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(private readonly configService: ConfigService) {}
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: string) {
    return `OI do user ${id}, ${this.configService.getOrThrow('TESTE')}`;
  }
}
