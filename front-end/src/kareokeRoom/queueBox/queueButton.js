import React, { Component } from 'react';
import './queueBox.css';
import io from "socket.io-client";

export class QueueButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            enteredURL: ''
        }

        this.socket = io('localhost:5000');

        //SYNC QUEUE
        this.syncQueue = () => {
            this.socket.emit('SYNC_QUEUE', {
                activeRoom: this.props.getRoom()
            });
        }

        this.socket.on('RECEIVE_QUEUE', newQueue => {
            props.onAddToQueue(newQueue);
        });

        //ADD URL
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

    componentDidMount() {
        setTimeout(() => this.syncQueue(),1000);
    }
    
    handleURLInput(e) {
        this.setState({enteredURL: e.target.value});
    }

    handleClick() {
        let valid = this.validateURL(this.state.enteredURL);
        if(valid){
            this.addToQueue();
        } else {
            console.log('Invalid URL')
        }
    }

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { 
            this.handleClick();
        } 
    }

    validateURL(url) {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if(url.match(p)){
            return url.match(p)[1];
        }
        return false;
    }

    render() {
        return (
            <div> 
                <input 
                    className="addQueueInput"
                    type='text'
                    placeholder='Enter A Song URL'
                    onChange={this.handleURLInput.bind(this)}
                    value={this.state.enteredURL} 
                    onKeyPress={this.enterPressed.bind(this)}
                />
                <button className="addQueue" onClick={()=>this.handleClick(this)}>+</button>
            </div>
        )
    }
}

export default QueueButton