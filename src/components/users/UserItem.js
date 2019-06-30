import React from 'react';

const UserItem = ({ login, avatar, html }) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar}
        className='round-img'
        style={{ width: '60px' }}
        alt='User profile image'
      />
      <h3>{login}</h3>

      <div>
        <a href={html} className='btn btn-dark btn-sm my-1'>
          More...
        </a>
      </div>
    </div>
  );
};

export default UserItem;
