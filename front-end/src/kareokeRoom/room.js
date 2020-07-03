import React, {Component} from 'react';
import './room.css'
import ReactPlayer from 'react-player/youtube';
import QueueBox from './queueBox/queueBox.js';

export class KareokeRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
            roomList: [],
            activeRoom: undefined,
            defaultMessage: undefined
        }

        this.getRoomCode = this.getRoomCode.bind(this);
    }

    getRoomCode(){
        return this.state.activeRoom;
    }

    componentDidMount() {
        const roomCode = this.props.getRoom();
        this.setState({activeRoom:roomCode});
        this.wasCodeEntered(roomCode);
    }

    wasCodeEntered(roomCode) {
        if(roomCode === 'NANI') {
            this.setState({defaultMessage:'No valid room code was entered, please try again.'});
        }
    }

    render() {
        return (
            <div className="roomPage">
                <div className='roomCornerText'>
                    <h1 className='roomCode'><strong>{this.state.activeRoom}</strong></h1>
                    <h4 className='noCode'><strong>{this.state.defaultMessage}</strong></h4>
                </div>
                <div className='playerElements'>
                    <ReactPlayer 
                        url='https://www.youtube.com/watch?v=VF35dqRydgs' 
                        className='reactPlayer'
                        playing={true} 
                        loop={true}
                        width={720}
                        height={405}/>
                    <QueueBox getRoomCode={this.getRoomCode}/>
                </div>
            </div>
        )
    }
}

export default KareokeRoom