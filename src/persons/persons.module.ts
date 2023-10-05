import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/persons.entity';

@Module({
  providers: [PersonsService],
  imports: [TypeOrmModule.forFeature([Person])],
  exports: [PersonsService],
})
export class PersonsModule {}
