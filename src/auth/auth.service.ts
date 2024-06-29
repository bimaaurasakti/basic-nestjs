import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    } 
    return null;
  }

  async signIn(user: any) {
    const { username, _id } = user._doc;
    const payload = { username, sub: _id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({ username, password: hashedPassword });
  }
}
