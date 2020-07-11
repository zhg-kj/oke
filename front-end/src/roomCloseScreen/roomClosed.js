import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class ClosedRoom extends Component {
    render() {
        return (
            <div className="noRoomWrapper">
                <h1 className="noRoom"><strong>THIS ROOM HAS BEEN CLOSED</strong></h1>
                <Link to='/'>
                    <button className="goBack"></button>
                </Link>
            </div>
        )
    }
}

export default ClosedRoom;