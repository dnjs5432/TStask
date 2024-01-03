import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Concert } from 'src/concert/entities/concert.entity';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'schedule/entities/schedule.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(user) {
    return await this.reservationRepository.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
      relations: ['schedule'],
    });
  }

  async createReservation(reservationDto, user) {
    const { scheduleId } = reservationDto;

    const userPoint = user.point;

    const getConcertInfo = await this.scheduleRepository.findOne({
      where: {
        id: scheduleId,
      },
      relations: {
        concert: true,
      },
    });
    const concertPrice = getConcertInfo.concert.price;
    if (userPoint < concertPrice) {
      throw new Error('돈이 부족합니다.');
    }
    const leftPoint = userPoint - concertPrice;

    await this.userRepository.update({ id: user.id }, { point: leftPoint });

    const leftseat = getConcertInfo.seat - 1;

    await this.scheduleRepository.update(
      { id: scheduleId },
      { seat: leftseat },
    );

    const newReservation = await this.reservationRepository.save({
      userId: user.id,
      scheduleId,
    });

    return {
      newReservation,
      dateTime: getConcertInfo.dateTime,
      venue: getConcertInfo.concert.venue,
      price: getConcertInfo.concert.price,
    };
  }
}
