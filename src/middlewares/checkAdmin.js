
const Stuff = require('../models').Stuff;
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
        Stuff.findOne({
            where: {
            id:  decoded.id
            }
        }).then(stuff => {

          if (!stuff) {
            res.status(404).send({
              message: "not found",
          });
          return;
          }
          console.log(stuff);
            if (stuff.role != "Admin") {
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