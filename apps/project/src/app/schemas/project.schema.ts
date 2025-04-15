import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  video?: string;

  @Prop({ required: true })
  githubLink: string;

  @Prop({ type: [String], default: [] })
  models: string[];

  @Prop({ required: true })
  buildable: boolean;

  // Новые свойства:
  @Prop({ type: [String], default: [] })
  gltfFiles: string[];

  @Prop({ default: false })
  duplicateChecked: boolean;

  @Prop({ default: false })
  isGame: boolean;
}

export type ProjectDocument = Project & Document;

export const ProjectSchema = SchemaFactory.createForClass(Project);
