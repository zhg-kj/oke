/***BACKEND***/
const express = require('express');
const path = require('path');

const app = express();

let rooms = [];

/***SERVER***/
const port = process.env.PORT || 5000;
server = app.listen(port, function(){
    console.log('App is listening on port ' + port)
});


/***SOCKET.IO***/
const socket = require('socket.io');
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    //SYNC ROOM 
    socket.on('SYNC_ROOM', data => {
        console.log('SYNC ROOM REQUEST RECEIVED');
        const activeRoom = data.activeRoom;
        socket.join(activeRoom);
        let newQueue;
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].roomCode === activeRoom){
                newQueue = rooms[i].songQueue;
                break;
            }
        }

        io.to(activeRoom).emit('RECEIVE_QUEUE', newQueue);
        console.log('ROOM SYNCED');
    })

    //ADD TO QUEUE
    socket.on('SEND_URL', data => {
        const activeRoom = data.activeRoom;
        const enteredURL = data.enteredURL;
        socket.join(activeRoom);
        let newQueue;
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].roomCode === activeRoom){
                rooms[i].songQueue.push(enteredURL);
                console.log('Updated Queue');
                console.log(rooms);
                newQueue = rooms[i].songQueue;
                break;
            }
        }

        io.to(activeRoom).emit('RECEIVE_QUEUE', newQueue);
    })

    //REMOVE FIRST URL IN QUEUE
    socket.on('NEXT_URL', data => {
        console.log('NEXT SONG REQUEST RECEIVED');
        const activeRoom = data.activeRoom;
        socket.join(activeRoom);
        let newQueue;
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].roomCode === activeRoom){
                rooms[i].songQueue.shift();
                newQueue = rooms[i].songQueue;
                console.log('Updated Queue');
                console.log(newQueue);
                break;
            }
        }

        io.to(activeRoom).emit('RECEIVE_NEXT_URL_QUEUE', newQueue);
        console.log('NEXT SONG REQUEST SUCCESS')
    })

    //PAUSE PLAY
    socket.on('PAUSE_PLAY', data => {
        const activeRoom = data.activeRoom;
        socket.join(activeRoom);
        //this might cause a problem, rooms that have not used pause play may not be in sync because they haven't joined room
        let playingState = data.playing;

        io.to(activeRoom).emit('RECEIVE_PAUSE_PLAY', playingState);
    })

    //USE SLIDER
    /*socket.on('USED_SLIDER', data => {
        console.log('USE SLIDER REQUEST RECEIVED');
        const activeRoom = data.activeRoom;
        const e = data.E;
        socket.join(activeRoom);
        //this might cause a problem, rooms that have not used slider may not be in sync because they haven't joined room
        let newPlace = data.played;

        io.to(activeRoom).emit('RECEIVE_PAUSE_PLAY', {newPlace, e});
        console.log(newPlace, e);
    })*/

    //FIRST SONG
    socket.on('FIRST_SONG', data => {
        const activeRoom = data.activeRoom;
        socket.join(activeRoom);
        let first;
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].roomCode === activeRoom){
                first = rooms[i].songQueue[0];
                break;
            }
        }

        io.to(activeRoom).emit('START_FIRST_SONG', first);
    })
});

//CONVERT JSON STRINGS
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'front-end/build')));

/***GET LIST OF ROOMS***/
app.get('/api/getRoomList', async (req,res) => {
    console.log('Request For Room List Recieved');
    res.json(rooms);
    console.log('Sent Rooms');
    console.log(rooms);
});

/***CREATE NEW ROOM***/
app.post('/api/newRoom', async (req,res) => {
    console.log('Room Create Request Recieved');
    const newRoom = {
        roomCode: req.body.roomCode,
        currentSongLink: '',
        songQueue: []
    }
    rooms.push(newRoom);
    var roomList = rooms;
    res.json(roomList);
    console.log('Sent Rooms');
    console.log(rooms);
});

/***GET QUEUE UPON ROOM ENTRY***/
/*app.post('/api/getInitialQueue', async (req,res) => {
    console.log('Get Initial Queue Request Received');
    const activeRoom = req.body.activeRoom;
    console.log(activeRoom);
    let queue;
    for(let i = 0; i < rooms.length; i++){
        if(rooms[i].roomCode === activeRoom){
            if(rooms[i].songQueue.length > 0){
                queue = rooms[i].songQueue;
            } else {
                queue = 'None';
            }
            break;
        }
    }
    res.json(queue);
});*/

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/front-end/build/index.html'));
});
