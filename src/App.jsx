import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

const appData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [] // messages coming from the server will be stored here as they arrive
}

const ws = new WebSocket("ws://0.0.0.0:3001/");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = appData;
  }

  addMessage(message) {
    const newMessage = {
      id: new Date(),
      username: this.state.currentUser.name,
      content: message
    };
    ws.send(JSON.stringify(newMessage));
    console.log("A new message has been sent: ")
    console.log(newMessage);
  }

  changeUser(user) {
    this.setState({
      currentUser: {name: user}
    });
    console.log("Current user changed to " + user);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    ws.onopen = function(event) {
      console.log('Connected to server', event);
      //ws.send("Here's some text that the server is urgently awaiting!");
    }
    ws.onmessage = (event) => {
      console.log("Event: ");
      console.log(event);
      console.log("event.data: ");
      const incomingMessage = event.data;
      console.log(incomingMessage);
      console.log("this.state: ");
      console.log(this.state);
      const updatedMessages = this.state.messages.concat(JSON.parse(incomingMessage));
      this.setState({
        messages: updatedMessages
      });
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addOneMessage={this.addMessage.bind(this)} changeCurrentUser={this.changeUser.bind(this)} />
      </div>
    );
  }
}
export default App;
