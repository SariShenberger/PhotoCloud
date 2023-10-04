import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UserModule, 
    JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    // signOptions: { expiresIn: '15m' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],

})
export class AuthModule {}
