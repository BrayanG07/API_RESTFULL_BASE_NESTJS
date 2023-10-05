import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { STATUS_PERSON } from '../../constants';
import { BaseEntity } from '../../config/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'persons' })
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  idPerson: string;

  @Column({ length: 80 })
  firstName: string;

  @Column({ length: 80 })
  lastName: string;

  @Column({ nullable: true, length: 20, unique: true })
  dni: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ nullable: true, length: 20 })
  phone: string;

  @Column({ type: 'enum', enum: STATUS_PERSON, default: STATUS_PERSON.ACTIVE })
  status: STATUS_PERSON;

  @OneToOne(() => User, (user) => user.person)
  user: User;
}
