


const express = require("express");
const { verfiySignUp } = require("../middlewares");
const router = express.Router();

const  authenticationController = require("../controllores/authentication/authenticationController")

router.post(
    '/registerClient',
    [
      verfiySignUp.checkDuplicateCredentials,
      
    ],
      authenticationController.registerClient
);

router.post(
    '/registerClientThirdParty',
    [
      verfiySignUp.checkDuplicateCredentials,
    ],
     authenticationController.registerClientThirdParty
);

router.post("/loginclient", authenticationController.loginClient);

router.post("/deliveryBoy/login", authenticationController.loginDeliveryBoy);


router.post("/bo/login", authenticationController.loginStaff);

module.exports = router;
