import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('login')
  // login(@Body() name: string, password:string) {
  //   return this.userService.login(name, password);
  // }
  @Post()
   async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }
  @Get()
   async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.userService.findOneById(+id);
  }
  @Get('/byName/:name')
  async findOne(@Param('name') name: string) {
    return await this.userService.findOne(name);
  }  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
