import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
import UserCount from './UserCount.jsx';

// appData will become available in this.state
const appData = {
  // Setting a name explicitly is option; if currentUser is not defined, it is set to Anonymous
  currentUser: {name: "Bob"},
  messages: [],
  userCount: 0
}

const ws = new WebSocket("ws://0.0.0.0:3001/");


////////////////////////////////////
//   React App Parent Component   //
////////////////////////////////////


// App holds all React components and helper functions that require this.state
class App extends Component {
  constructor(props) {
    super(props);
    this.state = appData;
  }


  /////////////////////////////////////////////////
  //    Helper Functions requiring this.state    //
  /////////////////////////////////////////////////


  // When given a message string, send a message object to the WebSocket server
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

  // When given a new username, send a notification object to the WebSocket server
  changeUser(user) {
    let originalUser = this.state.currentUser.name;
    // If a user hasn't entered a name, assign them "Anonymous"
    let newUser = user || "Anonymous";
    this.setState({
      currentUser: {name: newUser}
    });
    console.log("Current user changed to " + newUser);
    let notificationStatement = (`${originalUser} changed their name to ${newUser}.`);
    let userChangeNotification = {
      type: "postNotification",
      id: new Date(),
      content: notificationStatement
    };
    ws.send(JSON.stringify(userChangeNotification));
  }


  /////////////////////////////////////////////
  //    React Component Lifecycle Methods    //
  /////////////////////////////////////////////


  // On successful connection, wait for incoming messages from server
  componentDidMount() {
    console.log("componentDidMount <App />");
    ws.onopen = function(event) {
      console.log('Connected to server', event);
    }
    // On receiving a new message, choose how to handle it based on its type
    ws.onmessage = (event) => {
      console.log("Received event: ");
      console.log(event);
      let data = JSON.parse(event.data);
      switch(data.type) {
        // For userCountUpdate messages, adjust the userCount to new value
        case "userCountUpdate":
          const updatedUserCount = data.content;
          this.setState({
            userCount: updatedUserCount
          });
          console.log("Updated User Count inside switch!");
          break;
        // For incomingMessage and incomingNotification messages, add to the messages array
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
