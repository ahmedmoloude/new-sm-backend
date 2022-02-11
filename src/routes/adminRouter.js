const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const  adminController = require("../controllores/adminController")

router.post(
    '/createManager',
    [checkAdmin.checkAdmin],
    adminController.createManager
);

router.post(
    '/createDeliveryBoy',
    [checkAdmin.checkAdmin],
    adminController.createDeliveryBoy
);


router.get(
    '/deliveryBoys',
    [checkAdmin.checkAdmin],
    adminController.getDeliveryBoys
);



router.get(
    '/managers',
    [checkAdmin.checkAdmin],
    adminController.getManagers
);



module.exports = router;
