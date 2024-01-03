import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReservationDto {
  @IsNotEmpty({ message: '입력란을 확인해주세요.' })
  @IsNumber()
  scheduleId: number;
}
