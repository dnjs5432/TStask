import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, name, password } = signUpDto;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 가입 된 이메일입니다.');
    }

    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      email,
      password: hashedPassword,
      name,
    });
    return { message: '가입이 성공적으로 완료되었습니다.' };
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일이 일치하지 않습니다.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
