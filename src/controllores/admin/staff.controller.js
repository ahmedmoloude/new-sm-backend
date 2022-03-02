
const jwt = require("jsonwebtoken");
const Staff = require('../../models/index').Staff;
const secret = require('../../config/jwtConfig');
const bcrypt = require("bcryptjs");
const Restaurant = require('../../models/index').Restaurant;
const paginate = require("../../utils/pagination");




const createManager = async(req,res) => {
   
    const { email, password , user_name , fcm_token , phone_number , restaurant_id} = req.body;

    Staff.findOne({
        where: {
        phone_number: phone_number
        }
    }).then(staff => {
        if (staff) {
        return  res.status(400).send({
            message: "Failed! number is already in use!",
            code : "ST-400"
        });
        }

        Restaurant.findOne({
          where : {
            id : restaurant_id
          }
        }).then(restaurant => {
          if (!restaurant) {
            return res.status(404).send({ msg : 'restaurant not found'});
           } 

    
            Staff.create({
                user_name: user_name,
                email: email,
                phone_number: phone_number,
                fcm_token : fcm_token, 
                hashed_password: bcrypt.hashSync(password, 8),
                restaurant_id : restaurant_id
              })
                .then(staff => {
                  const token = jwt.sign({ id: staff.id }, secret, {
                  expiresIn: '365d'     
                  });    
                 return res.status(201).send({  user_name: staff.user_name,
                  email: staff.email,
                  phone_number: staff.phone_number,
                  fcm_token : staff.fcm_token, 
                  restaurant_id : staff.restaurant_id ,
                  token : token });
                })
                .catch(err => {
                  console.log("Manager creation" , err);
                return  res.status(500).send({ message: err.message });
                });
        }) .catch(err => {
          console.log("get OneRestaurant" , err);
          return res.status(500).send({ message: err.message });
        });
    }).catch(err => {
      console.log("Manager creation" , err);
      res.status(500).send({ message: err.message });
    });
} 

const getManagers = async (req,res) => {

  try {

    const { key_word, page, limit, order_by, order_direction } = req.query;

    let search = {};
    let order = [];
    let exclude = [];
    let include = [{
      model: Restaurant , as: "restaurant",}];

      search = {
            where: {
                role: "Manager"
            }
       };
  

    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const staff = await paginate(Staff, include,  page, limit, search, order ,exclude);

    return res.status(200).send({
        staff
    })
  } catch (error) {
    console.log('Failed to fetch staff', error);
    return res.status(500).send({
        message: 'Failed to fetch staff'
    })
  }  
} 

const getOneManager = async (req,res) => {

  const id = req.query.id

  Staff.findOne({
    where: {
      id: id
      },
      include: [{
        model: Restaurant , as: "restaurant",
      }],
  }).then(manager => {
    if (manager) {
     return res.status(200).send(manager);
    } else {
      return res.status(404).send({ msg: "No such manager "});
    }
  }) .catch(err => {
    console.log("get one Manager" , err);
   return res.status(500).send({ message: err.message });
  });
} 

const deleteManager = async (req,res) => {

  const { id } = req.body;

  Staff.destroy({
    where: {
      id: id
      },
  }).then(response => {
    if (response) {
      return  res.status(200).send({msg : "deleted"});
    }
    return  res.status(404).send({msg : "staff not found"});

  }) .catch(err => {
    console.log("delet Manager" , err);
    return res.status(500).send({ message: err.message });
  });
} 



const userBytoken = async (req,res) => {
    let token = req.headers["x-access-token"];
    
    if (!token) {
      return  res.status(403).send({
        message: "No token provided!"
      });
    }
  
  
  
    jwt.verify(token,secret, (err, decoded) => {
      if (err) {
         return res.status(401).send({
          message: "Unauthorized!"
        });
        
      }
      Staff.findOne({
          where: {
          id:  decoded.id
          }
      }).then(staff => {
  
        if (!staff) {
         return res.status(401).send({
            message: "user not found!",
        });
        }
  
        return res.status(200).send({
          id: staff.id,
          username: staff.user_name,
          email: staff.email,
          role: staff.role,
        });
      }).catch(err => {
        console.log("get user by token" , err);
      return  res.status(500).send({ message: err.message });
      });
    });
  
  
  }


module.exports = {
    createManager,
    deleteManager,
    getManagers,
    getOneManager,
    userBytoken
}