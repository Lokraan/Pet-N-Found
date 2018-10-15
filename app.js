const { app: { port } } = require("./config/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

const db = require("./src/db.js");

let socketio = require('socket.io');
let io = socketio(server);

const router = require("./src/routes/index");
router(app);

app.set("views", "./src/views");
app.set("view engine", "pug");

// Sockets
let cons = 0;
io.on('connection', socket => {
   cons++;
   console.log(`Client Connected (${cons})`);

   // Send Reports
   db.getLostReports((reports) => {
       socket.emit('Lost Reports', reports ? reports : []);
   });

   socket.on('disconnect', () => {
       cons--;
       console.log(`Client Disconnected (${cons})`);
   });
});
