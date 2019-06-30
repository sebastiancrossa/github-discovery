import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <>
      <img src={spinner} alt='Loading spinner...' style={userStyle} />
    </>
  );
};

const userStyle = {
  width: '200px',
  margin: 'auto',
  display: 'block'
};

export default Spinner;
