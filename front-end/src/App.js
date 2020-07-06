import React, {Component} from 'react';
import FrontPage from './frontPage/frontPage.js';
import KareokeRoom from './kareokeRoom/room.js';
import ClosedRoom from './roomCloseScreen/roomClosed.js';
import InvalidRoom from './invalRoom/invalRoom.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeRoom: undefined
    }
  }

  setRoom = (roomCode) => {
    this.setState({activeRoom: roomCode});
  }

  getRoom = () => {
    return this.state.activeRoom;
  }

  render() {
    return (
      <Router>
        <div> 
          <Switch>
            <Route path='/' exact render={() => <FrontPage setRoom={this.setRoom}/>}/>
            <Route path={`/${this.state.activeRoom}`} render={() => <KareokeRoom getRoom={this.getRoom}/>}/>
            <Route path='/closed' component={ClosedRoom}/>
            <Route path='/NANI' component={InvalidRoom}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
