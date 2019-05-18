import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from './../config';
import { User, UsersService } from './../user';
import { LoginUserDto } from './dto/login.dto';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async createToken(user: User) {
    const accessToken = await this.jwtService.signAsync(
      Object.assign({}, user),
    );
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken,
    };
  }

  async validateUser(payload: LoginUserDto): Promise<User> {
    const user = await this.userService.findOneByEmail(payload.email);
    const isPasswordValid =
      user &&
      createHmac('sha256', payload.password).digest('hex') === user.password;
    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Wrong login combination!');
    }
    return user;
  }
}
