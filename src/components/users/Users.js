import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = ({ loading, users }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem
            key={user.id}
            login={user.login}
            avatar={user.avatar_url}
            html={user.html_url}
          />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Users;
