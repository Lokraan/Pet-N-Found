const { app: { port } } = require("./config/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

//use sessions for tracking logins
app.use(session({
   secret: 'work hard',
   resave: true,
   saveUninitialized: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

const db = require("./src/db.js");

let socketio = require('socket.io');
let io = socketio(server);

const router = require("./src/controllers/index");
router(app);

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use("/public", express.static("public"));

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
