import { FETCH_ISSUES_REQUEST } from './types';

export interface FetchIssuesArgsType {
  projectName: string;
  page: number;
}

export interface FetchIssuesParamsType {
  offset: number;
  limit: number;
}

export interface IssueType {
  _id: string;
  project_name: string;
  issue_title: string;
  issue_text: string;
  created_by: string;
  assigned_to: string;
  status_text: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}

export interface IssuesType {
  [_id: string]: IssueType;
}

export interface IssuesInitState {
  ids: string[];
  issues: IssuesType;
  page: number;
  loading: boolean;
  count: number;
}

interface fetchIssuesRequest {
  type: typeof FETCH_ISSUES_REQUEST;
}
// interface fetchTodosSuccess {
//   type: typeof FETCH_TODOS_SUCCESS;
//   payload: {
//     entities: {
//       [_id: string]: Todo;
//     };
//     ids: string[];
//     count: number;
//   };
// }
// interface fetchTodosFailure {
//   type: typeof FETCH_TODOS_FAILURE;
//   payload: {
//     error: string;
//   };
// }

export type IssuesctionTypes = fetchIssuesRequest;
