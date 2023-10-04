import { Controller, Get, Post, Body, Patch, Param, Delete ,Req} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { JwtService } from '@nestjs/jwt';

type req = Request;

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService,private readonly jwtService: JwtService) {}

  @Post()
  create(@Body() image: Image, @Req() req:req) {
    return this.imageService.create(image, req['user']);
  }

  @Get()
  findAll( @Req() req:req) {
    console.log(req['user']);
    return this.imageService.findAll( req['user'].iduser);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req:req) {
    return this.imageService.findOne(+id, req['user'].iduser);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() image: Image, @Req() req:req) {
    return this.imageService.update(+id, image, req['user']);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req:req) {
    return this.imageService.remove(+id, req['user'].iduser);
  }
 
}
