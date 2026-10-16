import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  getHello(loginDto: LoginDto): string {
    console.log(loginDto);
    return 'ola auth!';
  }
}
