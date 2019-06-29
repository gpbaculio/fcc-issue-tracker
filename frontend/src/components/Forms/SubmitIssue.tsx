import React from 'react';
import { Form } from '../Form';
import { create } from './formArgs';

const SubmitIssue = () => {
  return (
    <Form
      type={create.type}
      route={create.route}
      fields={create.fields}
      title={create.title}
    />
  );
};

export default SubmitIssue;
