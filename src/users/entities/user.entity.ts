import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    id: string;

    name: string;

    email: string;

    cep: string;

}
