import React, { useState } from 'react';
import { Button, Spinner, Alert, Form } from 'reactstrap';
import { GoIssueOpened, GoIssueClosed, GoTrashcan } from 'react-icons/go';
import {
  IssueType,
  ToggleIssueArgsType,
  AlertType,
  DeleteIssueArgs,
  UpdateIssueArgs
} from '../store/issues/interfaces';
import { toDateString } from './utils';
import { connect } from 'react-redux';
import {
  toggleIssueStatus,
  closeAlert,
  deleteIssue,
  updateIssue
} from '../store/issues/actions';
import { AppState } from '../store';
import IssueInput from './IssueInput';

interface IssueProps extends IssueType {
  toggleIssueStatus: ({ id, projectName, open }: ToggleIssueArgsType) => void;
  project_name: string;
  alert: AlertType;
  closeAlert: () => void;
  error: boolean;
  deleteIssue: ({ id, projectName }: DeleteIssueArgs) => void;
  updateIssue: (updateIssueArgs: UpdateIssueArgs) => void;
}

const Issue = ({
  _id,
  issue_title,
  issue_text,
  created_by,
  assigned_to,
  status_text,
  createdAt,
  updatedAt,
  open,
  loading,
  toggleIssueStatus,
  project_name,
  alert,
  error,
  closeAlert,
  deleteIssue,
  updateIssue
}: IssueProps) => {
  const [issueTitle, setIssueTitle] = useState('');
  const [issueText, setIssueText] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [statusText, setStatusText] = useState('');
  const [editing, setEditing] = useState('');
  const updateIssueArgs = {
    id: _id,
    projectName: project_name,
    issue_title: issueTitle,
    issue_text: issueText,
    created_by: createdBy,
    assigned_to: assignedTo,
    status_text: statusText
  };
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        updateIssue(updateIssueArgs);
      }}
      style={{ backgroundColor: open ? '#f5f5f5' : '#D3D3D3' }}
      className='w-50 my-2 p-4 issue-container mx-auto d-flex flex-column align-items-center'>
      <Alert
        fade={false}
        className='mt-2'
        color={alert.type}
        isOpen={error}
        toggle={closeAlert}>
        {alert.message}
      </Alert>
      {loading === 'updateIssue' && (
        <React.Fragment>
          {' '}
          <Spinner size='lg' color='primary' /> Updating Issue...
        </React.Fragment>
      )}
      <div>
        <strong>id:</strong> {_id}
      </div>
      <div>
        <h4>
          <IssueInput
            initVal={issue_title}
            editing={editing}
            keyVal={'issueTitle'}
            value={issueTitle}
            setVal={setIssueTitle}
            setEditing={setEditing}
          />
          - {open ? 'open' : 'close'}
        </h4>
      </div>
      <div className='my-4'>
        <IssueInput
          initVal={issue_text}
          editing={editing}
          keyVal={'issueText'}
          value={issueText}
          setVal={setIssueText}
          setEditing={setEditing}
        />
      </div>
      <div className='my-4'>
        <IssueInput
          initVal={status_text}
          editing={editing}
          keyVal={'statusText'}
          value={statusText}
          setVal={setStatusText}
          setEditing={setEditing}
        />
      </div>
      <div className='my-2 w-100 grid-container'>
        <div>
          <strong>Created by: </strong>
          <IssueInput
            initVal={created_by}
            editing={editing}
            keyVal={'createdBy'}
            value={createdBy}
            setVal={setCreatedBy}
            setEditing={setEditing}
          />
        </div>
        <div>
          <strong>Assigned to: </strong>
          <IssueInput
            initVal={assigned_to}
            editing={editing}
            keyVal={'assignedTo'}
            value={assignedTo}
            setVal={setAssignedTo}
            setEditing={setEditing}
          />
        </div>
        <div>
          <strong>Created:</strong> {toDateString(createdAt)}
        </div>
        <div>
          <strong>Updated:</strong> {toDateString(updatedAt)}
        </div>
      </div>
      <div className='mt-2 d-flex w-50 justify-content-around'>
        <Button
          className='d-inline-flex align-items-center'
          disabled={loading === 'toggleStatus'}
          onClick={() =>
            toggleIssueStatus({
              id: _id,
              projectName: project_name,
              open: !open
            })
          }
          color={open ? 'success' : 'danger'}>
          {loading === 'toggleStatus' && <Spinner size='sm' color='light' />}
          {open ? (
            <React.Fragment>
              <GoIssueOpened />
              Open
            </React.Fragment>
          ) : (
            <React.Fragment>
              <GoIssueClosed />
              Closed
            </React.Fragment>
          )}
        </Button>
        <Button
          className='d-inline-flex align-items-center'
          disabled={loading === 'deleteIssue'}
          onClick={() =>
            deleteIssue({
              id: _id,
              projectName: project_name
            })
          }
          color='danger'>
          {loading === 'deleteIssue' && <Spinner size='sm' color='light' />}
          <GoTrashcan />
          delete
        </Button>
      </div>
    </Form>
  );
};

const mapStateToProps = ({ issues: { alert, error } }: AppState) => ({
  alert,
  error
});

const mapDispatchToPropts = {
  toggleIssueStatus,
  closeAlert,
  deleteIssue,
  updateIssue
};

export default connect(
  mapStateToProps,
  mapDispatchToPropts
)(Issue);
