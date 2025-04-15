import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProjectCreate } from '@shared/contracts';
import { RMQService } from 'nestjs-rmq';
import { JWTAuthGuard } from '../guards/jwt.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  async createProject(@Body() dto: ProjectCreate.Request) {
    try {
      return await this.rmqService.send<ProjectCreate.Request, ProjectCreate.Response>(ProjectCreate.topic, dto);
    } catch (e) {
      if (e instanceof Error) throw new UnauthorizedException(e.message);
    }
  }
}
