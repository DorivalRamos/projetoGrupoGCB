import { User } from "../../users/entities/user.entity";
import {v4 as uuidv4} from 'uuid';

export default class TestUtil {
    static giveMeAValidUser(): User{
        const user = new User();
        user.name = 'validName';
        user.email = 'valid@email.com';
        user.cep = 'validCep';
        user.crm = '123456789';
        user.id = uuidv4();

        return user;

    }
}