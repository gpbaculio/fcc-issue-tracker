import * as mongoose from 'mongoose';

export interface IssueDocument extends mongoose.Document {
  issue_title: string;
  issue_text: string;
  created_by: string;
  assigned_to: string;
  status_text: string;
  open: boolean;
  createdAt: string;
  updatedAt: string;
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
      default: '',
      required: false
    },
    status_text: {
      type: String,
      default: '',
      required: false
    },
    project_name: {
      type: String,
      ref: 'Project',
      required: false
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' },
    versionKey: false
  }
);

export default mongoose.model<IssueDocument>('Issue', IssueSchema);
