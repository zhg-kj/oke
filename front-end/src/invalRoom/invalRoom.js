import React, {Component} from 'react';
import './invalRoom.css'

export class InvalidRoom extends Component {
    render() {
        return (
            <div className="invalidRoom">
                The room you entered does not exist.
            </div>
        )
    }
}

export default InvalidRoom;