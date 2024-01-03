import { PartialType } from '@nestjs/mapped-types';
import { Concert } from '../entities/concert.entity';

export class UpdateConcertDto extends PartialType(Concert) {}
