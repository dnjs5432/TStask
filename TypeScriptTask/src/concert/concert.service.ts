import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Repository } from 'typeorm';
import { UpdateConcertDto } from './dto/updateConcert.dto';
import _ from 'lodash';
import { ConcertDto } from './dto/concert.dto';
import { UserService } from 'src/user/user.service';
import { Schedule } from 'schedule/entities/schedule.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    return await this.concertRepository
      .createQueryBuilder('concert')
      .leftJoinAndSelect('concert.schedules', 'schedules')
      .leftJoinAndSelect('concert.user', 'user')
      .select([
        'concert.id',
        'concert.title',
        'concert.imageUrl',
        'concert.category',
        'concert.description',
        'concert.venue',
        'concert.price',
        'schedules',
        'user.name',
      ])
      .getMany();
  }

  async findOne(id: number) {
    return await this.concertRepository
      .createQueryBuilder('concert')
      .leftJoinAndSelect('concert.schedules', 'schedules')
      .leftJoinAndSelect('concert.user', 'user')
      .select([
        'concert.id',
        'concert.title',
        'concert.imageUrl',
        'concert.category',
        'concert.description',
        'concert.venue',
        'concert.price',
        'schedules',
        'user.name',
      ])
      .where('concert.id = :id', { id })
      .getOne();
  }

  async createConcert(concertDto: ConcertDto, user) {
    const {
      title,
      imageUrl,
      category,
      description,
      venue,
      dateTimes,
      price,
      seats,
    } = concertDto;
    console.log(seats);
    const userId = user.id;

    const date = dateTimes.map((dateTime) => {
      return { dateTime };
    });

    const seatObjects = seats.map((seat) => {
      return { seat };
    });

    const schedules = date.map((dateItem, index) => ({
      ...dateItem,
      ...seatObjects[index],
    }));
    console.log('야', schedules);
    const newConcert = this.concertRepository.save({
      title,
      imageUrl,
      category,
      description,
      venue,
      price,
      user: userId,
      schedules,
    });

    return newConcert;
  }

  async update(id: number, updateConcertDto: UpdateConcertDto) {
    try {
      await this.verifyConcertById(id);
      await this.concertRepository.update({ id }, updateConcertDto);
      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(id: number) {
    try {
      await this.verifyConcertById(id);
      await this.concertRepository.delete({ id });
      return true;
    } catch (error) {
      return false;
    }
  }

  private async verifyConcertById(id: number) {
    await this.concertRepository.findOneBy({ id });
  }
}
