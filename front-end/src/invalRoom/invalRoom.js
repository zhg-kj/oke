import React, {Component} from 'react';
import './invalRoom.css'
import {Link} from 'react-router-dom';

export class InvalidRoom extends Component {
    render() {
        return (
            <div className="noRoomWrapper">
                <h1 className="noRoom"><strong>THE ROOM YOU ENTERED DOES NOT EXIST</strong></h1>
                <Link to='/'>
                    <button className="goBack"></button>
                </Link>
            </div>
        )
    }
}

export default InvalidRoom;