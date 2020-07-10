import React, {Component} from 'react';
import './invalRoom.css'
import { Link } from 'react-router-dom';

export class InvalidRoom extends Component {
    render() {
        return (
            <div className="noRoomWrapper">
                <h1 className="noRoom">The room you entered does not exist.</h1>
                <Link to='/'>
                    <button className="goBack">Go Back</button>
                </Link>
            </div>
        )
    }
}

export default InvalidRoom;