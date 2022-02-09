var jwt = require("jsonwebtoken");
const Stuff = require('../models').Stuff;
const secret = require('../config/jwtConfig');
var bcrypt = require("bcryptjs");


const createManager = async(req,res) => {
   
    const { email, password , user_name , phone_number} = req.body;

    Stuff.findOne({
        where: {
        phone_number: phone_number
        }
    }).then(stuff => {
        if (stuff) {
        return  res.status(400).send({
            message: "Failed! number is already in use!",
            code : "ST-400"
        });
        }

        Stuff.create({
            user_name: user_name,
            email: email,
            phone_number: phone_number,
            hashed_password: bcrypt.hashSync(password, 8)
          })
            .then(stuff => {
              var token = jwt.sign({ id: stuff.id }, secret, {
               expiresIn: '365d'     
               });    
              res.status(201).send({ stuff: stuff , token : token });
            })
            .catch(err => {
              console.log("Manager creation" , err);
              res.status(500).send({ message: err.message });
            });



    });
} 

module.exports = {
    createManager
}