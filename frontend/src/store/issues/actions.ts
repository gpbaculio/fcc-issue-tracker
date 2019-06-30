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
  TOGGLE_ISSUE_SUCCESS
} from './types';
import {
  FetchIssuesArgsType,
  FetchIssuesParamsType,
  IssueType,
  ToggleIssueArgsType
} from './interfaces';
import { initAlert } from './reducers';

const issue = new schema.Entity('issues', {}, { idAttribute: '_id' });

export const fetchIssues = ({
  projectName,
  page
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
    const params: FetchIssuesParamsType = { offset, limit };
    const { data } = await axios.get(`/api/issues/${projectName}`, {
      params
    });
    const {
      result: ids,
      entities: { issues }
    } = normalize(
      data.issues.map((issue: IssueType) => ({
        ...issue,
        loading: false
      })),
      [issue]
    );
    dispatch({
      type: FETCH_ISSUES_SUCCESS,
      payload: { ids, issues, count: data.count, page }
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
  status
}: ToggleIssueArgsType): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => async dispatch => {
  dispatch({ type: TOGGLE_ISSUE_REQUEST, payload: { id } });
  try {
    const {
      data: { issue }
    } = await axios({
      method: 'PUT',
      url: `/api/issues/${projectName}`,
      data: { status, id }
    });

    dispatch({ type: TOGGLE_ISSUE_SUCCESS, payload: { issue } });
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
