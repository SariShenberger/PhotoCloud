import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Person } from 'src/person/entities/person.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { PersonService } from 'src/person/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, User, Person, Category])],
  controllers: [ImageController],
  providers: [ImageService, CategoryService, PersonService]
})
export class ImageModule {}
