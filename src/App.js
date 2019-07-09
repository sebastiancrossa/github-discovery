import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import GithubState from './context/github/GithubState';

// Component imports
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import Alert from './components/layout/Alert';

import About from './components/pages/About';

const App = () => {
  const [alert, setAlert] = useState(null);

  /* Shows an alert for 5 seconds with the specified message and type */
  const setAlertMessage = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />

          <div className='container'>
            <Alert alert={alert} />

            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <>
                    <Search setAlertMessage={setAlertMessage} />
                    <Users />
                  </>
                )}
              />
              <Route
                exact
                path='/user/:login'
                render={props => <User {...props} />}
              />
              <Route exact path='/about' render={About} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
