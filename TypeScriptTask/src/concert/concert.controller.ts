import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { UpdateConcertDto } from './dto/updateConcert.dto';
import { ConcertDto } from './dto/concert.dto';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  async findAll() {
    return await this.concertService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.concertService.findOne(id);
  }

  @Get('search/:name')
  async searchConcertsByName(@Param('name') name: string) {
    const foundConcerts = await this.concertService.searchConcertsByName(name);
    return foundConcerts;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() concertDto: ConcertDto, @Req() req) {
    const user = req.user;
    const createdConcert = await this.concertService.createConcert(
      concertDto,
      user,
    );
    return createdConcert;
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateConcertDto: UpdateConcertDto,
  ) {
    const isUpdated = await this.concertService.update(id, updateConcertDto);
    if (isUpdated) {
      return { message: '공연이 수정되었습니다.' };
    } else {
      return { message: '공연 수정에 실패하였습니다.' };
    }
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const isDeleted = await this.concertService.delete(id);
    if (isDeleted) {
      return { message: '공연이 삭제되었습니다.' };
    } else {
      return { message: '공연 삭제에 실패하였습니다.' };
    }
  }
}
