import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Person } from '../persons/entities/persons.entity';
import { PersonsModule } from '../persons/persons.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Person]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PersonsModule,
    ConfigModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
