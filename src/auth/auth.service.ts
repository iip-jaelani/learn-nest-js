import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username?: string, pass?: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log({ user }, '--data');
    if (user && user.password === pass) {
      const { username, email, role_id } = user;
      return {
        username,
        email,
        role_id,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
