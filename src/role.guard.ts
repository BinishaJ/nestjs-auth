import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RoleGuard implements CanActivate {
  private rolePassed: string;
  constructor(role: string) {
    this.rolePassed = role;
  }

  canActivate(context: ExecutionContext): boolean {
    //check if the user is authorized to access the route based on role
    const ctx = context.switchToHttp();
    const request: any = ctx.getRequest<Request>();
    return this.rolePassed == request.user.role;
  }
}
