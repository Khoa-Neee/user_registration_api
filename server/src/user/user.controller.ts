import { Body, Controller, HttpCode, HttpStatus, Options, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Options('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  // Xử lý preflight CORS để tránh lỗi OPTIONS trên môi trường deploy
  handleRegisterOptions() {
    return;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);
    return {
      message: 'Đăng ký thành công',
      data: user,
    };
  }
}
