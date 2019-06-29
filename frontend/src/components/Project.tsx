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

import { fetchIssues } from '../store/issues/actions';
import { IssueType, FetchIssuesArgsType } from '../store/issues/interfaces';

interface ProjectProps
  extends RouteComponentProps<{
    project_name: string;
  }> {
  issues: {
    [_id: string]: IssueType;
  };
  ids: string[];
  fetchIssues: ({ page, projectName }: FetchIssuesArgsType) => void;
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
  componentDidMount = async () => {
    try {
      this.setState({ loading: true });
      const {
        data: { issues, count }
      } = await axios.get(
        `/api/issues/${this.props.match.params.project_name}`
      );
      this.props.fetchIssues({
        page: 1,
        projectName: this.props.match.params.project_name
      });
      this.setState({ count, loading: false });
    } catch (error) {
      this.setState({
        message: error.response.data,
        alertVisible: true,
        loading: false
      });
    }
  };

  closeAlert = () => {
    this.setState({ alertVisible: false, message: '' });
  };
  handlePageChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber });
  };
  render() {
    const { message, alertVisible, activePage, count, loading } = this.state;
    const { project_name } = this.props.match.params;
    if (loading) return <Loader />;
    const { issues, ids } = this.props;
    return (
      <div className='w-100 d-flex flex-column align-items-center'>
        <h2 className='project-title my-3 p-3 w-100'>
          All issues for: {project_name}
        </h2>
        <Alert
          className='mt-2'
          color={'danger'}
          isOpen={alertVisible}
          toggle={this.closeAlert}>
          {message}
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

const mapStateToProps = ({ issues }: AppState) => ({
  issues: issues.issues,
  ids: issues.ids
});

const mapDispatchToProps = {
  fetchIssues
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
