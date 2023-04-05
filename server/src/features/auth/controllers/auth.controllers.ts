import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() dto: SignInDto): Promise<any> {
    return this.authService.signIn(dto);
  }

  @Post('/sign-up')
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body() dto: SignUpDto): Promise<any> {
    return this.authService.signUp(dto);
  }
}
