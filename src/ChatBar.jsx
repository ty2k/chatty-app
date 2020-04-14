import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" onKeyDown={(event) => {
          if (event.key === 'Enter') {
            this.props.changeCurrentUser(event.target.value);
          }
        }} />

        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={(event) => {
          if (event.key === 'Enter') {
            this.props.addOneMessage(event.target.value);
            event.target.value = '';
          }
        }} />
      </footer>
    );
  }
}

ChatBar.propTypes = {
  changeCurrentUser: PropTypes.function,
  currentUser: {
    name: PropTypes.string
  },
  addOneMessage: PropTypes.function
};

export default ChatBar;
