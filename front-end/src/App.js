import React, {Component} from 'react';
import FrontPage from './frontPage/frontPage.js';
import KareokeRoom from './kareokeRoom/room.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div> 
          <Switch>
            <Route path='/' exact component={FrontPage}/>
            <Route path='/room' component={KareokeRoom}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
