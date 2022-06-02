// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const roomIdGenerator = require('./util/roomIdGenerator');
const mongoose = require('mongoose');
const config = require('config');
const Room = require("./models/Rooms");
const Chat = require("./models/Chats")
const moment = require('moment');

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');
const messageHandler = require('./controllers/messages.js')



const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));


// set up stylesheets route

// TODO: Add server side code
const db = config.get('mongoURI');
mongoose.connect(db,
    err => {
        if(err) throw err;
        console.log("Connected to MongoDB");
    });


app.post("/create", function(req, res){
    const newRoom = new Room ({
        name: req.body.roomName,
        id: roomIdGenerator.roomIdGenerator()
    })
    newRoom.save().then(console.log("Room has been added")).catch(err => console.log("Error when creating room: ", err))
})

app.post("/:roomName/messages", function(req, res){
    
    var url = '/' + req.params.roomName + "/messages";
    var time = moment().format('MMMM Do YYYY, h:mm:ss a')
    const newChat = new Chat ({
        name: req.body.nickname,
        chat_id: req.params.roomName,
        id: 1,
        message: req.body.message,
        created: time,
        vote: "0"
    })
   newChat.save().then(() => {console.log("Chat has been added"); res.redirect(url)}).catch(err => console.log("Error when creating chat: ", err))
})

app.get("/:roomName/getMessage", function(req, res){
    Chat.find({chat_id: req.params.roomName}).lean().then(item => {
        res.json(item);
    })
})

// getRoom - return a json of all rooms in the DB
app.get("/getRoom", function(req, res){
    Room.find().lean().then(item => {
        res.json(item);
    })
 })

 // Create controller handlers to handle requests at each endpoint

app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom);
app.get("/:roomName/messages", messageHandler.getMessages)

// NOTE: This is the sample server.js code we provided, feel free to change the structures

// creating controller handlers to handle request at each endpoints
// Create endpoint - to create a new room in the DB


// NEXT STEP:
// need to create a form that will give user option to create a chat message
// and send it to the data base

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));