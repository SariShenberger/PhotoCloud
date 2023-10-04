
import { User } from 'src/user/entities/user.entity';
import { Image } from 'src/image/entities/image.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  idcategory: number;

  @Column()
  category_description:string;

 @ManyToOne(() => User, (user) => user.categories)
 user: User;

 @OneToMany(() => Image,(image)=>image.category.idcategory)
 images:Image[];
}