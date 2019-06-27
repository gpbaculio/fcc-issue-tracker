import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

interface IssueProps {
  _id: string;
  issue_title: string;
  issue_text: string;
  created_by: string;
  assigned_to: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  project_name: string;
}
interface IssueState {
  status: boolean;
}
class Issue extends Component<IssueProps, IssueState> {
  constructor(props: IssueProps) {
    super(props);

    this.state = {
      status: props.status
    };
  }

  handleStatus = async () => {
    const { project_name, _id } = this.props;
    const { status } = this.state;
    const { data } = await axios({
      method: 'PUT',
      url: `/api/issues/${project_name}`,
      data: { status: !status, id: _id }
    });
    console.log('data ', data);
  };
  render() {
    const toDateString = (date: string) => new Date(date).toDateString();
    const {
      _id,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      createdAt,
      updatedAt,
      status
    } = this.props;
    return (
      <div className='w-50 my-2 p-4 issue-container mx-auto d-flex flex-column align-items-center'>
        <div>
          <strong>id:</strong> {_id}
        </div>
        <div>
          <h4>{`${issue_title} - (${status ? 'open' : 'close'})`}</h4>
        </div>
        <div className='my-4'>{issue_text}</div>
        <div className='my-2 w-100 grid-container'>
          <div>
            <strong>Created by:</strong> {created_by}
          </div>
          <div>
            <strong>Assigned to:</strong> {assigned_to}
          </div>
          <div>
            <strong>Created on:</strong> {toDateString(createdAt)}
          </div>
          <div>
            <strong>Last updated:</strong> {toDateString(updatedAt)}
          </div>
        </div>
        <div className='mt-2 d-flex w-50 justify-content-around'>
          <Button
            onClick={this.handleStatus}
            color={status ? 'success' : 'danger'}>
            close
          </Button>
          <Button color='danger'>delete</Button>
        </div>
      </div>
    );
  }
}

export default Issue;
