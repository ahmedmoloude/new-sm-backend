const express = require("express");
const { verfiySignUp , validatorMidellware } = require("../middlewares");
const Authschemas = require("../validators/auth.validation");


const router = express.Router();

const  authenticationController = require("../controllores/authentication/authenticationController")

router.post(
    '/registerClient',
    [
      verfiySignUp.checkDuplicateCredentials,
      validatorMidellware(Authschemas.registerClient)
    ],
    authenticationController.registerClient
);

router.post(
    '/registerClientThirdParty',
    [
      verfiySignUp.checkDuplicateCredentials,
      validatorMidellware(Authschemas.registerClientThirdParty)
    ],
     authenticationController.registerClientThirdParty
);

router.post("/loginclient",[validatorMidellware(Authschemas.loginClient)], authenticationController.loginClient);

router.post("/deliveryBoy/login", [validatorMidellware(Authschemas.loginDeliveryBoy)] ,authenticationController.loginDeliveryBoy);


router.post("/bo/login",[validatorMidellware(Authschemas.loginStaff)], authenticationController.loginStaff);

module.exports = router;
