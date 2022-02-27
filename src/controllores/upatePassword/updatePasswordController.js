
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Client = require('../../models/index').Client;
const Staff = require('../../models/index').Staff;
const DeliveryBoy = require('../../models/index').DeliveryBoy;
const secret = require('../../config/jwtConfig');


const updatePasswordStaff = async (req,res) => {
    const token = req.headers["x-access-token"];

    const { old_password, new_password} = req.body;

    console.log(token);
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
              message: "you are not a staff",
               });
           }

           const passwordIsValid = bcrypt.compareSync(
            old_password,
            staff.hashed_password
          );

          console.log(passwordIsValid);
  
          if (!passwordIsValid) {
            return res.status(401).send({
              message: "Invalid Password!"
            });
          }

          staff.hashed_password = bcrypt.hashSync(new_password, 8)

          staff.save()

          return res.status(201).send({
            message : "password updated "
          });
        });
      });
}




const updatePasswordClient = async (req,res) => {
    const token = req.headers["x-access-token"];

    const { old_password, new_password} = req.body;

    console.log(token);
    jwt.verify(token,secret, (err, decoded) => {
        if (err) {
            return  res.status(401).send({
            message: "Unauthorized!"
          });
         
        }

        Client.findOne({
            where: {
            id:  decoded.id
            }
        }).then(client => {

          if (!client) {
            return res.status(401).send({
              message: "you are not a client",
               });
           }

           const passwordIsValid = bcrypt.compareSync(
            old_password,
            client.hashed_password
          );

         
          if (!passwordIsValid) {
            return res.status(401).send({
              message: "Invalid Password!"
            });
          }

          client.hashed_password = bcrypt.hashSync(new_password, 8)

          client.save()

          return res.status(201).send({
            message : "password updated "
          }); 
        });
      });
}

const updatePasswordDeliveryBoy = async (req,res) => {
    const token = req.headers["x-access-token"];

    const { old_password, new_password} = req.body;

    jwt.verify(token,secret, (err, decoded) => {

        if (err) {
         return res.status(401).send({
            message: "Unauthorized!"
          });
         
        }

        DeliveryBoy.findOne({
            where: {
            id:  decoded.id
            }
        }).then(dliveryBoy => {

          if (!dliveryBoy) {
            return res.status(401).send({
              message: "you are not a dliveryBoy",
               });
           }

           const passwordIsValid = bcrypt.compareSync(
            old_password,
            dliveryBoy.hashed_password
          );

         
          if (!passwordIsValid) {
            return res.status(401).send({
              message: "Invalid Password!"
            });
          }

          dliveryBoy.hashed_password = bcrypt.hashSync(new_password, 8)

          dliveryBoy.save()

          return res.status(201).send({
            message : "password updated "
          }); 

        });
      });
}



module.exports = {
    updatePasswordStaff,
    updatePasswordClient,
    updatePasswordDeliveryBoy
}