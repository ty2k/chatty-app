import React, {Component} from 'react';

class UserCount extends Component {
  render() {
    return (
      <nav className="navbar-users">
        <span>{this.props.userCount} users online</span>
      </nav>
    );
  }
}
export default UserCount;
