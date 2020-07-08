import React, {Component} from 'react';
import Microphone from './pngs/microphone.png';
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
        break;
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
      <div className="frontPage"> 
        <div className="pageOneBox">
          <div className="titleWrapper">
            <h1><strong>OKE</strong></h1>
            <img className="microphone" src={Microphone} alt="Microphone" />
            <h4>the Online Karaoke Experience</h4>
          </div>
          <div className="buttonWrapper">
            <GenerateButton onUpdateRooms={this.onUpdateRooms} getRoomListForCheck={this.getRoomListForCheck}/>
            <JoinButton onJoinRoom={this.onJoinRoom} getRoomListForCheck={this.getRoomListForCheck}/>
          </div>
        </div>
        <div className="frontExplanation">
          <h2>WHAT IT IS</h2>
          <p></p>
          <h2>WHAT IT'S NOT</h2>
          <p></p>
        </div>
      </div>
    );
  }
}

export default FrontPage;
