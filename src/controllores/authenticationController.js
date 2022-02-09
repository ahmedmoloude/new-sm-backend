

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Client = require('../models').Client;
const Stuff = require('../models').Stuff;


const secret = require('../config/jwtConfig');


const registerClient = async (req , res) => {
     console.log(req.body);
    const { email, password , user_name , phone_number} = req.body;
     Client.create({
        user_name: user_name,
        email: email,
        phone_number: phone_number,
        hashed_password: bcrypt.hashSync(password, 8)
      })
        .then(client => {
          var token = jwt.sign({ id: client.id }, secret, {
             expiresIn: '365d'
          });    
          res.status(201).send({ client: client , token : token });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}


const registerClientThirdParty = async (req , res) => {
  console.log(req.body);

 const { email, password , user_name , phone_number , external_auth_id} = req.body;

    Client.findOne({
      where: {
        external_auth_id: external_auth_id
      }
    })
    .then(user => {

      if (user) {
        return res.status(400).send({message: "User all ready exist" ,code : "RTP-400"});
      }

      Client.create({
        user_name: user_name,
        email: email,
        phone_number: phone_number,
        external_auth_id : external_auth_id,
        hashed_password: bcrypt.hashSync(password, 8)
      })
        .then(client => {
          var token = jwt.sign({ id: client.id }, secret, {
           expiresIn: '365d'     
           });    
          res.status(201).send({ client: client , token : token });
        })
        .catch(err => {
          console.log("uers creation" , err);

          res.status(500).send({ message: err.message });
        });

      

    })
    .catch(err => {
      console.log("uers frind" , err);

      res.status(500).send({ message: err.message });
    });

}


const loginClient = async (req, res) => {
  const { password , user_name } = req.body;
    Client.findOne({
      where: {
        user_name: user_name
      }
    })
    .then(user => {

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        user.hashed_password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, secret, {
        expiresIn: '365d'      });

      res.status(200).send({
        id: user.id,
        username: user.user_name,
        email: user.email,
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const loginStuff = async (req, res) => {
      const { password , phone_number } = req.body;
      console.log(password);
      Stuff.findOne({
        where: {
          phone_number: phone_number
        }
      })
      .then(user => {
        
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }



        var passwordIsValid = bcrypt.compareSync(
          password,
          user.hashed_password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        var token = jwt.sign({id: user.id},secret, {
          expiresIn: '365d'});

        res.status(200).send({
          id: user.id,
          username: user.user_name,
          email: user.email,
          role: user.role,
          accessToken: token
        });

      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};





module.exports = {
  registerClient,
  loginClient,
  registerClientThirdParty,
  loginStuff
};