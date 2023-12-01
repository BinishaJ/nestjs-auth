import { PassportStrategy } from '@nestjs/passport/dist';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  validate(username: string, password: string): User {
    //check for username and password
    const user: User = this.userService.getUserByUsername(username);
    if (user === undefined) throw new UnauthorizedException();
    if (user != undefined && user.password == password) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
