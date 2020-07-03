import React, {Component} from 'react';
import './queueBox.css';
import io from "socket.io-client";

export class QueueButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            enteredURL: ''
        }

        this.socket = io('localhost:5000');

        this.addToQueue = () => {
            this.socket.emit('SEND_URL', {
                enteredURL: this.state.enteredURL,
                activeRoom: this.props.getRoom()
            });
            this.setState({enteredURL: ''});
        }

        this.socket.on('RECEIVE_QUEUE', newQueue => {
            props.onAddToQueue(newQueue)
        });
    }
    
    handleInput(e) {
        this.setState({enteredURL: e.target.value});
    }

    handleClick() {
        this.addToQueue();
    }

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { 
            this.addToQueue();
        } 
    }

    render() {
        return (
            <div> 
                <input 
                    className="addQueueInput"
                    type='text'
                    placeholder='Enter A Song URL'
                    onChange={this.handleInput.bind(this)}
                    value={this.state.enteredURL} 
                    onKeyPress={this.enterPressed.bind(this)}
                />
                <button className="addQueue" onClick={()=>this.handleClick(this)}>+</button>
            </div>
        )
    }
}

export default QueueButton