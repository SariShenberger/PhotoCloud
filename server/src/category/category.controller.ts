import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,private readonly jwtService:JwtService) {}

  @Post()
  async create(@Req() request: Request,@Body() category: Category) {
    return await this.categoryService.create(request['user'],category);
  }

  @Get()
  async findAll(@Req() request: Request): Promise<Category[]> {
    return await this.categoryService.findAll(request['user']);
  }

  @Get(':id')
  async findOne(@Param('id') id: number,@Req() request: Request) {
    return await this.categoryService.findOne(request['user'],+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: Category,@Req() request: Request) {
    return await this.categoryService.update(request['user'],+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Req() request: Request) {
    return await this.categoryService.remove(request['user'],+id);
  }
}
