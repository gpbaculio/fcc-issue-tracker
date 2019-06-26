import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Project } from './components';
import { Container } from 'reactstrap';

const App: React.FC = () => {
  return (
    <Container className='app-container'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:project_name' component={Project} />
      </Switch>
    </Container>
  );
};

export default App;
