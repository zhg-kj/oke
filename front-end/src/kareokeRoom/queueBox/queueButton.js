import React, {Component} from 'react';
import './queueBox.css';

export class QueueButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
          enteredURL: '',
          queue: []
        }
      }

    handleInput(e) {
        this.setState({enteredURL: e.target.value});
    }

    handleClick() {
        //Do something with the input
        let tempQueue = this.state.queue;
        tempQueue.push(this.state.enteredURL);
        this.setState({queue: tempQueue});
        //you don't have to do it like this idk what ur tryna do
        //i was thinking you update the state here and then send the enter array back to the back end and have
        //the backend update with new queue
    }

    //this is so people can just hit enter key instead of hitting button
    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { 
          //any code from handleClick should be added to here as well
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