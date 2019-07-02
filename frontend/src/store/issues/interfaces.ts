import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  CLOSE_ALERT,
  TOGGLE_ISSUE_REQUEST,
  TOGGLE_ISSUE_SUCCESS,
  REQUEST_FAILURE,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE_REQUEST,
  UPDATE_ISSUE_REQUEST,
  UPDATE_ISSUE_SUCCESS
} from './types';

export interface FetchIssuesArgsType {
  projectName: string;
  page: number;
  searchQuery?: {
    _id?: string;
    issue_title?: string;
    issue_text?: string;
    created_on?: string;
    updated_on?: string;
    created_by?: string;
    assigned_to?: string;
    open?: boolean;
    status_text?: string;
  };
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
  loading: string | null;
}

export interface IssuesType {
  [_id: string]: IssueType;
}
export interface ToggleIssueArgsType {
  id: string;
  projectName: string;
  status: boolean;
}
export interface UpdateIssueArgs {
  id: string;
  issue_title: string;
  issue_text: string;
  created_by: string;
  assigned_to: string;
  status_text: string;
  projectName: string;
}
export interface IssuesInitState {
  editField: string;
  ids: string[];
  issues: IssuesType;
  page: number;
  loading: string | null;
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
    page: number;
  };
}
interface RequestFailureType {
  type: typeof REQUEST_FAILURE;
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

interface DeleteIssueRequestType {
  type: typeof DELETE_ISSUE_REQUEST;
  payload: {
    id: string;
  };
}
interface DeleteIssueSuccesstType {
  type: typeof DELETE_ISSUE_SUCCESS;
  payload: {
    id: string;
  };
}
interface IssueRequestType {
  type: typeof UPDATE_ISSUE_REQUEST | typeof TOGGLE_ISSUE_REQUEST;
  payload: {
    id: string;
    loading: string;
  };
}
export interface DeleteIssueArgs {
  id: string;
  projectName: string;
}
interface IssueSuccesstType {
  type: typeof TOGGLE_ISSUE_SUCCESS | typeof UPDATE_ISSUE_SUCCESS;
  payload: {
    issue: IssueType;
  };
}
export type IssuesActionTypes =
  | FetchIssuesRequestType
  | FetchIssuesSuccessType
  | RequestFailureType
  | CloseAlertType
  | IssueSuccesstType
  | DeleteIssueRequestType
  | DeleteIssueSuccesstType
  | IssueRequestType;
