import React, {Component} from 'react';
import {ReactComponent as EighthNote} from "./svgs/eighthNote.svg"
import './App.css';

class App extends Component{
  render(){
    return(
      <div>
        <div className="homeHeader">
          <h1><strong>SING WITH FRIENDS.</strong></h1>
          <h4>ANYTIME, AT THE TOUCH OF YOUR FINGERTIPS</h4>
          <EighthNote className="eighthNote"/> 
        </div>
      </div>
    );
  }
}

export default App;
