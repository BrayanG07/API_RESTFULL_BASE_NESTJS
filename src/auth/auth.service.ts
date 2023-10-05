import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, UserRequest } from './interfaces';
import { STATUS_USER } from '../constants';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async isAuthorizedUser(idUser: string): Promise<UserRequest> {
    const user = await this.userService.findUserAuthById(idUser);

    if (!user) throw new UnauthorizedException('Token no valido.');

    if (user.status === STATUS_USER.INACTIVE)
      throw new UnauthorizedException(
        'El usuario está inactivo, comunicate con un administrador.',
      );

    return {
      ...user,
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const userLogin = await this.userService.loginUser(loginUserDto);

    return {
      user: loginUserDto,
      token: this.getJwtToken({
        idUser: userLogin.idUser,
      }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
