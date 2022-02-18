import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
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
    create_at : Date;

    @IsOptional()
    update_at : Date;
    
    @IsOptional()
    deleted_at : Date;
}
