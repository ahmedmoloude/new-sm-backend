const express = require("express");
const routes = require("./src/routes/index");
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const Server = require('socket.io').Server
const { socketOrder } = require('./src/sockets/order.socket')
const app = express()


const httpServer = http.createServer(app);
const io = new Server(httpServer , {  cors: {
    origin : "http://127.0.0.1:3000"
}});
socketOrder(io);

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())
app.options('*', cors());
app.use(express.static("uploads"));

app.use(express.json());


app.use('/api', routes);



const port  = process.env.PORT || 3000
app.get('*', function(req, res){
    res.status(404).send({ Message: 'Not found'})
});

httpServer.listen(port, () => {
     console.log(
         `Listening to port 3000`
     );
});