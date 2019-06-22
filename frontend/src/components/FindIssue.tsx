import React, { Component } from 'react';
import { Form, Input, Button, FormGroup, Label } from 'reactstrap';

class FindIssue extends Component {
  render() {
    return (
      <div className='w-75 mx-auto my-5 d-flex justify-content-center'>
        <Form inline className='d-flex w-100 justify-content-around'>
          <FormGroup className='flex-grow-1'>
            <Label for='searchIssues' className='mr-3 font-weight-bold'>
              Search issues
            </Label>
            <Input
              className='flex-grow-1 mr-3'
              type='text'
              name='search'
              id='searchIssues'
              placeholder='Project name'
            />
          </FormGroup>
          <Button color='primary'>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default FindIssue;
