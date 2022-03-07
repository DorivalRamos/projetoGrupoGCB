import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(
        createUserDto: CreateUserDto,

      ): Promise<User> {
        const { name, email, cep ,crm, specialties } = createUserDto;
    
        const user = this.create();
        user.name = name;
        user.email = email;
        user.cep = cep;
        user.crm = crm;
        user.specialties = specialties
        
        
        try {
          await user.save();
          
          return user;
        } catch (error) {
          if (error.code.toString() === '23505') {
            throw new ConflictException('Endereço de e-mail já está em uso!');
          } else {
            throw new InternalServerErrorException(
              'Error saving Email in database,or CRM already registered',
            );
          }
        }
      };


  async repositoryFindUserByName(name: string): Promise<any> {
    const query = this.createQueryBuilder('user');
    query.where('user.name = :name', { name });
    query.select(['user.name','user.email', 'user.cep', 'user.crm']);  
    return await query.getMany();
  }

  async repositoryFindUserByEmail(email: string): Promise<any> {
    const query = this.createQueryBuilder('user');
    query.where('user.email = :email', { email });
    query.select(['user.name','user.email', 'user.cep', 'user.crm']);
    return await query.getOne();
  }

  async repositoryFindUserBycrm(crm: string): Promise<any> {
    const query = this.createQueryBuilder('user');
    query.where('user.crm = :crm', { crm });
    query.select(['user.name','user.email', 'user.cep', 'user.crm']);
    return await query.getOne();
  }

  async repositoryFindUserByCep(cep: string): Promise<any> {
    const query = this.createQueryBuilder('user');
    query.where('user.cep = :cep', { cep });
    query.select(['user.name','user.email', 'user.cep', 'user.crm']);
    return await query.getMany();
  }

}