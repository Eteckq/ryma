import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role.guard';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET_KEY,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,   {
    provide: APP_GUARD,
    useClass: RoleGuard,
  },]
})
export class AuthModule { }
