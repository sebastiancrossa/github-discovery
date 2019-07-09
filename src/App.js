import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Component imports
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import Alert from './components/layout/Alert';

import About from './components/pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  async componentDidMount() {
    /*
     * this.setState({ loading: true });
     * const res = await axios.get(
     *   `https://api.github.com/users?client_id=${
     *     process.env.REACT_APP_GITHUB_CLIENT_ID
     *   }&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
     * );
     *
     * this.setState({ users: res.data, loading: false });
     */
  }

  /* Function that searches all of the possible matches from the passed username from the Github API */
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  /* Function used for fetching the information of a certain Github user */
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  /* Clears users from the state */
  clearUsers = e => {
    this.setState({ users: [], loading: false });
  };

  /* Shows an alert for 5 seconds with the specified message and type */
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, user, alert } = this.state;

    return (
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
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      users={users}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
              <Route exact path='/about' render={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
