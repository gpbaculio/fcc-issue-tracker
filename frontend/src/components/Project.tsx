import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Alert, Row, Col, Button } from 'reactstrap';

import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import Loader from './Loader';
import Issue from './Issue';
import { SubmitIssue } from './Forms';
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
  loading: boolean;
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
  fetchIssues = ({ page, projectName }: FetchIssuesArgsType) => {
    this.props.fetchIssues({
      page,
      projectName
    });
  };
  componentDidMount = () => {
    this.fetchIssues({
      page: 1,
      projectName: this.props.match.params.project_name
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
      issues,
      ids,
      alert,
      error,
      closeAlert,
      loading,
      count,
      page
    } = this.props;
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
          {loading && <Loader />}
          {ids
            .map(id => issues[id])
            .map((issue, i) => {
              return (
                <Col key={i} xs='12'>
                  <Issue project_name={project_name} {...issue} />
                </Col>
              );
            })}
        </Row>
        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
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
