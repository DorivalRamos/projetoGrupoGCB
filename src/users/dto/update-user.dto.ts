import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Specialties } from 'src/specialties/entities/specialties.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto  {
    @IsOptional()   
    name: string;

    @IsOptional()  
    email: string;

    @IsOptional()
    cep: string;

    @IsOptional()
    crm : string

    @IsOptional()
    specialties: Specialties

    
}
