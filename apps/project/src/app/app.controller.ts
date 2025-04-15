import { Body, Controller } from '@nestjs/common';
import { ProjectCreate } from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { ProjectService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly projectService: ProjectService) {}

  @RMQValidate()
  @RMQRoute(ProjectCreate.topic)
  async create(@Body() dto: ProjectCreate.Request): Promise<ProjectCreate.Response> {
    return this.projectService.createProject(dto);
  }
}
