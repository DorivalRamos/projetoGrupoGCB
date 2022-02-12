import { User } from "./../../users/entities/user.entity";

export default class TestUtil {
    static giveMeAValidUser(): User{
        const user = new User();
        user.id = '1';
        user.name = 'validName';
        user.email = '  valid@email.com';
        user.cep = 'validCep';

        return user;

    }
}