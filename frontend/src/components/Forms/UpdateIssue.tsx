import React from 'react';
import { Form } from '../Form';
import { update } from './formArgs';

const UpdateIssue = () => {
  return (
    <Form
      type={update.type}
      route={update.route}
      fields={update.fields}
      title={update.title}
    />
  );
};

export default UpdateIssue;
