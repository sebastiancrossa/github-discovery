import React, { useState } from 'react';
import axios from 'axios';
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
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /* Function that searches all of the possible matches from the passed username from the Github API */
  const searchUsers = async text => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(res.data.items);
    setLoading(false);
  };

  /* Function used for fetching the information of a certain Github user */
  const getUser = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  };

  /* Function used for fetching the repos of a certain Github user */
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  /* Clears users from the state */
  const clearUsers = e => {
    setUsers([]);
    setLoading(false);
  };

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
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      users={users}
                      setAlertMessage={setAlertMessage}
                    />
                    <Users loading={loading} users={users} />
                  </>
                )}
              />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
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
