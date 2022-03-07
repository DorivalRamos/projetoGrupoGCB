import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { UpdateSpecialtyDto } from "./dto/update-specialty.dto";
import { Specialties } from "./entities/specialties.entity";


@EntityRepository(Specialties)
export class SpecialtiesRepository extends Repository<Specialties>{
    async createSpecialties(
        createSpecialtyDto: CreateSpecialtyDto,

      ): Promise<Specialties> {
        const { name } = createSpecialtyDto;
    
        const specialties = this.create();
        specialties.name = name;
        
        
        try {
          await specialties.save();
          
          return specialties;
        } catch (error) {
          
            throw new InternalServerErrorException(
              'Erro ao salvar no banco de dados, Especialidade já existe',
            );
          
        }
      };

    async softDelete(id: string): Promise<any>{
      const query = this.createQueryBuilder('specialties');
      query.where('specialties.id = :id', {id})
      
      return await query.softDelete()

    }

    async updateSpecialty(updateSpecialtyDto: UpdateSpecialtyDto, id: string): Promise<Specialties> {
      const data = await this.findOne(id);
      const { name } = updateSpecialtyDto;
      data.name = name ? name : data.name;
      
      try {
        await data.save();
        delete data.id,
        delete data.create_at,
        delete data.deleted_at
        return data;
      } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao salvar os dados no banco de dados',
        );
      }
    }
  

}