const { app: { port } } = require("./config/config");
const express = require("express");
const app = express();
const server = app.listen(port);

const db = require("./config/db_conf");

let socketio = require('socket.io');
let io = socketio(server);

const router = require("./src/routes/index");
router(app);

app.set("views", "./src/views");
app.set("view engine", "pug");


console.log("Listening on " + port);

// Sockets
let cons = 0;
io.on('connection', socket => {
   cons++;
   console.log('Connections: ' + cons);

   // Send Reports
   // db.getAllReports((reports) => {
   //    console.log(reports);
   //    socket.emit('Reports', reports)
   // });

   io.on('disconnect', () => {
      cons--;
   });
});
