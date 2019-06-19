import React from 'react';
import { usageSamples, userStories } from './constants';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Home = () => {
  return (
    <React.Fragment>
      <h2 className='text-center'>FreeCodeCamp Issue Tracker</h2>
      <ol>
        {userStories.map((userStory, i) => (
          <li>{userStory}</li>
        ))}
      </ol>
      <h4>Usage</h4>
      <ul>
        {usageSamples.map(usage => (
          <li>{usage}</li>
        ))}
      </ul>
      <h4>Example Return</h4>
      <div>
        {`[{"_id":"5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"},...]`}
      </div>
      <Row className='my-3'>
        <Col>
          <Form className='api-form w-75 p-3 mx-auto'>
            <legend className='mb-2 text-center'>Submit Issue</legend>
            <FormGroup className='mb-1'>
              <Label className='mb-1 col-form-label-sm' for='issue_title'>
                Title
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='issue_title'
                id='issue_title'
                placeholder='Issue title'
              />
            </FormGroup>
            <FormGroup className='mb-1'>
              <Label className='mb-1 col-form-label-sm' for='issue_text'>
                Text
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='issue_text'
                id='issue_text'
                placeholder='Describe issue'
              />
            </FormGroup>
            <FormGroup className='mb-1'>
              <Label className='mb-1 col-form-label-sm' for='created_by'>
                Created by
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='created_by'
                id='created_by'
                placeholder='John Doe'
              />
            </FormGroup>
            <FormGroup className='mb-1'>
              <Label className='mb-1 col-form-label-sm' for='assigned_to'>
                (opt)Assigned to
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='assigned_to'
                id='assigned_to'
                placeholder='Jane Doe'
              />
            </FormGroup>
            <FormGroup className='mb-1'>
              <Label className='mb-1 col-form-label-sm' for='status_text'>
                (opt)Status text
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='status_text'
                id='status_text'
                placeholder='Describe issue status'
              />
            </FormGroup>
            <Button className='mt-2'>Submit</Button>
          </Form>
        </Col>
        <Col>
          <Form className='api-form w-75 p-3 mx-auto'>
            <legend className='mb-2 text-center'>Update Issue</legend>
            <FormGroup className='mb-1'>
              <Label className='mb-1 col-form-label-sm' for='issue_title'>
                Title
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='issue_title'
                id='issue_title'
                placeholder='Issue title'
              />
            </FormGroup>
            <FormGroup className='mb-1'>
              <Label className='mb-1 col-form-label-sm' for='issue_text'>
                Text
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='issue_text'
                id='issue_text'
                placeholder='Describe issue'
              />
            </FormGroup>
            <FormGroup className='mb-1'>
              <Label className='mb-1 col-form-label-sm' for='created_by'>
                Created by
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='created_by'
                id='created_by'
                placeholder='John Doe'
              />
            </FormGroup>
            <FormGroup className='mb-1'>
              <Label className='col-form-label-sm' for='assigned_to'>
                (opt)Assigned to
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='assigned_to'
                id='assigned_to'
                placeholder='Jane Doe'
              />
            </FormGroup>
            <FormGroup check className='d-flex align-items-center'>
              <Input className='mt-0' type='checkbox' name='close' id='close' />
              <Label
                className='form-check-label col-form-label-sm'
                for='close'
                check>
                Check to close issue
              </Label>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
        <Col>
          <Form className='api-form w-75 p-3 mx-auto'>
            <legend className='my-2 text-center'>Delete Issue</legend>
            <FormGroup className='mb-1'>
              <Label className='mb-1 col-form-label-sm' for='issue_id'>
                Id
              </Label>
              <Input
                bsSize='sm'
                required
                type='text'
                name='issue_id'
                id='issue_id'
                placeholder='Issue Id'
              />
            </FormGroup>
            <Button className='mt-2'>Submit</Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;
