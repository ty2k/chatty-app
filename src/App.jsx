import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

const appData = {
  currentUser: {name: 'Anonymous'},
  messages: [],
  userCount: 0
}
const ws = new WebSocket('ws://0.0.0.0:3001/');
const rootDiv = document.querySelector('#react-root');
const observer = new MutationObserver(scrollToBottom);
const observerConfig = {childList: true};
observer.observe(rootDiv, observerConfig);
function scrollToBottom() {
  rootDiv.scrollTop = rootDiv.scrollHeight;
}

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

  // When given a message string, send a message object to WebSocket server
  addMessage(message) {
    const newMessage = {
      type: 'postMessage',
      id: new Date(),
      username: this.state.currentUser.name,
      content: message
    };
    ws.send(JSON.stringify(newMessage));
  }

  // When given a new username, send a notification object to WebSocket server
  changeUser(user) {
    const originalUser = this.state.currentUser.name;
    // If a user hasn't entered a name, assign them "Anonymous"
    const newUser = user || 'Anonymous';
    this.setState({
      currentUser: {name: newUser}
    });
    const notificationStatement = (`${originalUser} changed their name to ${newUser}.`);
    const userChangeNotification = {
      type: 'postNotification',
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
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        // For userCountUpdate messages, adjust the userCount to new value
        case 'userCountUpdate':
          this.setState({
            userCount: data.content
          });
          break;
        // For incomingMessage and incomingNotification messages, add to the messages array
        case 'incomingMessage':
        case 'incomingNotification':
          this.setState({
            messages: this.state.messages.concat(data)
          });
          break;
        default:
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }

  render() {
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
