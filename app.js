const config = require("config");
const bodyParser = require("body-parser");
const session = require("express-session");

const express = require("express");
const app = express();

//use sessions for tracking logins
app.use(session({
   secret: 'work hard',
   resave: true,
   saveUninitialized: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use("/public", express.static("public"));

const router = require("./src/controllers/index");
router(app);

const port = config.get("app.port")
const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

let socketio = require('socket.io');
let io = socketio(server);

const LostReports = require("./src/models/lostReport");
// Sockets
let cons = 0;
io.on('connection', socket => {
   cons++;
   console.log(`Client Connected (${cons})`);

   // Send Reports
   LostReports.findAll()
      .then(reports => {
         const data = reports.map(report => report.dataValues);
         module.exports.reports = data;

         socket.emit('Lost Reports', data ? data : []);
      });

   socket.on('disconnect', () => {
      cons--;
      console.log(`Client Disconnected (${cons})`);
   });
});
