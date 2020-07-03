import React, {Component} from 'react';
import './queueBox.css';
import QueueButton from './queueButton.js';

export class QueueBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            queue: []
        }
        this.onAddToQueue = this.onAddToQueue.bind(this);
        this.getRoom = this.getRoom.bind(this);
    }

    getRoom() {
        return this.props.getRoomCode()
    }

    onAddToQueue(newQueue) {
        this.setState({queue:newQueue});
    } 

    render() {
        return (
            <div className='queueBox'> 
                <QueueButton onAddToQueue={this.onAddToQueue} getRoom={this.getRoom}/>
                <div className='queues'>
                    {this.state.queue.map((url, index) => (
                        <p className='queuedSong' key={index}>{url}</p>
                    ))}
                </div>
            </div>
        )
    }
}

export default QueueBox