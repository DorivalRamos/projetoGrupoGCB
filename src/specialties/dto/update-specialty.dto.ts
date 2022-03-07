import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateSpecialtyDto } from './create-specialty.dto';

export class UpdateSpecialtyDto extends PartialType(CreateSpecialtyDto) {
    
    @IsOptional()
    name : string;}
