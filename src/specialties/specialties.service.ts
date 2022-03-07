import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialties } from './entities/specialties.entity';
import { SpecialtiesRepository } from './specialties.repository';

@Injectable()
export class SpecialtiesService {
  constructor(@InjectRepository(SpecialtiesRepository)
  private specialtiesRepository: SpecialtiesRepository ){}
  
  async create(data: CreateSpecialtyDto) {
    const userSpecialties = await this.specialtiesRepository.createSpecialties(data);

    if(!userSpecialties){
      throw new InternalServerErrorException('Problem to create a specialties,Specialty already created, Try again')
    }
    return userSpecialties;
  }

  async findAll(): Promise<Specialties[]> {
    const specialties = await this.specialtiesRepository.find({select: ['name','id']});

    return specialties;
    
  }

  async findSpecialtiesById(id: string ) {
    
    const specialties = await this.specialtiesRepository.findOne( {
      where : {id},
      select : ['id','name'],
    } );
    console.log(specialties)

    if(!specialties){
      throw new NotFoundException('Specialties not found'); 
    }
    return specialties;
  }


  async findSpecialtiesByName(name: string ) {
    
    const specialties = await this.specialtiesRepository.findOne({name}, {
      select: ['name']
    } );
    console.log(specialties)

    if(!specialties){
      throw new NotFoundException('Specialties not found'); 
    }
    return specialties;
  }

  async update(id: string, updateSpecialtyDto: UpdateSpecialtyDto) {
    return await this.specialtiesRepository.updateSpecialty(updateSpecialtyDto, id);
  }

  async remove(id: string) {
    const data = await this.specialtiesRepository.findOne(id)
    if(!data){
      throw new NotFoundException('Specialties not found'); 
    }
    return await this.specialtiesRepository.softRemove(data);
  }
}
