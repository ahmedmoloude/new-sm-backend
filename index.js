const express = require("express");
const routes = require("./src/routes/index");

const app = express()

app.use(express.json());


app.use('/api', routes);

const port  = process.env.PORT || 3000
app.get('*', function(req, res){
    res.status(404).send({ Message: 'Not found'})
});

app.listen(port, () => {
     console.log(
         `Listening to port 3000`
     );
});