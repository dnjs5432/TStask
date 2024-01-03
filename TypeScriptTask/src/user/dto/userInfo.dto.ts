import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UserInfo extends PickType(User, ['email', 'name', 'point']) {}
