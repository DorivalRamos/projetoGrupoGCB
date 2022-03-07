import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository)
   private userRepository :UserRepository) {} 


  async createUser(data: CreateUserDto): Promise<User> {
    
    const userSaved = await this.userRepository.createUser(data);

    if(!userSaved){
      throw new InternalServerErrorException('Problem to create a user, Try again')
    }
    return userSaved;

  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: ['id','name', 'email', 'crm', 'cep', 'specialties'],
      order: {name: 'ASC'}});
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user =  await this.userRepository.findOne(id,{
      select: ['id','name', 'email', 'crm', 'cep']
    });

    if (!user) {
          throw new NotFoundException('User not found');
    }
    return  user ;
  }

  async findOneByName(name: string): Promise<User> {
    const user =  await this.userRepository.repositoryFindUserByName(name);

    if (!user) {
          throw new NotFoundException('User not found');
    }
    return  user ;
  }

  async findOneByEmail(email: string): Promise<User> {
    const userEmail = email;
    if(!userEmail.includes('@') && userEmail.length < 100){
      throw new NotFoundException('Enter a valid Email');
    }
    const user =  await this.userRepository.repositoryFindUserByEmail(email);
    

    if (!user) {
          throw new NotFoundException('User not found');
    }
    return  user ;
  }

  async findOneByCrm(crm: string): Promise<User> {
    const userCrm = crm
    if(userCrm.length != 7 ){
      throw new NotFoundException('Enter a Valid CRM');
    }

    const user =  await this.userRepository.repositoryFindUserBycrm(crm);

    if (!user) {
          throw new NotFoundException('User not found');
    }
    return  user ;
  }

  async findOneByCep(cep: string): Promise<User> {
    const userCep = cep
    if(userCep.length != 9 ){
      throw new NotFoundException('Enter a Valid Cep');
    }
    
    const user =  await this.userRepository.repositoryFindUserByCep(cep);

    if (!user) {
          throw new NotFoundException('User not found');
    }
    return  user ;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise <User> {
    const user = await this.findUserById(id);
    const { name, email, cep, crm } = updateUserDto;
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.cep = cep ? cep : user.cep;

    user.crm = crm ? crm : user.crm;
   
    console.log(user);
    try { 
      await user.save()

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    const deleted = await this.userRepository.softRemove(user);
    
    if (!deleted) {
      throw new NotFoundException('User not found');
     }
    return  deleted ;
  }
}
