import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PersonsService } from '../persons/persons.service';
import { Person } from '../persons/entities/persons.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService', { timestamp: true });

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly personService: PersonsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.existUsername(createUserDto.username);
    await this.personService.existDni(createUserDto.dni);
    await this.personService.existEmail(createUserDto.email);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const person = await queryRunner.manager.getRepository(Person).save({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        dni: createUserDto.dni,
        email: createUserDto.email,
        phone: createUserDto.phone,
      });

      const passwordEncrypt = bcrypt.hashSync(
        createUserDto.password,
        +this.configService.get('HASH_SALT'),
      );

      const user = await queryRunner.manager.getRepository(User).save({
        username: createUserDto.username,
        password: passwordEncrypt,
        person,
      });

      await queryRunner.commitTransaction();

      delete user.password;
      return user;
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Se produjo un error al crear el usuario.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async existUsername(username: string): Promise<void> {
    const usernameFind: string = username.trim();
    const count: number = await this.userRepository.count({
      where: {
        username: usernameFind,
      },
    });

    if (count > 0)
      throw new BadRequestException(
        `El username ${usernameFind} ya pertenece a otro usuario.`,
      );
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { username },
      relations: { person: true },
      select: {
        idUser: true,
        username: true,
        password: true,
        status: true,
        person: { idPerson: true, firstName: true, lastName: true },
      },
    });

    if (!user) throw new UnauthorizedException('Usuario incorrecto.');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Contraseña incorrecta.');

    delete user.password;
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findUserAuthById(idUser: string) {
    const userFound: User = await this.userRepository.findOne({
      where: { idUser },
      select: ['idUser', 'username', 'status'],
    });

    return userFound;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
