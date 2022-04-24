const express = require("express");
const routes = require("./src/routes/index");
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('./src/utils/logger');
const Server = require('socket.io').Server
const { socketOrder } = require('./src/sockets/order.socket')
const app = express()

// setup the http server and socketio config
const httpServer = http.createServer(app);
const io = new Server(httpServer , {  cors: {
    origin : "https://smash-food.netlify.app"
}});
socketOrder(io);

// json parser
app.use(bodyParser.urlencoded({extended: true}));

// cors to be changed later 
app.use(cors())
app.options('*', cors());


//upload
app.use(express.static("uploads"));

app.use(express.json());

//route
app.use('/api', routes);


app.get('*', function(req, res){
    res.status(404).send({ Message: 'Not found'})
});

const port  = process.env.PORT || 3000

httpServer.listen(port, () => {
    logger.info(`Listening to port 3000`);

     console.log(
         `Listening to port 3000`
     );
});