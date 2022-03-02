
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';


dotenv.config();
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'databaseNode',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'grupoGcb',
    entities: [path.resolve(__dirname + '/../**/*.entity.{js,ts}')],
    migrations: [path.resolve(__dirname + '/../**/*.entity.{js,ts}')],
    cli: {
        "migrationsDir": "src/**/**/",
        "entitiesDir": "src/**/**/",
    },
     
    synchronize: true
}
