import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSpecialtyDto {

  @IsString({message: 'Informe uma Especialidade valida '})
  @IsNotEmpty({ message: 'Informe um nome valido' })
  @MaxLength(200, { message: 'O nome deve ter menos de 200 caracteres' })
  @MinLength(3, { message: 'O nome deve ter no minimo 3 caracteres' })
  name : string;

  
}
