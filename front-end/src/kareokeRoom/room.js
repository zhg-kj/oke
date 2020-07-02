import React, {Component} from 'react';
import './room.css'
import ReactPlayer from 'react-player/youtube';

export class KareokeRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
            roomList: [],
            activeRoom: undefined,
            defaultMessage: undefined
        }
    }

    componentDidMount() {
        const roomCode = this.props.getRoom();
        this.setState({activeRoom:roomCode});
        this.wasCodeEntered(roomCode);
    }

    wasCodeEntered(roomCode) {
        if(roomCode === '######') {
            this.setState({defaultMessage:'No valid room code was entered, please try again.'});
        }
    }

    render() {
        return (
            <div className="roomPage">
                <h1>{this.state.activeRoom}</h1>
                <h4>{this.state.defaultMessage}</h4>
                <ReactPlayer url='https://www.youtube.com/watch?v=VF35dqRydgs' playing={true} loop={true}/>
            </div>
        )
    }
}

export default KareokeRoom