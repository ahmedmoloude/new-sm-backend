

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Client = require('../../models/index').Client;
const Stuff = require('../../models/index').Stuff;
const DeliveryBoy = require('../../models/index').DeliveryBoy;


const secret = require('../../config/jwtConfig');


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
          const token = jwt.sign({ id: client.id }, secret, {
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
          const token = jwt.sign({ id: client.id }, secret, {
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
  const { password , phone_number } = req.body;
    Client.findOne({
      where: {
        phone_number: phone_number
      }
    })
    .then(user => {

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        password,
        user.hashed_password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, secret, {
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



        const passwordIsValid = bcrypt.compareSync(
          password,
          user.hashed_password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        const token = jwt.sign({id: user.id},secret, {
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


const loginDeliveryBoy = async (req, res) => {
     console.log(req.body);
        const { password , phone_number } = req.body;
          
      DeliveryBoy.findOne({
        where: {
          phone_number: phone_number
        }
      })
      .then(deliveryBoy => {
        
        if (!deliveryBoy) {
          return res.status(404).send({ message: "deliveryBoy Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
          password,
          deliveryBoy.hashed_password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        const token = jwt.sign({id: user.id},secret, {
          expiresIn: '365d'});

        return res.status(200).send({
          id: deliveryBoy.id,
          username: deliveryBoy.user_name,
          email: deliveryBoy.email,
          role: deliveryBoy.role,
          accessToken: token
        });

      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
}







module.exports = {
  registerClient,
  loginClient,
  registerClientThirdParty,
  loginStuff,
  loginDeliveryBoy
};