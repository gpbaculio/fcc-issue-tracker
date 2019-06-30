import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  CLOSE_ALERT,
  REQUEST_FAILURE,
  TOGGLE_ISSUE_REQUEST,
  TOGGLE_ISSUE_SUCCESS
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
      const { ids, issues, count, page } = action.payload;
      return {
        ...state,
        loading: false,
        ids,
        issues,
        count,
        page
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
    case TOGGLE_ISSUE_REQUEST: {
      const { id } = action.payload;
      const issue = state.issues[id];
      return {
        ...state,
        issues: {
          ...state.issues,
          [id]: {
            ...issue,
            loading: true
          }
        }
      };
    }
    case TOGGLE_ISSUE_SUCCESS: {
      const { issue } = action.payload;
      return {
        ...state,
        issues: {
          ...state.issues,
          [issue._id]: {
            ...issue
          }
        }
      };
    }
    default:
      return state;
  }
};
