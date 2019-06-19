import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components';
import { Container } from 'reactstrap';

const App: React.FC = () => {
  return (
    <Container className='app-container'>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Container>
  );
};

export default App;
