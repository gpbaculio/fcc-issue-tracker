import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => (
  <div className='d-flex justify-content-center align-items-center h-100 w-100'>
    <div className='d-flex align-items-center'>
      <Spinner size='lg' className='m-auto loader' color='primary' />
      <span className='ml-2'>Fetching issues...</span>
    </div>
  </div>
);

export default Loader;
