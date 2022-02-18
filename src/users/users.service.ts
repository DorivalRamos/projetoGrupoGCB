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
   private userRepository :UserRepository
  ) {} 
  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.createUser(user);

    if(!userSaved){
      throw new InternalServerErrorException('Problem to create a user, Try again')
    }
    return userSaved;

  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user =  await this.userRepository.findOne(id);

    if (!user) {
          throw new NotFoundException('User not found');
    }
    return  user ;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise <User> {
    const user = await this.findUserById(id);
    await this.userRepository.update(user, {...data});
    const userUpdated= this.userRepository.create({ ...user,...data});
    
    return userUpdated ;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findUserById(id);
    const deleted = await this.userRepository.softRemove(user);
    
    
    return deleted;
}}
