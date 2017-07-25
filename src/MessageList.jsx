import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messagesArray = this.props.messages;
    const messagesDivs = messagesArray.map((message) =>
      <div>{message.username}: {message.content}</div>
    );
    return (
      <main className="messages">
        <div>
          {messagesDivs}
        </div>
      </main>
    );
  }
}
export default MessageList;