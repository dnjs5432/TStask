import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../types/userRole.type';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Concert } from 'src/concert/entities/concert.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력하세요.' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력하세요.' })
  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @IsNotEmpty({ message: '이름을 입력하세요.' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', default: 1000000 })
  point: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToMany(() => Concert, (concert) => concert.user)
  concerts: Concert[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
