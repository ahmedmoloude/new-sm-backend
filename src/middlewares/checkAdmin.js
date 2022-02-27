
const Staff = require('../models').Staff;
const jwt = require("jsonwebtoken");

const secret = require('../config/jwtConfig');


const checkAdmin = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
       res.status(403).send({
        message: "No token provided!"
      });
      return;
    }


    jwt.verify(token,secret, (err, decoded) => {
        if (err) {
           res.status(401).send({
            message: "Unauthorized!"
          });
          return;
        }
        Staff.findOne({
            where: {
            id:  decoded.id
            }
        }).then(staff => {

          if (!staff) {
            res.status(401).send({
              message: "you are not a staff",
          });
          return;
          }
          if (staff.role != "Admin") {
            res.status(401).send({
              message: "Only admins",
          });
          return;
          }

          next();
        });
      });
      
  };


 module.exports =
  {
      checkAdmin
  }