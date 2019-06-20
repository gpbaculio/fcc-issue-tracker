import * as mongoose from 'mongoose';

export interface ProjectDocument extends mongoose.Document {
  project_name: string;
}

const ProjectSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<ProjectDocument>('Project', ProjectSchema);
