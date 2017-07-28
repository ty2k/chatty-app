import React, {Component} from 'react';
import UserCount from './UserCount.jsx';

class NavBar extends Component {
  render() {
    console.log("Rendering <NavBar/>");
    console.log("this.props inside NavBar: ");
    console.log(this.props);
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <UserCount userCount={this.props.userCount} />
      </nav>
    );
  }
}
export default NavBar;