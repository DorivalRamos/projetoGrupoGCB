import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    const specialties = this.specialtiesRepository.create(data);
    const userSpecialties = await this.specialtiesRepository.createSpecialties(specialties);

    if(!userSpecialties){
      throw new InternalServerErrorException('Problem to create a user, Try again')
    }
    return userSpecialties;
  }

  async findAll(): Promise<Specialties[]> {
    const specialties = await this.specialtiesRepository.find({relations: ['user']});

    return specialties;
    
  }

  findOne(id: number) {
    return `This action returns a #${id} specialty`;
  }

  update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    return `This action updates a #${id} specialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialty`;
  }
}
