import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
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

MessageList.propTypes = {
  messages: PropTypes.array
}

export default MessageList;
