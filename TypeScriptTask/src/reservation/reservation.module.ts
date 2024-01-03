import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation } from './entities/reservation.entity';
import { Concert } from 'src/concert/entities/concert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Schedule } from 'schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Concert, User, Schedule]),
    UserModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
