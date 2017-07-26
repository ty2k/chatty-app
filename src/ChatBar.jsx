import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={(event) => {
          if (event.key === 'Enter') {
            alert('That\'s the enter key!');
          }
        }} />
      </footer>
    );
  }
}
export default ChatBar;