import React, {Component} from 'react';
import './queueBox.css';
import QueueButton from './queueButton.js';

export class QueueBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            songNames: []
        }

        this.onAddToQueue = this.onAddToQueue.bind(this);
        this.getRoom = this.getRoom.bind(this);
    }

    getRoom() {
        return this.props.getRoomCode();
    }

    onAddToQueue(newQueue) {
        this.props.setQueue(newQueue);
    } 

    render() {
        return (
            <div className='queueBox'> 
                <QueueButton onAddToQueue={this.onAddToQueue} getRoom={this.getRoom}/>
                <div className='queues'>
                    {this.props.queue.map((url, index) => (
                        <a 
                            href={url} 
                            target='_blank' 
                            rel="noopener noreferrer"
                            className='queuedSong' 
                            key={index}
                        >{index === 0 ? 'Current Song' : `Song #${index+1}`}</a>
                    ))}
                </div>
            </div>
        )
    }
}

export default QueueBox