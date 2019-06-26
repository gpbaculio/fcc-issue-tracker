import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Alert, Row, Col, Button } from 'reactstrap';
import Pagination from 'react-js-pagination';
import { Form } from './Form';

interface ProjectProps
  extends RouteComponentProps<{
    project_name: string;
  }> {}
interface ProjectState {
  issues: [];
  message: '';
  alertVisible: boolean;
  count: number;
  activePage: number;
}
class Project extends Component<ProjectProps, ProjectState> {
  constructor(props: ProjectProps) {
    super(props);
    this.state = {
      issues: [],
      message: '',
      alertVisible: false,
      count: 0,
      activePage: 1
    };
  }
  componentDidMount = async () => {
    try {
      const {
        data: { issues, count }
      } = await axios.get(
        `/api/issues/${this.props.match.params.project_name}`
      );
      this.setState({ issues, count });
    } catch (error) {
      this.setState({ message: error.response.data, alertVisible: true });
    }
  };

  closeAlert = () => {
    this.setState({ alertVisible: false, message: '' });
  };
  handlePageChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber });
  };
  render() {
    const { message, alertVisible, issues, activePage, count } = this.state;
    const { project_name } = this.props.match.params;
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
        <Row className='w-100'>
          {issues.map(
            (
              {
                project_name,
                issue_title,
                issue_text,
                created_by,
                assigned_to,
                status_text,
                status,
                _id,
                createdAt,
                updatedAt
              },
              i
            ) => {
              return (
                <Col key={i} xs='12'>
                  <div className='w-50 project-container mx-auto d-flex flex-column align-items-center'>
                    <div>id: {_id}</div>
                    <div>
                      <h4>{`${issue_title} - (${
                        status ? 'open' : 'close'
                      })`}</h4>
                    </div>
                    <div>{issue_text}</div>
                    <div className='d-flex w-50 justify-content-between'>
                      <div>cby {created_by}</div>
                      <div>ato {assigned_to}</div>
                    </div>
                    <div className='d-flex w-50 justify-content-between'>
                      <Button>close</Button>
                      <Button>delete</Button>
                    </div>
                  </div>
                </Col>
              );
            }
          )}
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
