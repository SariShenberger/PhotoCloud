import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { response } from 'express';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.name, signInDto.password);
    }
    @Public()
    @Post('signup')
    signup(@Body() signUpDto: CreateUserDto) {
      return this.authService.signup(signUpDto);
    }
}
