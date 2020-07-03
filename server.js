/***BACKEND***/
const express = require('express');
const path = require('path');

const app = express();

let rooms = [];

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

/***ADD TO QUEUE***/
app.post('/api/addToQueue', async (req,res) => {
    console.log('Add To Queue Request Recieved');
    const activeRoom = req.body.activeRoom;
    const enteredURL = req.body.enteredURL;
    let newQueue;
    for(let i = 0; i < rooms.length; i++){
        if(rooms[i].roomCode === activeRoom){
            rooms[i].songQueue.push(enteredURL);
            console.log('Updated Queue');
            newQueue = rooms[i].songQueue;
            break;
        }
    }
    res.json(newQueue);
    console.log('Sent New Queue');
    console.log(rooms);
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/front-end/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);