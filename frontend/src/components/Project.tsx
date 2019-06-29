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
  loading: boolean;
}
interface ProjectState {
  message: '';
  alertVisible: boolean;
  count: number;
  loading: boolean;
  activePage: number;
}
class Project extends Component<ProjectProps, ProjectState> {
  constructor(props: ProjectProps) {
    super(props);
    this.state = {
      message: '',
      loading: false,
      alertVisible: false,
      count: 0,
      activePage: 1
    };
  }
  componentDidMount = () => {
    this.props.fetchIssues({
      page: 1,
      projectName: this.props.match.params.project_name
    });
  };

  closeAlert = () => {
    this.setState({ alertVisible: false, message: '' });
  };
  handlePageChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber });
  };
  render() {
    const { activePage, count } = this.state;
    const { project_name } = this.props.match.params;
    const { issues, ids, alert, error, closeAlert, loading } = this.props;
    if (loading) return <Loader />;
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
          <SubmitIssue />
        </div>
        <Row className='my-4 w-100'>
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
          activePage={activePage}
          itemsCountPerPage={5}
          totalItemsCount={count}
          pageRangeDisplayed={3}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  issues: { issues, ids, alert, error, loading }
}: AppState) => ({
  issues,
  ids,
  alert,
  error,
  loading
});

const mapDispatchToProps = {
  fetchIssues,
  closeAlert
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
