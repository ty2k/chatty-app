import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messagesArray = this.props.messages;
    const messagesMap = messagesArray.map((message) =>
      <Message message={message} key={message.id}/>
    );
    return (
      <main className="messages">
        <div>
          {messagesMap}
        </div>
      </main>
    );
  }
}
export default MessageList;