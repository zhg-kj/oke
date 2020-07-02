//button to generate room codes
import React, {Component} from 'react';
import './buttons.css';
import GenerateRandomCode from 'react-random-code-generator';

export class GenerateButton extends Component {

    onCreateNewRoom = async () => {
        const newRoomCode = GenerateRandomCode.TextCode(6).toUpperCase();
        let roomList = this.props.getRoomListForCheck();
        let newRoom = true;

        for(let i = 0; i < roomList.length; i++){
            if(roomList[i].roomCode === newRoomCode) {
                newRoom = false;
                break;
            }
        }

        if (newRoom) {
            await fetch('/api/newRoom', {
                method: "post",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({roomCode: newRoomCode})
            })
            .then(res => res.json())
            .then(list => this.props.onUpdateRooms(list));
        } else {
            this.onCreateNewRoom();
        }
    }

    render() {
        return (
            <button className="generate" onClick={this.onCreateNewRoom}>CREATE</button>
        );
    }
}

export default GenerateButton;