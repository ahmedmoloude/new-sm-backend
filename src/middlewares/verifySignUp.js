
const Client = require('../models').Client;



// TODO: Find better way to mange this check
const checkDuplicateCredentials = (req, res, next) => {
    const { email , user_name , phone_number } = req.body;

 

        // phone_number    
        Client.findOne({
            where: {
            phone_number: phone_number
            }
        }).then(client => {
            if (client) {
            res.status(400).send({
                message: "Failed! number is already in use!",
                code : "R-400"
            });
            return;
            }
    
            next();
        });
      
  };


 module.exports =
  {
      checkDuplicateCredentials
  }