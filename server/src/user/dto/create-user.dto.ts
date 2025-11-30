import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email!: string;

  @IsString({ message: 'Mật khẩu là bắt buộc' })
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  password!: string;
}
