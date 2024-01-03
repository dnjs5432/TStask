import { Schedule } from 'schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  reservationId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  userId: number;

  @Column()
  scheduleId: number;

  @ManyToOne(() => Schedule)
  @JoinColumn()
  schedule: Schedule;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn()
  user: User;
}
