import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail(
    {},
    {
      message: 'email invalido',
    },
  )
  email: string;

  @IsString({
    message: 'senha invalida',
  })
  @IsNotEmpty({
    message: 'precisa conter algo',
  })
  senha: string;
}
