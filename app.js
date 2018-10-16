const { app: { port } } = require("./config/config");
const express = require("express");
const app = express();
const server = app.listen(port);

const db = require("./src/db.js");

let socketio = require('socket.io');
let io = socketio(server);

const router = require("./src/routes/index");
router(app);

app.set("views", "./src/views");
app.set("view engine", "pug");


console.log('Listening on port ' + port);

// Sockets
let cons = 0;
io.on('connection', socket => {
   cons++;
   console.log('Client Connected (' + cons + ')');

   // Send Reports
   db.getLostReports((reports) => {
      socket.emit('Lost Reports', reports ? reports : []);
   });

   socket.on('disconnect', () => {
      cons--;
      console.log('Client Disconnected (' + cons + ')');
   });
});