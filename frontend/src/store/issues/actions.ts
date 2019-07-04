import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../index';
import { schema, normalize } from 'normalizr';
import axios from 'axios';
import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  REQUEST_FAILURE,
  CLOSE_ALERT,
  TOGGLE_ISSUE_REQUEST,
  TOGGLE_ISSUE_SUCCESS,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE_REQUEST,
  UPDATE_ISSUE_REQUEST,
  UPDATE_ISSUE_SUCCESS
} from './types';
import {
  FetchIssuesArgsType,
  FetchIssuesParamsType,
  IssueType,
  ToggleIssueArgsType,
  DeleteIssueArgs,
  UpdateIssueArgs
} from './interfaces';
import { initAlert } from './reducers';

const issue = new schema.Entity('issues', {}, { idAttribute: '_id' });

export const fetchIssues = ({
  projectName,
  page,
  searchQuery
}: FetchIssuesArgsType): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => async dispatch => {
  dispatch({ type: FETCH_ISSUES_REQUEST });
  try {
    const limit = 5;
    const offset = (page - 1) * limit;
    const params: FetchIssuesParamsType = { ...searchQuery, offset, limit };
    const { data } = await axios.get(`/api/issues/${projectName}`, {
      params
    });
    const { data: count } = await axios.get(
      `/api/issues/count/${projectName}`,
      {
        params
      }
    );
    const {
      result: ids,
      entities: { issues }
    } = normalize(
      data.map((issue: IssueType) => ({
        ...issue,
        loading: ''
      })),
      [issue]
    );
    dispatch({
      type: FETCH_ISSUES_SUCCESS,
      payload: { ids, issues, count, page }
    });
  } catch (error) {
    dispatch({
      type: REQUEST_FAILURE,
      payload: {
        error: true,
        alert: { message: error.response.data, type: 'danger' }
      }
    });
  }
};

export const closeAlert = (): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => async dispatch => {
  dispatch({
    type: CLOSE_ALERT,
    payload: {
      error: false,
      alert: initAlert
    }
  });
};

export const toggleIssueStatus = ({
  id,
  projectName,
  open
}: ToggleIssueArgsType): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => async dispatch => {
  dispatch({
    type: TOGGLE_ISSUE_REQUEST,
    payload: { id, loading: 'toggleStatus' }
  });
  try {
    const response = await axios({
      method: 'PUT',
      url: `/api/issues/${projectName}`,
      data: { open, _id: id }
    });
    dispatch({
      type: TOGGLE_ISSUE_SUCCESS,
      payload: { issue: { _id: id, open } }
    });
  } catch (error) {
    dispatch({
      type: REQUEST_FAILURE,
      payload: {
        error: true,
        alert: { message: error.response.data, type: 'danger' }
      }
    });
  }
};

export const deleteIssue = ({
  id,
  projectName
}: DeleteIssueArgs): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => async dispatch => {
  dispatch({ type: DELETE_ISSUE_REQUEST, payload: { id } });
  try {
    const response = await axios({
      method: 'DELETE',
      url: `/api/issues/${projectName}/${id}`
    });
    dispatch({ type: DELETE_ISSUE_SUCCESS, payload: { id } });
  } catch (error) {
    dispatch({
      type: REQUEST_FAILURE,
      payload: {
        error: true,
        alert: { message: error.response.data, type: 'danger' }
      }
    });
  }
};

export const updateIssue = ({
  id,
  projectName,
  ...params
}: UpdateIssueArgs): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => async dispatch => {
  dispatch({
    type: UPDATE_ISSUE_REQUEST,
    payload: { id, loading: 'updateIssue' }
  });
  try {
    const response = await axios({
      method: 'PUT',
      url: `/api/issues/${projectName}`,
      data: { ...params, _id: id }
    });
    dispatch({
      type: UPDATE_ISSUE_SUCCESS,
      payload: { issue: { _id: id, ...params } }
    });
  } catch (error) {
    dispatch({
      type: REQUEST_FAILURE,
      payload: {
        error: true,
        alert: { message: error.response.data, type: 'danger' }
      }
    });
  }
};
