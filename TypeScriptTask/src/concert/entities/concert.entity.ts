import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from '../../../schedule/entities/schedule.entity';

@Entity({
  name: 'concerts',
})
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: '제목을 입력해 주세요.' })
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @IsNotEmpty({ message: '이미지를 넣어주세요.' })
  @Column({ nullable: false })
  imageUrl: string;

  @IsNotEmpty({ message: '가격을 입력해 주세요' })
  @Column({ type: 'int', nullable: false })
  price: number;

  @IsNotEmpty({ message: '카테고리를 입력해 주세요.' })
  @Column({ type: 'varchar', nullable: false })
  category: string;

  @IsNotEmpty({ message: '설명을 입력해 주세요.' })
  @Column({ type: 'text', nullable: false })
  description: string;

  @IsNotEmpty({ message: '장소를 입력해 주세요.' })
  @Column({ type: 'varchar', nullable: false })
  venue: string;

  @ManyToOne(() => User, (user) => user.concerts)
  user: User;

  @OneToMany(() => Schedule, (schedule) => schedule.concert, {
    cascade: true,
  })
  schedules: Schedule[];
}
