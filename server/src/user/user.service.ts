import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    // Băm mật khẩu để giảm nguy cơ lộ thông tin nhạy cảm
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({
      email: createUserDto.email,
      password: hashedPassword,
    });

    return {
      id: user._id.toString(),
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
