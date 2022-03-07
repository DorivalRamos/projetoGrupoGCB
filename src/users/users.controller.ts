import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return  this.usersService.createUser(createUserDto);
  }

  @Get('getAll')
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get('userById/:id')
  findOneUserId(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Get('userByName/:name')
  findOneUserName(@Param('name') name: string) {
    return this.usersService.findOneByName(name);
  }

  @Get('userByEmail/:email')
  findOneUserEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Get('userByCep/:cep')
  findOneUserCep(@Param('cep') cep: string) {
    return this.usersService.findOneByCep(cep);
  }

  @Get('userByCrm/:crm')
  findOneUserCrm(@Param('crm') crm: string) {
    return this.usersService.findOneByCrm(crm);
  }

  @Patch('updateUser/:id')
  updateUser(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('deleteUser/:id')
  remove(@Param('id') id: string) {
    return  this.usersService.deleteUser(id);
  }
}
