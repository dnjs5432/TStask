import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Concert } from '../../src/concert/entities/concert.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'schedules',
})
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: '날짜와 시간을 입력해 주세요.' })
  @Column({ type: 'datetime', nullable: false })
  dateTime: Date;

  @Column()
  seat: number;

  @ManyToOne(() => Concert, (concert) => concert.schedules)
  concert: Concert;

  @OneToMany(() => Reservation, (reservation) => reservation.schedule)
  reservation: Reservation[];
}
