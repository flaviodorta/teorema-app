import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/constants';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/services/user.service';
import { AuthController } from './controllers/auth.controllers';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConfig.SECRET,
      signOptions: { expiresIn: '10000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [],
})
export class AuthModule {}
