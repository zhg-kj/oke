import React, {Component} from 'react';
import './room.css'
import ReactPlayer from 'react-player/youtube';
import QueueBox from './queueBox/queueBox.js';
import io from "socket.io-client";
import { Redirect } from "react-router-dom";

export class KareokeRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
            roomList: [],
            redirect: null,
            activeRoom: undefined,
            defaultMessage: undefined,
            queue: [],
            songNames: [],

            //STATES FOR PLAYER
            seaking: false,
            playing: false,
            currentVideo: null, //AKA URL
            played: 0,
            loaded: 0,
            duration: 0
        }

        this.getRoomCode = this.getRoomCode.bind(this);
        this.setQueue = this.setQueue.bind(this);

        this.socket = io('localhost:5000');

        //SYNC ROOM
        this.syncRoom = () => {
            this.socket.emit('SYNC_ROOM', {
                activeRoom: this.state.activeRoom
            });
        }

        this.socket.on('SYNCING_UP', confirm => {
            console.log(confirm);
        });

        //REMOVE FIRST URL IN QUEUE
        this.nextInQueue = () => {
            this.socket.emit('NEXT_URL', {
                activeRoom: this.state.activeRoom
            });
        }

        this.socket.on('RECEIVE_NEXT_URL_QUEUE', newQueue => {
            if(newQueue.length === 0){
                this.closeRoom();
                this.setState({redirect: '/closed'});
            } else {
                this.setState({ currentVideo: null, playing: true }, () => {this.pausePlay(); this.load(newQueue);});
                this.setState({queue:newQueue});
            }
        });

        //PAUSE PLAY
        this.pausePlay = () => {
            this.socket.emit('PAUSE_PLAY', {
                activeRoom: this.state.activeRoom,
                playing: this.state.playing
            });
        }

        this.socket.on('RECEIVE_PAUSE_PLAY', playingState => {
            this.setState({playing:playingState});
        });

        //USE SLIDER
        /*this.useSlider = (e) => {
            this.socket.emit('USED_SLIDER', {
                activeRoom: this.state.activeRoom,
                played: this.state.played,
                E: e
            });
        }

        this.socket.on('RECEIVE_NEW_TIME', data => {
            this.setState({played:data.newPlace});
            this.player.seekTo(parseFloat(data.e.target.value));
        });*/

    }

    componentDidMount() {
        const roomCode = this.props.getRoom();
        this.setState({activeRoom:roomCode}, () => {this.syncRoom()});
    }

    getRoomCode() {
        return this.state.activeRoom;
    }

    closeRoom() {
        fetch('/api/closeRoom', {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({activeRoom: this.state.activeRoom})
        })
        .then(res => res.json());
    }

    setQueue(newQueue) {
        this.setState({queue: newQueue}, () => { 
            if((newQueue.length > 0) && (this.state.currentVideo === null) && (this.state.playing === false)) {
                this.load(newQueue[0]);
            }
        });
    }

    /***LOAD VIDEO***/
    load = currentVideo => {
        this.setState({
            currentVideo,
            played: 0,
            loaded: 0
        });
    }

    /***PLAY BUTTON***/
    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing }, () => this.pausePlay());
    }

    /***SKIP BUTTON / SONG END***/
    handleStop = () => {
        this.nextInQueue();
    }

    /***SLIDER***/
    /*handleSeekMouseDown = e => {
        this.setState({ seeking: true });
    }
    
    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) });
    }
    
    handleSeekMouseUp = e => {
        this.setState({ seeking: false });
        this.useSlider(e);
    }

    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
        }
    }*/

    ref = player => {
        this.player = player
    }

    render() {
        const { currentVideo, playing } = this.state

        if (this.state.redirect) {
            this.closeRoom();
            return <Redirect to={this.state.redirect} />
        } 

        return (
            <div className="roomPage">
                <div className='roomCornerText'>
                    <h1 className='roomCode'><strong>{this.state.activeRoom}</strong></h1>
                    <h4 className='noCode'><strong>{this.state.defaultMessage}</strong></h4>
                </div>
                <div className='playerElements'>
                    <ReactPlayer 
                        ref={this.ref}
                        url={currentVideo} 
                        playing={playing} 
                        onEnded={this.handleStop}

                        className='reactPlayer'
                        width={720}
                        height={405}/>
                    <QueueBox 
                        getRoomCode={this.getRoomCode} 
                        setQueue={this.setQueue} 
                        queue={this.state.queue}
                    />
                    <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                    <button onClick={this.handleStop}>Skip</button>
                    {/*<input
                        className='videoSlider'
                        type='range' min={0} max={0.999999} step='any'
                        value={played}
                        onMouseDown={this.handleSeekMouseDown}
                        onChange={this.handleSeekChange}
                        onMouseUp={this.handleSeekMouseUp}
                    />*/}
                </div>
            </div>
        )
    }
}

export default KareokeRoom