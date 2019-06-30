import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  CLOSE_ALERT,
  REQUEST_FAILURE
} from './types';
import { IssuesInitState, IssuesActionTypes, AlertType } from './interfaces';

export const initAlert: AlertType = { message: '', type: '' };

export const initState: IssuesInitState = {
  ids: [],
  issues: {},
  page: 1,
  loading: false,
  count: 0,
  alert: initAlert,
  error: false
};

export default (state = initState, action: IssuesActionTypes) => {
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ISSUES_SUCCESS: {
      const { ids, issues, count } = action.payload;
      return {
        ...state,
        loading: false,
        ids,
        issues,
        count
      };
    }
    case REQUEST_FAILURE: {
      const {
        error,
        alert: { message, type }
      } = action.payload;
      return {
        ...state,
        loading: false,
        error,
        alert: {
          message,
          type
        }
      };
    }
    case CLOSE_ALERT: {
      const {
        error,
        alert: { message, type }
      } = action.payload;
      return {
        ...state,
        error,
        alert: {
          message,
          type
        }
      };
    }
    default:
      return state;
  }
};
