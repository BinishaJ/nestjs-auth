import { PassportStrategy } from '@nestjs/passport/dist';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWTtutorial',
    });
  }

  validate(payload: any): any {
    //validates the jwt token
    return payload;
  }
}
