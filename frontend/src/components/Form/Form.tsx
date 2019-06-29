import React, { Component } from 'react';
import { Form, Spinner, Alert, Button } from 'reactstrap';
import axios from 'axios';

import FormInput from './FormInput';

export type reqMethodType = 'POST' | 'PUT' | 'DELETE';

export interface FormProps {
  fields: {
    project_name?: string;
    id?: string;
    issue_title?: string;
    issue_text?: string;
    created_by?: string;
    assigned_to?: string;
    status_text?: string;
  };
  title: string;
  route: string;
  type: reqMethodType;
  disabledFields?: string[];
}

interface FormState {
  [key: string]: string | boolean;
  loading: boolean;
  error: boolean;
  message: string;
  alertVisible: boolean;
}

export type FormKeys =
  | 'id'
  | 'issue_title'
  | 'issue_text'
  | 'created_by'
  | 'assigned_to'
  | 'status_text'
  | 'project_name';

export class FormComponent extends Component<FormProps, FormState> {
  private initialFields: {};
  constructor(props: FormProps) {
    super(props);
    this.initialFields = { ...props.fields };
    this.state = {
      ...this.initialFields,
      loading: false,
      error: false,
      message: '',
      alertVisible: false
    };
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { route, type } = this.props;
    const { loading, error, message, alertVisible, ...params } = this.state;
    this.setState({ loading: true });
    try {
      const { data } = await axios({
        method: type,
        url: route.replace(':project_name', `${params.project_name}`),
        data: params
      });
      this.setState({
        error: false,
        ...this.initialFields,
        message: data.message,
        alertVisible: true,
        loading: false
      });
    } catch (error) {
      this.setState({
        ...this.initialFields,
        message: error.response.data,
        alertVisible: true,
        loading: false,
        error: true
      });
    }
  };
  closeAlert = () => {
    this.setState({ alertVisible: false, error: false, message: '' });
  };
  render() {
    const { title, type, route, fields, disabledFields } = this.props;
    const { loading, alertVisible, message, error } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className='api-form w-75 p-3 mx-auto'>
        <legend className='mb-2 text-center'>{title}</legend>
        <code className='px-1'>{`${type} ${route}`}</code>
        <Alert
          className='mt-2'
          color={error ? 'danger' : 'info'}
          isOpen={alertVisible}
          toggle={this.closeAlert}>
          {message}
        </Alert>
        {Object.keys(fields).map((k, i) => (
          <FormInput
            disable={
              disabledFields != null ? disabledFields.includes(k) : false
            }
            type={type}
            key={i}
            stateKey={k as FormKeys}
            value={this.state[k] as string}
            handleChange={this.handleChange}
          />
        ))}
        <Button disabled={loading} type='submit' color='info' className='mt-2'>
          {loading && <Spinner size='sm' color='light' />} Submit
        </Button>
      </Form>
    );
  }
}

export default FormComponent;
