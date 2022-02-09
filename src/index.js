const express = require("express");
const routes = require("./routes");

const app = express()

app.use(express.json());


app.use('/api', routes);


app.get('*', function(req, res){
    res.status(404).send({ Message: 'Not found'})
});

app.listen(3000, () => {
     console.log(
         `Listening to port 3000`
     );
});