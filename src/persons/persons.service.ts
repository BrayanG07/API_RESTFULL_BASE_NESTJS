import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/persons.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async existEmail(email: string): Promise<void> {
    const emailFind: string = email.trim().toLocaleLowerCase();
    const count: number = await this.personRepository.count({
      where: {
        email: emailFind,
      },
    });

    if (count > 0)
      throw new BadRequestException(
        `El correo electronico ${emailFind} ya pertenece a otro usuario.`,
      );
  }

  async existDni(dni: string): Promise<void> {
    const dniFind: string = dni.trim();
    const count: number = await this.personRepository.count({
      where: {
        dni: dniFind,
      },
    });

    if (count > 0)
      throw new BadRequestException(
        `El DNI ${dniFind} ya pertenece a otro usuario.`,
      );
  }
}
