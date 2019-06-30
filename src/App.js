import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

// Component imports
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';

class App extends Component {
  state = {
    users: [],
    loading: false
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

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = e => {
    this.setState({ users: [], loading: false });
  };

  render() {
    const { users, loading } = this.state;

    return (
      <div className='App'>
        <Navbar />

        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            users={this.state.users}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
