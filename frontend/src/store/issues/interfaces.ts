import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAILURE,
  CLOSE_ALERT
} from './types';

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
  loading: boolean;
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
  alert: {
    message: string;
    type: string;
  };
  error: boolean;
}
export interface AlertType {
  message: string;
  type: string;
}
interface FetchIssuesRequestType {
  type: typeof FETCH_ISSUES_REQUEST;
}
interface FetchIssuesSuccessType {
  type: typeof FETCH_ISSUES_SUCCESS;
  payload: {
    issues: {
      [_id: string]: IssueType;
    };
    ids: string[];
    count: number;
  };
}
interface FetchIssuesFailureType {
  type: typeof FETCH_ISSUES_FAILURE;
  payload: {
    error: true;
    alert: { message: string; type: string };
  };
}
interface CloseAlertType {
  type: typeof CLOSE_ALERT;
  payload: {
    error: false;
    alert: { message: string; type: string };
  };
}

export type IssuesActionTypes =
  | FetchIssuesRequestType
  | FetchIssuesSuccessType
  | FetchIssuesFailureType
  | CloseAlertType;
