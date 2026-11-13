import { User } from '../user/entities/user.entity.js';

export interface AuthenticRequest extends Request {
  user: User;
}
