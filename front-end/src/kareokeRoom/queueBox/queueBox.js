import React, {Component} from 'react';
import './queueBox.css';
import QueueButton from './queueButton.js';

export class QueueBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeRoom: undefined,
            queue: ['url1','url2']
        }

        //basically all you need to do is add queues to the state and it should show up
    }

    componentDidMount(){
        this.setState({activeRoom: this.props.getRoomCode()});
    }

    render() {
        return (
            <div className='queueBox'> 
                <QueueButton/>
                <div className='queues'>
                    {this.state.queue.map((url, index) => (
                        <p key={index}>{url}</p>
                    ))}
                </div>
            </div>
        )
    }
}

export default QueueBox