import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Alert, Row, Col, Button } from 'reactstrap';
import Pagination from 'react-js-pagination';
import { Form } from './Form';
import Loader from './Loader';
import Issue from './Issue';

interface ProjectProps
  extends RouteComponentProps<{
    project_name: string;
  }> {}
interface ProjectState {
  issues: [];
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
      issues: [],
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
      this.setState({ issues, count, loading: false });
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
    const {
      message,
      alertVisible,
      issues,
      activePage,
      count,
      loading
    } = this.state;
    const { project_name } = this.props.match.params;
    if (loading) return <Loader />;
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
            disabledFields={['project_name']}
            title={'Submit Issue'}
          />
        </div>
        <Row className='my-4 w-100'>
          {issues.map((issue, i) => {
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

export default Project;
