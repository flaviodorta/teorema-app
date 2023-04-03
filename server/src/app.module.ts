import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './features/auth/auth.module';
import { AuthController } from './features/auth/controllers/auth.controllers';
import { AuthService } from './features/auth/services/auth.service';
import { UserController } from './features/user/controllers/user.controller';
import { UserModule } from './features/user/user.module';
import { UserService } from './features/user/services/user.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'teorema',
      password: 'password',
      database: 'db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
