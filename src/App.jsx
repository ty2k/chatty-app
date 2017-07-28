import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
import UserCount from './UserCount.jsx';

const appData = {
  // Setting currentUser here is optional; if currentUser is not defined, it is set to Anonymous
  currentUser: {name: "Bob"},
  // Messages coming from the server will be added to this array as they arrive
  messages: [],
  // The userCount gets updated on each client connection opened and closed
  userCount: 0
}

const ws = new WebSocket("ws://0.0.0.0:3001/");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = appData;
  }

  // When given a message string, create a new message object and send it
  addMessage(message) {
    const newMessage = {
      type: "postMessage",
      id: new Date(),
      username: this.state.currentUser.name,
      content: message
    };
    ws.send(JSON.stringify(newMessage));
    console.log("A new message has been sent: ")
    console.log(newMessage);
  }

  changeUser(user) {
    let originalUser = this.state.currentUser.name;
    // If a user hasn't entered a name, assign them "Anonymous"
    let newUser = user || "Anonymous";
    this.setState({
      currentUser: {name: newUser}
    });
    console.log("Current user changed to " + newUser);
    let notificationStatement = (`${originalUser} changed their name to ${newUser}.`);
    console.log("notificationStatement: ");
    console.log(notificationStatement);
    let userChangeNotification = {
      type: "postNotification",
      id: new Date(),
      content: notificationStatement
    };
    ws.send(JSON.stringify(userChangeNotification));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    ws.onopen = function(event) {
      console.log('Connected to server', event);
    }
    ws.onmessage = (event) => {
      console.log("Event: ");
      console.log(event);
      let data = JSON.parse(event.data);
      console.log("data variable: ");
      console.log(data);
      console.log("this.state: ");
      console.log(this.state);
      switch(data.type) {
        case "userCountUpdate":
          const updatedUserCount = data.content;
          this.setState({
            userCount: updatedUserCount
          });
          console.log("Updated User Count inside switch!");
          break
        case "incomingMessage":
        case "incomingNotification":
          const updatedMessages = this.state.messages.concat(data);
          this.setState({
            messages: updatedMessages
          });
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addOneMessage={this.addMessage.bind(this)} changeCurrentUser={this.changeUser.bind(this)} />
      </div>
    );
  }
}
export default App;
