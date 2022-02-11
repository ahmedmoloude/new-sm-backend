const jwt = require("jsonwebtoken");
const Stuff = require('../models').Stuff;
const secret = require('../config/jwtConfig');
const bcrypt = require("bcryptjs");
const DeliveryBoy = require('../models').DeliveryBoy;



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



    }).catch(err => {
      console.log("Manager creation" , err);
      res.status(500).send({ message: err.message });
    });
} 



const createDeliveryBoy = async (req,res) => {
    console.log(req.body);
   
        const { email, password , user_name , phone_number , adresse} = req.body;

        DeliveryBoy.findOne({
            where: {
            phone_number: phone_number
            }
        }).then(deliveryBoy => {
            if (deliveryBoy) {
            return  res.status(400).send({
                message: "Failed! number is already in use!",
                code : "DB-400"
            });
            }

            DeliveryBoy.create({
                user_name: user_name,
                email: email,
                phone_number: phone_number,
                hashed_password: bcrypt.hashSync(password, 8),
                adresse : adresse
              })
                .then(deliveryBoy => {
                  var token = jwt.sign({ id: deliveryBoy.id }, secret, {
                  expiresIn: '365d'     
                  });    
                  res.status(201).send({ deliveryBoy: deliveryBoy , token : token });
                })
                .catch(err => {
                  console.log("Manager creation" , err);
                  res.status(500).send({ message: err.message });
                });
        });
} 



const getDeliveryBoys = async (req,res) => {

    const count = req.query.count
 
      DeliveryBoy.findAll({
        limit: count ?? 10
      }).then(deliveryBoys => {
        res.status(200).send(deliveryBoys);
      }) .catch(err => {
        console.log("Manager creation" , err);
        res.status(500).send({ message: err.message });
      });
} 



const getManagers = async (req,res) => {
  const count = req.query.count

  Stuff.findAll({
    where: {
      role: "Manager"
      },
      limit: count ?? 10

  }).then(managers => {
    res.status(200).send(managers);
  }) .catch(err => {
    console.log("Manager creation" , err);
    res.status(500).send({ message: err.message });
  });
} 
module.exports = {
    createManager , 
    createDeliveryBoy,
    getDeliveryBoys,
    getManagers
}