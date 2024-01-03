import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, Schedule]), UserModule],
  providers: [ConcertService],
  controllers: [ConcertController],
  exports: [ConcertService],
})
export class ConcertModule {}
