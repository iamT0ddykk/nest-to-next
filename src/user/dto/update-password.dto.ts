import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({
    message: 'precisa conter algo',
  })
  @IsString({ message: 'precisa ser string' })
  currentPassword: string;

  @IsNotEmpty({
    message: 'precisa conter algo',
  })
  @IsString({ message: 'precisa ser string' })
  @MinLength(6, { message: 'no minimo 6 caracteres ' })
  newPassword: string;
}
