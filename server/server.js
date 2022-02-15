const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
var server = require('http').createServer(app);
const bodyparser = require('body-parser')
// mongo db connection

const mongoose = require('mongoose')

const monk = require('monk')
const morgan = require('morgan')
var jwt = require('jsonwebtoken')
const dburl = "mongodb+srv://mohammed:GnVfs5D88z5zyA18@cluster0.hwv3s.mongodb.net/chat_app"

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }); // Mongoose for login
var db = monk(dburl); // Monk For API View



// Socket connection
const io = require("socket.io")(server, {
    cors: {
        origin: ["http://localhost:4200" ],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});



var chat = io.of('/chat').on('connection', function(socket) {
     console.log("they came in")
    socket.on('new-message', function(msg) {
        console.log('message: ' + msg);
        chat.emit('new-message', msg);
    });
    socket.once('end', () => {

        chat.destroy();
    });
    socket.on("error", function() {
        chat.destroy();
    });
});


// middleware 
app.use(function(req, res, next) { 
    req.db = db;

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      res.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
      res.setHeader('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
      // Pass to next layer of middleware
    next(); })

 app.use(bodyparser())   



// routes
require('./routes/auth')(app,jwt)

// port listner
server.listen(port, () =>{
    console.log("successfully running on port " + port)
})
