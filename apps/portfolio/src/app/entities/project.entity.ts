import { Types } from 'mongoose';

export class ProjectEntity {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  images: string[];
  video?: string;
  githubLink: string;
  models: string[];
  buildable: boolean;
  gltfFiles: string[];
  duplicateChecked: boolean;
  isGame: boolean;

  constructor(project: Partial<ProjectEntity>) {
    Object.assign(this, project);
  }
}
