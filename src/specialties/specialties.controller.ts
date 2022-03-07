import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post('createSpecialties')
  create(@Body(ValidationPipe) createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get('getAllSpecialties')
  findAll() {
    return this.specialtiesService.findAll();
  }

  @Get('findSpecialtiesById/:id')
  findSpecialtiesById(@Param('id') id: string){
    return this.specialtiesService.findSpecialtiesById(id);
  }

  @Get('findOneByName/:name')
  findOneByName(@Param('name') name: string) {
    return this.specialtiesService.findSpecialtiesByName(name);
  }

  @Patch('updateSpecialty/:id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtiesService.update(id, updateSpecialtyDto);
  }

  @Delete('softDelete/:id')
  remove(@Param('id') id: string) {
    return this.specialtiesService.remove(id);
  }
}
