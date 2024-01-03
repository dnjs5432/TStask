import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/signIn.dto';
import { UserInfo } from './utils/userInfo.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.userService.signUp(signUpDto);
  }

  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.userService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}
