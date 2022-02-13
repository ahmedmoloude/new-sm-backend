const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const  updatePasswordController = require("../controllores/upatePassword/updatePasswordController")



router.patch(   
    '/stuff',
    updatePasswordController.updatePasswordStuff
);

router.patch(   
    '/client',
    updatePasswordController.updatePasswordClient
);

router.patch(   
    '/deliveryBoy',
    updatePasswordController.updatePasswordDeliveryBoy
);


module.exports = router