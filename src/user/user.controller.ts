import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':id')
  getById(@Param('id') id: string) {
    return `OI do user ${id}`;
  }
}
