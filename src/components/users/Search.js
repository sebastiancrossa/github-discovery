import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({
  searchUsers,
  showClear,
  clearUsers,
  setAlertMessage,
  users
}) => {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlertMessage('Please enter a username', 'light');
    } else {
      searchUsers(text); // Passing a value upwards
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search user...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>

      {users.length == 0 ? null : (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired
};

export default Search;
