import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../config/base.entity';
import { STATUS_USER } from '../../constants';
import { Person } from '../../persons/entities/persons.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column({ unique: true, length: 30 })
  username: string;

  @Column({ length: 128, select: false })
  password: string;

  @Column({ type: 'enum', enum: STATUS_USER })
  status: STATUS_USER;

  @OneToOne(() => Person, (person) => person.user)
  @JoinColumn({ name: 'id_person' })
  person: Person;
}
