import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserCount from './UserCount.jsx';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <UserCount userCount={this.props.userCount} />
      </nav>
    );
  }
}

NavBar.propTypes = {
  userCount: PropTypes.number.isRequired
}

export default NavBar;
