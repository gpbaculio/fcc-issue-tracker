import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAILURE
} from './types';
import { IssuesInitState, IssuesctionTypes } from './interfaces';

export const initState: IssuesInitState = {
  ids: [],
  issues: {},
  page: 1,
  loading: false,
  count: 0
};

export default (state = initState, action: IssuesctionTypes) => {
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
