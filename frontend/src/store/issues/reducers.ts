import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  CLOSE_ALERT,
  REQUEST_FAILURE,
  TOGGLE_ISSUE_REQUEST,
  TOGGLE_ISSUE_SUCCESS,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE_REQUEST,
  UPDATE_ISSUE_REQUEST,
  UPDATE_ISSUE_SUCCESS
} from './types';
import { IssuesInitState, IssuesActionTypes, AlertType } from './interfaces';

export const initAlert: AlertType = { message: '', type: '' };

export const initState: IssuesInitState = {
  editField: '',
  ids: [],
  issues: {},
  page: 1,
  loading: null,
  count: 0,
  alert: initAlert,
  error: false
};

export default (state = initState, action: IssuesActionTypes) => {
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
      return {
        ...state,
        loading: 'fetchIssues'
      };
    case FETCH_ISSUES_SUCCESS: {
      const { ids, issues, count, page } = action.payload;
      return {
        ...state,
        loading: null,
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
        loading: null,
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
    case TOGGLE_ISSUE_REQUEST:
    case UPDATE_ISSUE_REQUEST: {
      const { id, loading } = action.payload;
      const issue = state.issues[id];
      return {
        ...state,
        issues: {
          ...state.issues,
          [id]: {
            ...issue,
            loading
          }
        }
      };
    }
    case TOGGLE_ISSUE_SUCCESS:
    case UPDATE_ISSUE_SUCCESS: {
      const { issue } = action.payload;
      return {
        ...state,
        issues: {
          ...state.issues,
          [issue._id]: {
            ...issue,
            loading: null
          }
        }
      };
    }
    case DELETE_ISSUE_REQUEST: {
      const { id } = action.payload;
      const issue = state.issues[id];
      return {
        ...state,
        issues: {
          ...state.issues,
          [id]: {
            ...issue,
            loading: 'deleteIssue'
          }
        }
      };
    }
    case DELETE_ISSUE_SUCCESS: {
      const { id } = action.payload;
      const { [id]: issueId, ...issues } = state.issues;
      const ids = Object.keys(issues);
      const count = state.count - 1;
      return {
        ...state,
        issues,
        count,
        ids
      };
    }
    default:
      return state;
  }
};
