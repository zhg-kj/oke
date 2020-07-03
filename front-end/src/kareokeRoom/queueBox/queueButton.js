import React, {Component} from 'react';
import './queueBox.css';

export class QueueButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            enteredURL: ''
        }
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

    addToQueue = async () => {
        const activeRoom = this.props.getRoom();
        await fetch('/api/addToQueue', {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({activeRoom: activeRoom, enteredURL: this.state.enteredURL})
        })
        .then(res => res.json())
        .then(newQueue => this.props.onAddToQueue(newQueue));

        this.setState({enteredURL: ''})
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