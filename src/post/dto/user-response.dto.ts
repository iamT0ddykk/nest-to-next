import { User } from '../../user/entities/user.entity.js';

export class UserResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

//um constructor é uma funcao executada automaticamente ao instaciar essa classe, nesse exemplo ela recebe um valor do tipo User e alinha os dados de
