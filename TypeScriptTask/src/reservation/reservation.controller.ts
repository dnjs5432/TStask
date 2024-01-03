import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { ReservationDto } from './dto/reservation.dto';

@UseGuards(RolesGuard)
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async findAll(@Req() req) {
    const user = req.user;
    return await this.reservationService.findAll(user);
  }

  @Post()
  async create(@Body() reservationDto: ReservationDto, @Req() req) {
    const user = req.user;
    const createdReservation = await this.reservationService.createReservation(
      reservationDto,
      user,
    );
    return createdReservation;
  }
}
