import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectEntity } from '../entities/project.entity';
import { Project, ProjectDocument } from '../schemas/project.schema';

@Injectable()
export class ProjectRepository {
  constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) {}

  async createProject(project: ProjectEntity): Promise<ProjectDocument> {
    const newProject = new this.projectModel(project);
    return newProject.save();
  }

  async findProjectById(id: string): Promise<ProjectDocument> {
    return this.projectModel.findById(id).exec();
  }

  async findAllProjects(): Promise<ProjectDocument[]> {
    return this.projectModel.find().exec();
  }
}
