import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectCreate } from '@shared/contracts';
import axios from 'axios';
import { ProjectEntity } from './entities/project.entity';
import { ProjectRepository } from './repos/project.repository';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(projectDto: any): Promise<ProjectCreate.Response> {
    let duplicateFound = false;
    for (const file of projectDto.gltfFiles) {
      try {
        const response = await axios.post('http://localhost:8080/api/check', {
          file: file,
          dist: 10,
          hash_size: 16,
          index_name: 'faiss_index',
        });
        if (response.data.duplicated) {
          duplicateFound = true;
          break;
        }
      } catch (error) {
        throw new HttpException('Duplicate check failed', HttpStatus.BAD_REQUEST);
      }
    }
    if (duplicateFound) {
      throw new HttpException('Duplicate 3D model found', HttpStatus.CONFLICT);
    }
    const projectEntity = new ProjectEntity({
      title: projectDto.title,
      description: projectDto.description,
      images: projectDto.images,
      video: projectDto.video,
      githubLink: projectDto.githubLink,
      models: projectDto.models || [],
      gltfFiles: projectDto.gltfFiles,
      duplicateChecked: true,
      isGame: projectDto.isGame || false,
      buildable: true,
    });

    const createdProject = await this.projectRepository.createProject(projectEntity);
    return { projectId: createdProject._id.toString() };
  }

  async getProjectById(id: string): Promise<Project> {
    return this.projectRepository.findProjectById(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.findAllProjects();
  }
}
