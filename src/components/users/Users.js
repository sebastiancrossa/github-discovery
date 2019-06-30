import React, { Component } from 'react';

// Component imports
import UserItem from './UserItem';

const Users = ({ loading, users }) => {
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
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
