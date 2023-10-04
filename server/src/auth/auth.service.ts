
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(username, pass) {
        const user = await this.userService.findOne(username);
        if (!(user && await bcrypt.compare(pass, user.user_password)))
            throw new BadRequestException('No match between username and password was found');

        const payload = { user };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signup(signUpDto: CreateUserDto) {
        const userCreate = await this.userService.create(signUpDto);
        console.log("created: ", userCreate);
        // const user: User = {
        //     iduser: userCreate.identifiers[0].iduser, user_name: signUpDto.name, user_password: await bcrypt.hash(signUpDto.password, 10), user_email: signUpDto.email
        // };
        //TODO it find Needless
        const user = await this.userService.findOne(signUpDto.name,);
        const payload = { user };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };


    }
}