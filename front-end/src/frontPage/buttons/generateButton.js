//button to generate room codes
import React, {Component} from 'react';
import './buttons.css';
import GenerateRandomCode from 'react-random-code-generator';

export class GenerateButton extends Component {

    onCreateNewRoom = async () => {
        const newRoomCode = GenerateRandomCode.TextCode(6).toUpperCase();
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
    }

    render() {
        return (
            <button className="generate" onClick={this.onCreateNewRoom}>CREATE</button>
        );
    }
}

export default GenerateButton;