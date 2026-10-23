import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail(
    {},
    {
      message: 'email invalido',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'precisa conter algo',
  })
  @IsString({ message: 'precisa ser string' })
  senha: number;
}
