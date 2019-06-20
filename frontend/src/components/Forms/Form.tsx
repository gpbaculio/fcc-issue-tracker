import React, { Component } from 'react';
import { Form, Spinner, Alert, Button } from 'reactstrap';
import axios from 'axios';

import FormInput from './FormInput';

interface FormProps {
  keys: FormKeys[];
  title: string;
  route: string;
  type: string;
}

interface FormState {
  [key: string]: string | boolean;
  loading: boolean;
  error: string;
  message: string;
  alertVisible: boolean;
}

export type FormKeys =
  | 'id'
  | 'issue_title'
  | 'issue_text'
  | 'created_by'
  | 'assigned_to'
  | 'status_text';

export class FormComponent extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      ...Object.fromEntries(props.keys.map(key => [key, ''])),
      loading: false,
      error: '',
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
    const { route } = this.props;
    const { loading, error, message, ...params } = this.state;
    this.setState({ loading: true });
    try {
      const { data } = await axios.post(route, params);
      this.setState({
        message: data.message,
        alertVisible: true,
        loading: false
      });
    } catch (error) {
      this.setState({
        error: error.response.data,
        alertVisible: true,
        loading: false
      });
    }
  };
  closeAlert = () => {
    this.setState({ alertVisible: false });
  };
  render() {
    const { title, keys, type, route } = this.props;
    const { loading, alertVisible, message, error } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className='api-form w-75 p-3 mx-auto'>
        <legend className='mb-2 text-center'>{title}</legend>
        <code className='px-1'>{`${type} ${route}`}</code>
        <Alert
          className='mt-2'
          color={(message && 'info') || (error && 'danger')}
          isOpen={alertVisible}
          toggle={this.closeAlert}>
          {message || error}
        </Alert>
        {keys.map((k, i) => {
          const { k: val } = this.state;
          return (
            <FormInput
              key={i}
              stateKey={k}
              value={val as string}
              handleChange={this.handleChange}
            />
          );
        })}
        <Button disabled={loading} type='submit' color='info' className='mt-2'>
          {loading && <Spinner size='sm' color='light' />} Submit
        </Button>
      </Form>
    );
  }
}

export default FormComponent;
