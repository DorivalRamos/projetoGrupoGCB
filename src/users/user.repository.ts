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
              'Erro ao salvar o usuário no banco de dados',
            );
          }
        }
      };

      async findAll(): Promise<any> {
        const query = this.createQueryBuilder(
          'user');
        query.innerJoinAndSelect('user.specialties', 'specialties')
        query.select(['user.name',"user.id",
        "user.email",'user.cep', 'user.crm', 'specialties']);
  
        return await query.getMany()
      }

    async softDelete(id: string): Promise<any>{
      const query = this.createQueryBuilder('user');
      query.where('user.id = :id', {id})
      
      return await query.softDelete()
}
  async repositoryfindUserByName(name: string): Promise<any> {
    const query = this.createQueryBuilder('user');
    query.where('user.name = :name', { name });
    query.select(['user.name','user.email', 'user.cep', 'user.crm']);  
    return await query.getOne();
  }

  async repositoryfindUserByEmail(email: string): Promise<any> {
    const query = this.createQueryBuilder('user');
    query.where('user.email = :email', { email });
    query.select(['user.name','user.email', 'user.cep', 'user.crm']);
    return await query.getOne();
  }

  async repositoryfindUserBycrm(crm: string): Promise<any> {
    const query = this.createQueryBuilder('user');
    query.where('user.crm = :crm', { crm });
    query.select(['user.name','user.email', 'user.cep', 'user.crm']);
    return await query.getOne();
  }

}