import React, {Component} from 'react';

class Message extends Component {
  render() {
    const message = this.props.message;
    switch(message.type) {
      case 'incomingMessage':
        // Messages get rendered with spans around username and content
        return (
          <div className="message">
            <span className="message-username">{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>
        );
        break;
      case 'incomingNotification':
        // Notifications get rendered as line extra "system" class
        return (
          <div className="message system">
           {message.content}
          </div>
        );
        break;
      default:
        // If message type is unknown, throw error
        throw new Error('Unknown event type ' + message.type);
    }
  }
}
export default Message;
