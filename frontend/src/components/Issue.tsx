import React, { Component } from 'react';
import { Button, Spinner, Alert } from 'reactstrap';
import {
  IssueType,
  ToggleIssueArgsType,
  AlertType
} from '../store/issues/interfaces';
import { toDateString } from './utils';
import { connect } from 'react-redux';
import { toggleIssueStatus, closeAlert } from '../store/issues/actions';
import { AppState } from '../store';

interface IssueProps extends IssueType {
  toggleIssueStatus: ({ id, projectName, status }: ToggleIssueArgsType) => void;
  project_name: string;
  alert: AlertType;
  closeAlert: () => void;
  error: boolean;
}

const Issue = ({
  _id,
  issue_title,
  issue_text,
  created_by,
  assigned_to,
  createdAt,
  updatedAt,
  status,
  loading,
  toggleIssueStatus,
  project_name,
  alert,
  error,
  closeAlert
}: IssueProps) => (
  <div
    style={{ backgroundColor: status ? '#f5f5f5' : '#D3D3D3' }}
    className='w-50 my-2 p-4 issue-container mx-auto d-flex flex-column align-items-center'>
    <Alert
      fade={false}
      className='mt-2'
      color={alert.type}
      isOpen={error}
      toggle={closeAlert}>
      {alert.message}
    </Alert>
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
        disabled={loading}
        onClick={() =>
          toggleIssueStatus({
            id: _id,
            projectName: project_name,
            status: !status
          })
        }
        color={status ? 'success' : 'danger'}>
        {loading && <Spinner size='sm' color='light' />}
        {status ? 'Open' : 'Close'}
      </Button>
      <Button color='danger'>delete</Button>
    </div>
  </div>
);

const mapStateToProps = ({ issues: { alert, error } }: AppState) => ({
  alert,
  error
});

const mapDispatchToPropts = { toggleIssueStatus, closeAlert };

export default connect(
  mapStateToProps,
  mapDispatchToPropts
)(Issue);
