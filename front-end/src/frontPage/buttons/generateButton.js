//button to generate room codes
import React, {Component} from 'react';
import './buttons.css';
import GenerateRandomCode from 'react-random-code-generator';

export class GenerateButton extends Component {
    constructor(props){
        super(props);

        this.state = {
            roomCode: '######'
        }
    }

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
            this.setState({roomCode:newRoomCode})
        } else {
            this.onCreateNewRoom();
        }
    }

    render() {
        return (
            <div>
                <button className="generate frontPgButton" onClick={this.onCreateNewRoom}>CREATE</button>
                <p className="createdRoom">{this.state.roomCode}</p>
            </div>
        );
    }
}

export default GenerateButton;