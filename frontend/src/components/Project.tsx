import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Alert, Row, Col } from 'reactstrap';
import queryString from 'query-string';

import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import Loader from './Loader';
import Issue from './Issue';
import { AppState } from '../store';

import { fetchIssues, closeAlert } from '../store/issues/actions';
import {
  IssueType,
  FetchIssuesArgsType,
  AlertType
} from '../store/issues/interfaces';
import { Form } from './Form';

interface ProjectProps
  extends RouteComponentProps<{
    project_name: string;
    search: string;
  }> {
  issues: {
    [_id: string]: IssueType;
  };
  ids: string[];
  fetchIssues: ({ page, projectName }: FetchIssuesArgsType) => void;
  alert: AlertType;
  error: boolean;
  closeAlert: () => void;
  count: number;
  loading: string | null;
  page: number;
}
interface ProjectState {
  alertVisible: boolean;
}
class Project extends Component<ProjectProps, ProjectState> {
  constructor(props: ProjectProps) {
    super(props);
    this.state = {
      alertVisible: false
    };
  }
  fetchIssues = ({ page, projectName, searchQuery }: FetchIssuesArgsType) => {
    this.props.fetchIssues({
      page,
      projectName,
      searchQuery
    });
  };
  componentDidMount = () => {
    const {
      match: { params },
      location: { search }
    } = this.props;
    const searchQuery = queryString.parse(search);
    this.fetchIssues({
      page: 1,
      projectName: params.project_name,
      searchQuery
    });
  };
  handlePageChange = async (page: number) => {
    this.fetchIssues({
      page,
      projectName: this.props.match.params.project_name
    });
  };
  render() {
    const { project_name } = this.props.match.params;
    const {
      issues: issuesObj,
      ids,
      alert,
      error,
      closeAlert,
      loading,
      count,
      page
    } = this.props;
    const issues = ids.map(id => issuesObj[id]);
    return (
      <div className='w-100 d-flex flex-column align-items-center'>
        <h2 className='project-title my-3 p-3 w-100'>
          All issues for: {project_name}
        </h2>
        <Alert
          fade={false}
          className='mt-2'
          color={alert.type}
          isOpen={error}
          toggle={closeAlert}>
          {alert.message}
        </Alert>
        <div className='w-50 mt-4'>
          <Form
            type={'POST'}
            route={`/api/issues/${project_name}`}
            fields={{
              project_name,
              issue_title: '',
              issue_text: '',
              created_by: '',
              assigned_to: '',
              status_text: ''
            }}
            title={'Submit Issue'}
            disabledFields={['project_name']}
          />
        </div>
        <Row className='issues-row pt-4 my-4 w-100'>
          {loading === 'fetchIssues' && <Loader />}
          {loading !== 'fetchIssues' && !issues.length && (
            <div className='text-center m-auto'>No Issues Found</div>
          )}
          {issues.map((issue, i) => {
            return (
              <Col key={i} xs='12'>
                <Issue project_name={project_name} {...issue} />
              </Col>
            );
          })}
        </Row>
        {issues.length ? (
          <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({
  issues: { issues, ids, alert, error, loading, count, page }
}: AppState) => ({
  issues,
  ids,
  alert,
  error,
  loading,
  page,
  count
});

const mapDispatchToProps = {
  fetchIssues,
  closeAlert
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
