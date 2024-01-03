import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class SignUpDto extends PickType(User, ['email', 'password', 'name']) {}
