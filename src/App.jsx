import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

const appData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

const ws = new WebSocket("ws://0.0.0.0:3001/");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = appData;
  }

  addMessage(message) {
    const newMessage = {
      id: Math.round(Math.random() * 10000000000),
      username: this.state.currentUser.name,
      content: message
    };
    ws.send(`New message from ${newMessage.username}: "${newMessage.content}"`);
    console.log("A new message has been sent: ")
    console.log(newMessage);
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({
      messages: newMessages
    });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    ws.onopen = function(event) {
      console.log('Connected to server', event);
      ws.send("Here's some text that the server is urgently awaiting!");
    }

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addOneMessage={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
