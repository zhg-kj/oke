import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export class ClosedRoom extends Component {
    render() {
        return (
            <div className="noRoomWrapper">
                <h1 className="noRoom">This Room Has Been Closed</h1>
                <Link to='/'>
                    <button className="goBack">Go Back</button>
                </Link>
            </div>
        )
    }
}

export default ClosedRoom;