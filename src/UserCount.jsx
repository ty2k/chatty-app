import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserCount extends Component {
  render() {
    return (
      <nav className="navbar-users">
        <span>{this.props.userCount} users online</span>
      </nav>
    );
  }
}

UserCount.propTypes = {
  userCount: PropTypes.number.isRequired
}

export default UserCount;
