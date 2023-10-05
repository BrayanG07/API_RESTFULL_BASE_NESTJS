import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { AuthModule } from './auth/auth.module';
import { PersonsModule } from './persons/persons.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    AuthModule,
    PersonsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
