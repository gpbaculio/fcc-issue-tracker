import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../index';
import { schema, normalize } from 'normalizr';
import axios from 'axios';
import { FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS } from './types';
import { FetchIssuesArgsType, FetchIssuesParamsType } from './interfaces';

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
    const response = await axios.get(`/api/issues/${projectName}`, {
      params
    });
    console.log('action response ', response);
    const norm = normalize(
      response.data.issues.map((t: any) => ({
        ...t,
        loading: false
      })),
      [issue]
    );
    console.log('norm ', norm);
  } catch (error) {
    console.log('error!', error);
  }
};
