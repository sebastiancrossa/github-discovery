import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
  static defaultProps = {
    title: 'Github Discovery',
    icon: 'fab fa-github'
  };

  render() {
    return (
      <div className='navbar bg-primary'>
        <h3>
          <i className={this.props.icon} /> {this.props.title}
        </h3>
      </div>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
