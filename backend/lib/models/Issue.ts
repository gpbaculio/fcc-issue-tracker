import * as mongoose from 'mongoose';

export interface IssueDocument extends mongoose.Document {
  path: string;
  issue_title: string;
  issue_text: string;
  created_by: string;
  assigned_to: string;
  status_text: string;
}

const IssueSchema = new mongoose.Schema(
  {
    issue_title: {
      type: String,
      required: true
    },
    issue_text: {
      type: String,
      required: true
    },
    created_by: {
      type: String,
      required: true
    },
    assigned_to: {
      type: String,
      required: false
    },
    status_text: {
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
