import React, {Component} from 'react';
import './roomClosed.css'

export class ClosedRoom extends Component {
    render() {
        return (
            <div className="closedRoom">
                This Room Has Been Closed
            </div>
        )
    }
}

export default ClosedRoom;