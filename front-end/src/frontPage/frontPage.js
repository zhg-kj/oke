import React, {Component} from 'react';
import {ReactComponent as EighthNote} from './svgs/eighthNote.svg';
import './frontPage.css';
import GenerateButton from './buttons/generateButton';
import JoinButton from './buttons/joinButton';

export class FrontPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      roomList: []
    };

    this.onJoinRoom = this.onJoinRoom.bind(this);
    this.onUpdateRooms = this.onUpdateRooms.bind(this);
    this.getRoomListForCheck = this.getRoomListForCheck.bind(this);
  }
  
  componentDidMount() {
    this.getRoomList();
  }

  getRoomList() {
    fetch('/api/getRoomList')
    .then(res => res.json())
    .then(list => this.setState({roomList: list}));
  }

  onJoinRoom(roomCode) {
    for(let i = 0; i < this.state.roomList.length; i++){
      if (this.state.roomList[i].roomCode === roomCode) {
        this.props.setRoom(roomCode);
      }
    }
  }

  onUpdateRooms(list) {
    this.setState({roomList: list});
  }

  getRoomListForCheck() {
    return this.state.roomList;
  }

  render() {
    return (
      <div> 
        <div className="frontPage">
          <h1><strong>SING WITH FRIENDS.</strong></h1>
          <h4>ANYTIME, ANYWHERE, AT THE TOUCH OF YOUR FINGERTIPS.</h4>
          <EighthNote className="eighthNote"/> 
          <GenerateButton onUpdateRooms={this.onUpdateRooms} getRoomListForCheck={this.getRoomListForCheck}/>
          <JoinButton onJoinRoom={this.onJoinRoom}/>
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

export default FrontPage;
