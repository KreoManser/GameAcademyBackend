export namespace ProjectGetAll {
  export const topic = 'project.get-all.query';

  export class Request {} // пустой запрос

  export class Response {
    projects: {
      projectId: string;
      title: string;
      image: string; // изображение-обложка (например, первая картинка проекта)
    }[];
  }
}
