import React, {Component} from 'react';
import {ReactComponent as EighthNote} from './svgs/eighthNote.svg';
import './App.css';
import GenerateButton from './buttons/generateButton';
import JoinButton from './buttons/joinButton';

class App extends Component{
  render(){
    return(
      <div>
        <div className="frontPage">
          <h1><strong>SING WITH FRIENDS.</strong></h1>
          <h4>ANYTIME, ANYWHERE, AT THE TOUCH OF YOUR FINGERTIPS.</h4>
          <EighthNote className="eighthNote"/> 
          <GenerateButton />
          <JoinButton />
        </div>
        <div className="frontExplanation">
          <hr className="topLine"/>
          <h2>WHAT IT IS</h2>
          <p></p>
          <h2>WHAT IT'S NOT</h2>
          <p></p>
          <hr className="bottomLine"/>
        </div>
      </div>
    );
  }
}

export default App;
