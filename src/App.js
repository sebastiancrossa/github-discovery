import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

// Component imports
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';

import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />

            <div className='container'>
              <Alert />

              <Switch>
                <Route exact path='/' render={Home} />
                <Route
                  exact
                  path='/user/:login'
                  render={props => <User {...props} />}
                />
                <Route exact path='/about' render={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
