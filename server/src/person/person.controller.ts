import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { JwtService } from '@nestjs/jwt';

type req = Request;

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService,private readonly jwtService: JwtService) {}

  @Post()
 async create(@Body() person: Person,@Req() req: req) {
    return await this.personService.create(person, req['user']);
  }

  @Get()
   async  findAll(@Req() req: req) {
    return this.personService.findAll(req['user']);
  }

  @Get('/byName/:name')
  findOne(@Param('name') name: string, @Req() req: req) {
    return this.personService.findOne(name, req['user']);
  }
  @Get(':id')
  findOneById(@Param('id') id: number, @Req() req: req) {
    const res= this.personService.findOneById(+id, req['user']);
    return res;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() newPerson: Person, @Req() req: req) {
    return this.personService.update(+id, req['user'], newPerson);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: req) {
    return this.personService.remove(+id, req['user']);
  }

  
}
