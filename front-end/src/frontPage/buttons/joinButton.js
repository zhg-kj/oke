//button to join rooms
import React, {Component} from 'react';
import './buttons.css';
import { Link } from 'react-router-dom';

export class JoinButton extends Component  {
    constructor (props) {
        super(props)
        this.state = {
          enteredCode: ''
        }
      }

    handleInput(e) {
        this.setState({enteredCode: e.target.value});
    }

    handleClick() {
        this.checkRooms();
        this.props.onJoinRoom(this.state.enteredCode);
    }

    checkRooms(){
        const roomList = this.props.getRoomListForCheck();
        const code = this.state.enteredCode;
        for(let i = 0; i < roomList.length; i++){
            if(roomList[i].roomCode === code){
                return code;
            }
        }
        return 'NANI';
    }

    render() {
        return (
            <div>
                <input 
                    className="roomCodeInput"
                    type='text'
                    placeholder='Enter A Room Code'
                    onChange={this.handleInput.bind(this)}
                    value={this.state.enteredCode} 
                />
                <Link to={`/${this.checkRooms()}`}>
                    <button className="join" onClick={()=>this.handleClick(this)}>JOIN</button>
                </Link>
            </div>
        );
    }
}

export default JoinButton