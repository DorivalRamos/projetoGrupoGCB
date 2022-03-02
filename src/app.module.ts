import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './configs/typeOrm.config';
import { UsersModule } from './users/users.module';
import { SpecialtiesModule } from './specialties/specialties.module';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    SpecialtiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

