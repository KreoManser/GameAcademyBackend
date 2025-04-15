import { Body, Controller } from '@nestjs/common';
import { ProjectCreate } from '@shared/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectRepository } from '../repos/project.repository';

@Controller()
export class ProjectCommands {
  constructor(private readonly projectRepository: ProjectRepository) {}

  @RMQValidate()
  @RMQRoute(ProjectCreate.topic)
  async createProject(@Body() dto: ProjectCreate.Request): Promise<ProjectCreate.Response> {
    const projectEntity = new ProjectEntity({
      title: dto.title,
      description: dto.description,
      images: dto.images,
      video: dto.video,
      githubLink: dto.githubLink,
      models: dto.models,
      buildable: dto.buildable,
    });
    const project = await this.projectRepository.createProject(projectEntity);
    return { projectId: project._id.toString() };
  }
}
