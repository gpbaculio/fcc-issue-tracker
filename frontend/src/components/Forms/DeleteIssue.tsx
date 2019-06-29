import React from 'react';
import { Form } from '../Form';
import { del } from './formArgs';

const DeleteIssue = () => {
  return (
    <Form
      type={del.type}
      route={del.route}
      fields={del.fields}
      title={del.title}
    />
  );
};

export default DeleteIssue;
