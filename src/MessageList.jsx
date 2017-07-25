import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messagesArray = this.props.messages;
    const messagesDiv = messagesArray.map((message) =>
      <div key={message.id}>
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    );
    return (
      <main className="messages">
        <div>
          {messagesDiv}
        </div>
      </main>
    );
  }
}
export default MessageList;