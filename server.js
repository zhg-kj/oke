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

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/front-end/build/index.html'));
});
