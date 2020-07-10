//button to join rooms
import React, {Component} from 'react';
import './buttons.css';
import { Redirect } from 'react-router-dom';

export class JoinButton extends Component  {
    constructor (props) {
        super(props)
        this.state = {
          enteredCode: '',
          redirect: null
        }
      }

    handleInput(e) {
        this.setState({enteredCode: e.target.value});
    }

    handleClick() {
        const roomList = this.props.getRoomListForCheck();
        const code = this.state.enteredCode;
        for(let i = 0; i < roomList.length; i++){
            if(roomList[i].roomCode === code){
                this.setState({redirect:`/${code}`});
                this.props.onJoinRoom(this.state.enteredCode);
                return undefined
            }
        }
        this.setState({redirect:'/NANI'});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <input 
                    className="roomCodeInput"
                    type='text'
                    placeholder='Enter Your Room Code'
                    onChange={this.handleInput.bind(this)}
                    value={this.state.enteredCode} 
                />
                <button className="join frontPgButton" onClick={()=>this.handleClick(this)}>JOIN</button>
            </div>
        );
    }
}

export default JoinButton