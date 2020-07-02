import React, {Component} from 'react';
import './room.css'
import ReactPlayer from 'react-player/youtube';

export class KareokeRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
            roomList: [],
            activeRoom: 'No Code Was Entered, Please Enter A Code And Try Again'
        }
    }

    render() {
        return (
            <div className="roomPage">
                <h4>{this.state.activeRoom}</h4>
                <ReactPlayer url='https://www.youtube.com/watch?v=VF35dqRydgs' playing={true} loop={true}/>
            </div>
        )
    }
}

export default KareokeRoom