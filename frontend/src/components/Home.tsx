import React from 'react';
import { Row, Col } from 'reactstrap';

import { usageSamples, userStories, sampleReturn } from './constants';
import { Form } from './Form';
import SearchProject from './SearchProject';

const Home = () => {
  return (
    <React.Fragment>
      <h2 className='text-center'>FreeCodeCamp Issue Tracker</h2>
      <ol>
        {userStories.map((userStory, i) => (
          <li key={userStory.length * i}>{userStory}</li>
        ))}
      </ol>
      <h4>Usage</h4>
      <ul>
        {usageSamples.map((usage, i) => (
          <li key={usage.length * i}>{usage}</li>
        ))}
      </ul>
      <h4>Example Return</h4>
      <div>{sampleReturn}</div>
      <Row>
        <Col>
          <SearchProject />
        </Col>
      </Row>
      <Row className='my-3'>
        <Col>
          <Form
            type={'POST'}
            route={'/api/issues/:project_name'}
            fields={{
              project_name: '',
              issue_title: '',
              issue_text: '',
              created_by: '',
              assigned_to: '',
              status_text: ''
            }}
            title={'Submit Issue'}
          />
        </Col>
        <Col>
          <Form
            type={'PUT'}
            route={'/api/issues/:project_name'}
            fields={{
              project_name: '',
              id: '',
              issue_title: '',
              issue_text: '',
              created_by: '',
              assigned_to: '',
              status_text: ''
            }}
            title={'Update Issue'}
          />
        </Col>
        <Col>
          <Form
            type={'DELETE'}
            route={'/api/issues/:project_name'}
            fields={{ project_name: '', id: '' }}
            title={'Submit Issue'}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;
