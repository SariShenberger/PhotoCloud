import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Any, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CategoryService {
  static findOne(idUser: number, image_: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async create(user: User, category: Category) {
    const find: Category = (await this.findAll(user))?.filter(c => category.category_description === c?.category_description)[0] ?? undefined;
    if (find)
      throw new BadRequestException("the name category already exist");
    category.user = user;
    return await this.categoryRepository.save(category);
  }

  async findAll(user: User) {
      return await this.categoryRepository.findBy({user:user});

    // return await this.categoryRepository.findBy({user:{iduser:userId}});
    // return await this.categoryRepository.query("select * from photo.category where category_iduser = " + userId);
  }

  async findOne(user: User, id: number) {
    // const category: Category = (await this.categoryRepository.query("select * from photo.category where category_iduser = " + userId + " and idcategory = " + id))[0];
    const category: Category = await this.categoryRepository.findOneBy({user:user , idcategory:id})
    if (category) {
      return category;
    }
    throw new BadRequestException("the id of the category not exists");
  }

  async update(user: User, id: number, category: Category) {
   const find=  await this.categoryRepository.findOneBy({user:user, category_description:category.category_description});
   if(!find || find.idcategory===id)
    return await this.categoryRepository.update({idcategory:id,user:user}, category);
    throw new BadRequestException("the name of the category already exists");
  }

  async remove(user: User, id: number) {
    return await this.categoryRepository.delete({user:user , idcategory:id});
  }

}
