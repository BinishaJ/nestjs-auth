import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './role.guard';
import { CONSTANTS } from './constants';

@Controller('app')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): string {
    return this.authService.generateToken(req.user);
  }

  @Get('/admin')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.ADMIN))
  adminRoute(@Request() req): string {
    return 'admin route' + JSON.stringify(req.user);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.USER))
  userRoute(@Request() req): string {
    return 'user route' + JSON.stringify(req.user);
  }
}
