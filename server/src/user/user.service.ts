import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(user: CreateUserDto) {
    const find = await this.findOne(user.name);
    //If the username already exists- throw error
    if (find) {
      throw new BadRequestException("Username already exists");
    }
    //If the password is not strong, or the email is incorrect or not empty- throw error
    if (!((this.isStrongPassword(user.password)) && (this.ValidateEmail(user.email) || user.email === ''))) {
      throw new BadRequestException("One of the data is wrong");
    }
    const userEntity = new User();
    userEntity.user_name = user.name;
    userEntity.user_email = user.email;
    userEntity.user_password = await bcrypt.hash(user.password, 10);
    return await this.usersRepository.insert(userEntity);
  }
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async findOneById(id: number) {
    // console.log("find id",(await this.usersRepository.findOne(id ,{relations: ['persons']})));
    return await this.usersRepository.findOneBy({ iduser: id });
  }
  async findOne(name: string) {
    return await this.usersRepository.findOneBy({ user_name: name });
  }

  async update(id: number, updateUserDto: User) {
    await this.usersRepository.query("UPDATE user SET user_name=?, user_email=? , user_password=? WHERE idUser=? ;",
    [updateUserDto.user_name, updateUserDto.user_email,await bcrypt.hash(updateUserDto.user_password, 10), id])
    return await this.findOneById(id);
  }

  async remove(id: number) {
    return await this.usersRepository.query("delete from user where iduser =?;", [id]);

  }

  isStrongPassword(password: string): boolean {
    // Regular expressions to check for a strong password
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    // Check if the password meets the requirements
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasNumber = numberRegex.test(password);

    return (
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      password.length >= 8
    );
  }
  ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }



}
