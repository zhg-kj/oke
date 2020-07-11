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
            duration: 0,
            volume: 0,
            firstBuffer: true
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
                this.setState({queue:newQueue, firstBuffer:true, volume:0});
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
        this.seekMouseUp = (e) => {
            this.socket.emit('SEEK_TO', {
                activeRoom: this.state.activeRoom,
                played: this.state.played,
                event: e
            });
        }

        this.socket.on('RECEIVE_SEEK', data => {
            this.player.seekTo(data.event);
            this.setState({played:data.played})
        });

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

    bufferStart = () => {
        this.setState({playing: true});
    }

    bufferEnd = () => {
        if(this.state.firstBuffer){
            this.setState({playing: false, firstBuffer: false, volume:100});
            this.player.seekTo(0)
        }
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
    handleSeekMouseDown = () => {
        this.setState({ seeking: true });
    }
    
    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) });
    }

    handleSeekMouseUp = e => {
        let event = e.target.value;
        this.setState({ seeking: false });
        this.seekMouseUp(event);
    }

    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    ref = player => {
        this.player = player
    }

    render() {
        const { currentVideo, playing, played, volume } = this.state

        if (this.state.redirect) {
            this.closeRoom();
            return <Redirect to={this.state.redirect} />
        } 

        return (
            <div className="roomPage">
                <div className='roomCodeWrapper'>
                    <h1 className='roomCode'><strong>{this.state.activeRoom}</strong></h1>
                </div>
                <div className="playerElementsWrapper">
                    <div className='playerElements'>
                        <ReactPlayer 
                            ref={this.ref}
                            url={currentVideo} 
                            playing={playing} 
                            volume={volume}
                            onEnded={this.handleStop}
                            onBufferEnd={this.bufferEnd}
                            onReady={this.bufferStart}

                            className='reactPlayer'
                            width='52.7vw'
                            height='29.64375vw'
                        />
                        <div className="playerCover"></div>
                        <QueueBox 
                            getRoomCode={this.getRoomCode} 
                            setQueue={this.setQueue} 
                            queue={this.state.queue}
                        />
                    </div>
                </div>
                <div className="playPauseWrapper">
                    <button id={playing ? 'pause' : 'play'} onClick={this.handlePlayPause}></button>
                    <button id="skip" onClick={this.handleStop}></button>
                    <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                    />
                </div>
            </div>
        )
    }
}

export default KareokeRoom