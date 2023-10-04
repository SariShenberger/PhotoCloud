import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) { }

  async create(person: Person, user: User) {
    const find = await this.findOne(person.person_name, user);
    //If the person name already exists- throw error
    if (find) {
      throw new BadRequestException("The person name already exists");
    }
    //TODO
    person.person_date_of_birth = new Date(person.person_date_of_birth);
    person.user = user;
    //If the date is not strong- throw error
    if (!this.hasDatePassed(person.person_date_of_birth)) {
      throw new BadRequestException("One of the data is wrong");
    }

    return this.personRepository.save(person);
  }

  async findAll(user: User) {
    console.log("user in person: ",user);
    return await this.personRepository.findBy({ user: user })
  }

  async findOne(name: string, user: User) {
    return await this.personRepository.findOneBy({ user: user, person_name: name });
  }


  async findOneById(id: number, user: User) {
    const find = await this.personRepository.findOneBy({ user: user, idperson: id });
    if (!find) {
      throw new BadRequestException("the id person is not exists.");
    }
    return find;
  }

  async update(id: number, user: User, newPerson: Person) {
    const find= await this.findOne(newPerson.person_name,user);
    if(!find ||find.idperson===id)
    return await this.personRepository.update({ user: user, idperson: id }, newPerson);
    throw new BadRequestException("the name of person already exists.");
  }

  async remove(id: number, user: User) {
    return await this.personRepository.delete({ user: user, idperson: id });
  }

  hasDatePassed(date: Date): boolean {
    const today = new Date();
    return date <= today;
  }
}
