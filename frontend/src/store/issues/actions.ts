import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../index';
import { schema, normalize } from 'normalizr';
import axios from 'axios';
import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAILURE,
  CLOSE_ALERT
} from './types';
import {
  FetchIssuesArgsType,
  FetchIssuesParamsType,
  IssueType
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
    const offset = (page - 1) * 9;
    const params: FetchIssuesParamsType = { offset, limit: 5 };
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
      payload: { ids, issues, count: data.count }
    });
  } catch (error) {
    dispatch({
      type: FETCH_ISSUES_FAILURE,
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
