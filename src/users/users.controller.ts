import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User, UserDocument } from 'src/schema/user.schema';
import { UserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async findAll(): Promise<UserDocument[]> {
    return await this.usersService.findAllUser();
  }

  @Post('/create')
  async createUser(@Body() data: UserDto): Promise<User | any> {
    const findUsers = await this.usersService.findOne(data.email);
    if (findUsers) {
      return {
        error: true,
        message: 'email already exist',
      };
    }
    const results = await this.usersService.create(data);
    return {
      error: false,
      message: 'success create account',
      data: results,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
