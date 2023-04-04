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

    return await this.signAccessToken({ id, email });
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

    return await this.signAccessToken({ id, email });
  }

  async signAccessToken(
    dto: SignAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const payload = { sub: dto.id, email: dto.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
