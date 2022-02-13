const jwt = require("jsonwebtoken");
const Stuff = require('../../models/index').Stuff;
const secret = require('../../config/jwtConfig');
const bcrypt = require("bcryptjs");
const DeliveryBoy = require('../../models/index').DeliveryBoy;
const Restaurant = require('../../models/index').Restaurant;



// ************* manager crud ************* 
const createManager = async(req,res) => {
   
    const { email, password , user_name , fcm_token , phone_number} = req.body;

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
            fcm_token : fcm_token, 
            hashed_password: bcrypt.hashSync(password, 8)
          })
            .then(stuff => {
              const token = jwt.sign({ id: stuff.id }, secret, {
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

const getManagers = async (req,res) => {
  Stuff.findAll({
    where: {
      role: "Manager"
      },
  }).then(managers => {
    res.status(200).send(managers);
  }) .catch(err => {
    console.log("get Managers" , err);
    res.status(500).send({ message: err.message });
  });
} 

const getOneManager = async (req,res) => {

  const id = req.query.id

  Stuff.findOne({
    where: {
      id: id
      },
  }).then(manager => {
    res.status(200).send(manager);
  }) .catch(err => {
    console.log("get one Manager" , err);
    res.status(500).send({ message: err.message });
  });
} 

const deleteManager = async (req,res) => {

  const { id } = req.body;

  Stuff.destroy({
    where: {
      id: id
      },
  }).then(response => {
    res.status(204).send("delted ");
  }) .catch(err => {
    console.log("delet Manager" , err);
    res.status(500).send({ message: err.message });
  });
} 




// ************* DeliveryBoy crud ************* 


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
                  const token = jwt.sign({ id: deliveryBoy.id }, secret, {
                  expiresIn: '365d'     
                  });    
                  res.status(201).send({ deliveryBoy: deliveryBoy , token : token });
                })
                .catch(err => {
                  console.log("DeliveryBoy creation" , err);
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
        console.log("get DeliveryBoys" , err);
        res.status(500).send({ message: err.message });
      });
} 

const getOneDeliveryBoy = async (req,res) => {

    const id = req.query.id
    DeliveryBoy.findOne({
      where: {
        id: id
        },
    }).then(deliveryBoy => {
      res.status(200).send(deliveryBoy);
    }) .catch(err => {
      console.log("get DeliveryBoys" , err);
      res.status(500).send({ message: err.message });
    });
} 



const deleteDeliveryBoy = async (req,res) => {

  const { id } = req.body;

  DeliveryBoy.destroy({
    where: {
      id: id
      },
  }).then(repsonse => {
    res.status(204).send("deleted");
  }) .catch(err => {
    console.log("get DeliveryBoys" , err);
    res.status(500).send({ message: err.message });
  });
} 





// ************* Restaurant crud ************* 


const createRestaurant = async (req, res) => {
  const {  region , name , phone_number , localisation} = req.body;

  Restaurant.create({
    name: name,
    region: region,
    phone_number: phone_number,
    localisation : localisation
  }).then(restaurants => {
    res.status(200).send(restaurants);
  }) .catch(err => {
    console.log("get restaurants" , err);
    res.status(500).send({ message: err.message });
  });
} 

const getRestaurantwithManagers = async (req,res) => {
  const id = req.query.id

  Restaurant.findAll({

    where: {
      id: id
      },
      include: [{
        model: Stuff,
      }],
  }).then(response => {
    res.status(200).send(response);
  }) .catch(err => {
    console.log("get Restaurant with Managers" , err);
    res.status(500).send({ message: err.message });
  });
} 

const getRestaurants = async (req,res) => {
  Restaurant.findAll({
  }).then(restaurants => {
    res.status(200).send(restaurants);
  }) .catch(err => {
    console.log("get restaurants" , err);
    res.status(500).send({ message: err.message });
  });
} 


const getOneRestaurant = async (req,res) => {
  const id = req.query.id

  Restaurant.findOne({
    where : {
      id : id
    }
  }).then(restaurant => {
    res.status(200).send(restaurant);
  }) .catch(err => {
    console.log("get OneRestaurant" , err);
    res.status(500).send({ message: err.message });
  });
} 

const deleteRestaurant = async (req,res) => {
  const { id } = req.body;

  Restaurant.destroy({
    where : {
      id : id
    }
  }).then(restaurant => {
    res.status(204).send("delted");
  }) .catch(err => {
    console.log("get OneRestaurant" , err);
    res.status(500).send({ message: err.message });
  });
} 


module.exports = {
    createManager , 
    createDeliveryBoy,
    getDeliveryBoys,
    getManagers,
    getRestaurantwithManagers,
    getRestaurants,
    getOneRestaurant,
    getOneManager,
    deleteManager,
    getOneDeliveryBoy,
    deleteDeliveryBoy,
    deleteRestaurant,
    createRestaurant
}