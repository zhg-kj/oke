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

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { 
            this.checkRooms();
            this.props.onJoinRoom(this.state.enteredCode);
        } 
    }
    //FYI ENTER PRESSED DOES NOT WORK

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
                    onKeyPress={this.enterPressed.bind(this)}
                />
                <Link to={`/${this.checkRooms()}`}>
                    <button className="join" onClick={()=>this.handleClick(this)}>JOIN</button>
                </Link>
            </div>
        );
    }
}

export default JoinButton