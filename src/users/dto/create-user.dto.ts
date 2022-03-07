import { ArrayMinSize, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Specialties } from "../../specialties/entities/specialties.entity";


export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um nome valido' })
  @MaxLength(100, { message: 'O nome deve ter menos de 100 caracteres' })
  @MinLength(3, { message: 'O nome deve ter no minimo 3 caracteres' })
  name : string;

  @IsString()
  @IsNotEmpty({ message: 'Informe um endereço de e-mail' })
  @IsEmail({ message: 'Informe um e-mail válido' })
  @MaxLength(200, { message: 'O e-mail deve ter menos de 200 caracteres' })
  email: string;
    
  @IsString()
  @IsNotEmpty({ message: 'Informe um cep valido' })
  @MaxLength(8, { message: 'O cep deve ter menos de 8 caracteres' })
  @MinLength(8, { message: 'O cep deve ter no minimo 8 caracteres' })
  cep: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe um crm valido' })
  @MaxLength(7, { message: 'O crm deve ter menos de 8 caracteres' })
  @MinLength(7, { message: 'O crm deve ter no minimo 8 caracteres' })
  crm : string

  
  @ArrayMinSize(1 ,{message: 'Informe no minimo uma especialidade valida'})
  @IsOptional()
  specialties: Specialties
  
}
