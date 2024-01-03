import { OmitType } from '@nestjs/mapped-types';
import { Concert } from '../entities/concert.entity';
import { IsDateString, IsNumber } from 'class-validator';

export class ConcertDto extends OmitType(Concert, ['id']) {
  @IsDateString({}, { each: true })
  dateTimes: Date[];

  @IsNumber({}, { each: true })
  seats: number[];
}
