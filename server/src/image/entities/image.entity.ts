import { Category } from 'src/category/entities/category.entity';
import { Person } from 'src/person/entities/person.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import{ IsNotEmpty, IsEmail ,isDate}from 'class-validator';
import { type } from 'os';
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  idimage: number;
  
  @Column()
  image_name: string;

  @Column()
  image_url: string;
 
  @Column()
  image_creation_date:Date;

  @ManyToOne(type => Category, (category) => category.images, { onDelete: 'CASCADE' })
  category: Category;

  @ManyToMany(() => Person, (person) => person.images,{cascade: true, onDelete: 'CASCADE'})
  @JoinTable()
  _: Person[];
}

