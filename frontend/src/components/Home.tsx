import React from 'react';
import { Row, Col } from 'reactstrap';

import { usageSamples, userStories, sampleReturn } from './constants';
import { SubmitIssue, UpdateIssue, DeleteIssue } from './Forms';
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
          <SubmitIssue />
        </Col>
        <Col>
          <UpdateIssue />
        </Col>
        <Col>
          <DeleteIssue />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;
