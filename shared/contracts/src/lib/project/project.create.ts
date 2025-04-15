export namespace ProjectCreate {
  export const topic = 'project.create.command';

  export class Request {
    title: string;
    description: string;
    images: string[];
    video?: string;
    githubLink: string;
    models: string[];
    buildable: boolean;
  }

  export class Response {
    projectId: string;
  }
}
