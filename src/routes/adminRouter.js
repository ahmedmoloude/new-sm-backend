const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const  adminController = require("../controllores/adminActions/adminController")



// ************* manager crud ************* 

// []
router.get(
    '/admin/managers',
    [checkAdmin.checkAdmin],
    adminController.getManagers
);

router.get(
    '/admin/manager',
    [checkAdmin.checkAdmin],
    adminController.getOneManager
);


router.post(
    '/admin/manager',
    [checkAdmin.checkAdmin],
    adminController.createManager
);

router.post(
    '/admin/deleteManager',
    [checkAdmin.checkAdmin],
    adminController.deleteManager
);


// ************* DeliveryBoy crud ************* 


router.post(
    '/admin/deliveryBoy',
    [checkAdmin.checkAdmin],
    adminController.createDeliveryBoy
);


router.get(
    '/admin/deliveryBoys',
    [checkAdmin.checkAdmin],
    adminController.getDeliveryBoys
);

router.get(
    '/admin/deliveryBoy',
    [checkAdmin.checkAdmin],
    adminController.getOneDeliveryBoy
);

router.post(
    '/admin/deleteDeliveryBoy',
    [checkAdmin.checkAdmin],
    adminController.deleteDeliveryBoy
);




// ************* Restaurant crud ************* 


router.get(
    '/admin/restaurantWithManagers',
    [checkAdmin.checkAdmin],
    adminController.getRestaurantwithManagers
)

router.post(
    '/admin/restaurant',
    [checkAdmin.checkAdmin],
    adminController.createRestaurant
);


router.post(
    '/admin/deleteRestaurant',
    [checkAdmin.checkAdmin],
    adminController.deleteRestaurant
);

router.get(
    '/admin/restaurants',
    [checkAdmin.checkAdmin],
    adminController.getRestaurants
);

router.get(
    '/admin/restaurant',
    [checkAdmin.checkAdmin],
    adminController.getOneRestaurant
);






module.exports = router;
