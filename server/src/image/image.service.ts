import { BadRequestException, Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase-admin/app';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Person } from 'src/person/entities/person.entity';
import { CategoryService } from 'src/category/category.service';
import { PersonService } from 'src/person/person.service';

const app = initializeApp();

@Injectable()
export class ImageService {

  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private categoryService: CategoryService,
    private personService: PersonService
  ) { }

  async create(image: Image, user: User) {
    console.log(image);
    const find = (await this.findAll(user.iduser)).filter(img => img.image_name === image.image_name)[0];
    if (find)
      throw new BadRequestException(`the image name ${image.image_name} is already exists.`);
    if (await this.validImageProperties(image, user))
      return await this.imageRepository.save(image);
  }

  async findAll(idUser: number): Promise<Image[]> {
   
    const images: Image[] = await this.imageRepository
      .createQueryBuilder('image')
      .leftJoinAndSelect('image.category', 'category')
      .leftJoinAndSelect('image._', 'person')
      .leftJoinAndSelect('category.user', 'user')
      .where('user.iduser = :idUser', { idUser })
      .getMany();

    return images;
  }

  async findOne(id: number, idUser: number) {
    const find = (await this.findAll(idUser)).filter(img => img.idimage === id)[0];
    console.log(find, typeof(id),id)
    if (!find) {
      throw new BadRequestException(`this image not exists.`);
    }
    return find;
  }

  async update(id: number, image: Image, user: User) {
    await this.findOne(id, user.iduser)
    console.log("after findone" );
    const find = (await this.findAll(user.iduser)).filter(img => img.image_name === image.image_name && img.idimage !== id)[0];
    if (find) 
      throw new BadRequestException(`the image name ${image.image_name} is already exists.`);
    if (await this.validImageProperties(image, user)) {
      return await this.imageRepository.save(image);
    }

  }

  async remove(id: number, idUser: number) {
   await this.findOne(id, idUser)
    const res= await this.imageRepository.delete(id);
    console.log(res);
    return res;
  }

  private async validImageProperties(image: Image, user: User): Promise<boolean> {

    await this.categoryService.findOne(user, image.category.idcategory);

    for(let person of image._){
      await this.personService.findOneById(person.idperson,user)
    }
    return true;
  }
}
