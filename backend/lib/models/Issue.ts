import * as mongoose from 'mongoose';

export interface IssueDocument extends mongoose.Document {
  path: string;
  fileName: string;
}

const IssueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    },
    assignedTo: {
      type: String,
      required: false
    },
    statusText: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<IssueDocument>('Issue', IssueSchema);
