import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
import { ImageModule } from './image/image.module';
import { Person } from './person/entities/person.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Image } from './image/entities/image.entity';

@Module({
  imports: [UserModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mysql',
    database: 'photo',
    entities: [User,Person,Category, Image],
    synchronize: true,
    autoLoadEntities: true,
  }), AuthModule, PersonModule, ImageModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {
  constructor(private dataSource: DataSource) {}
}

