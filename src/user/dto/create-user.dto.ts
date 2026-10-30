import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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
  name: string;

  @IsNotEmpty({
    message: 'precisa conter algo',
  })
  @IsString({ message: 'precisa ser string' })
  password: string;
}
