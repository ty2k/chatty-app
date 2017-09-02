import React, {Component} from 'react';
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
export default NavBar;
