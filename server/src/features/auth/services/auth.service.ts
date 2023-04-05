import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/features/user/services/user.service';
import { SignAccessTokenDto } from '../dtos/sign-access-token.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<any> {
    const { email, password, name } = dto;

    const user = await this.userService.create({ email, name, password });

    const { id } = user;

    user.role = 'student';

    delete user.password;

    return {
      access_token: await this.signAccessToken({ id, email }),
      user,
    };
  }

  async signIn(dto: SignInDto): Promise<any> {
    const { email, password } = dto;

    const user = await this.userService.findOneBy({ email });

    if (!user) {
      throw new BadRequestException();
    }

    const { id } = user;

    if (!this.userService.comparePassword(password, user.password)) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return {
      access_token: await this.signAccessToken({ id, email }),
      user,
    };
  }

  async signAccessToken(dto: SignAccessTokenDto): Promise<string> {
    const payload = { sub: dto.id, email: dto.email };

    return await this.jwtService.signAsync(payload);
  }
}
