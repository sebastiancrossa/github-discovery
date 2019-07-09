import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
          More...
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
