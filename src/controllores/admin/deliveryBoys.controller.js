
const jwt = require("jsonwebtoken");
const secret = require('../../config/jwtConfig');
const bcrypt = require("bcryptjs");
const DeliveryBoy = require('../../models/index').DeliveryBoy;
const paginate = require("../../utils/pagination");




const createDeliveryBoy = async (req,res) => {
    console.log(req.body);
   
        const { email, password , user_name , phone_number , adresse , fcm_token}  = req.body;

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
                adresse : adresse,
                fcm_token : fcm_token
              })
                .then(deliveryBoy => {
                  const token = jwt.sign({ id: deliveryBoy.id }, secret, {
                  expiresIn: '365d'     
                  });    
                 return  res.status(201).send({ deliveryBoy: deliveryBoy , token : token });
                })
                .catch(err => {
                  console.log("DeliveryBoy creation" , err);
                 return  res.status(500).send({ message: err.message });
                });
        });
} 



const getDeliveryBoys = async (req,res) => {


  try {

    const { key_word, page, limit, order_by, order_direction } = req.query;

    let search = {};
    let order = [];
    let include = [];
    // let exclude = ["hashed_password"];

    if (key_word) {
        search = {
            where: {
              user_name: {
                    [Op.like]: `%${key_word}%`
                }
            }
        };
    }

    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const deliveryBoys = await paginate(DeliveryBoy, include,  page, limit, search, order );

    return res.status(200).send(
         deliveryBoys
    )
    } catch (error) {
    console.log('Failed to fetch deliveryBoys', error);
    return res.status(500).send({
        message: 'Failed to fetch deliveryBoys'
    })
    }

} 

const getOneDeliveryBoy = async (req,res) => {

    const id = req.query.id
    DeliveryBoy.findOne({
      where: {
        id: id
        },
    }).then(deliveryBoy => {

      if (deliveryBoy){
        return  res.status(200).send(deliveryBoy);
      }
      return res.status(404).send({ msg : "deliverBoy not found" });
    }) .catch(err => {
      console.log("get DeliveryBoys" , err);
      return res.status(500).send({ message: err.message });
    });
} 



const deleteDeliveryBoy = async (req,res) => {

  const { id } = req.body;

  DeliveryBoy.destroy({
    where: {
      id: id
      },
  }).then(repsonse => {
    if (repsonse) {
      return  res.status(200).send({msg : "deleted"});
    }
    return  res.status(404).send({msg : "delivery boy not found"});
  }) .catch(err => {
    console.log("get DeliveryBoys" , err);
   return  res.status(500).send({ message: err.message });
  });
} 




module.exports = {
    createDeliveryBoy,
    deleteDeliveryBoy,
    getDeliveryBoys,
    getOneDeliveryBoy
}