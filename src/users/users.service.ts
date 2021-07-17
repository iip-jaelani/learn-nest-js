import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, // @InjectConnection() private readonly connection: Connection,
  ) {}

  public async create(userDto: UserDto): Promise<User> {
    const user = this.userModel.create(userDto);
    return user;
  }
  public async findAllUser(): Promise<UserDocument[]> {
    const users = this.userModel.find().exec();
    if (!users && !users[0]) {
      throw new HttpException('User not found', 404);
    }
    return users;
  }

  public async findOne(username: string): Promise<User> {
    const user = this.userModel.findOne({ username });
    return user;
  }
}
