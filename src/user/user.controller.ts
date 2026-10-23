import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: string) {
    throw new UnauthorizedException('opa');
    return `OI do user ${id}`;
  }
}
