const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const  adminController = require("../controllores/adminActions/adminController")



// ************* manager crud ************* 
router.get(
    '/managers',
    [checkAdmin.checkAdmin],
    adminController.getManagers
);

router.get(
    '/manager',
    [checkAdmin.checkAdmin],
    adminController.getOneManager
);


router.post(
    '/createManager',
    [checkAdmin.checkAdmin],
    adminController.createManager
);

router.post(
    '/deleteManager',
    [checkAdmin.checkAdmin],
    adminController.deleteManager
);


// ************* DeliveryBoy crud ************* 


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
    '/deliveryBoy',
    [checkAdmin.checkAdmin],
    adminController.getOneDeliveryBoy
);

router.post(
    '/deleteDeliveryBoy',
    [checkAdmin.checkAdmin],
    adminController.deleteDeliveryBoy
);




// ************* Restaurant crud ************* 


router.get(
    '/restaurantManagers',
    [checkAdmin.checkAdmin],
    adminController.getRestaurantwithManagers
);

router.post(
    '/createRestaurants',
    [checkAdmin.checkAdmin],
    adminController.createRestaurant
);


router.post(
    '/deleteRestaurant',
    [checkAdmin.checkAdmin],
    adminController.deleteRestaurant
);

router.get(
    '/restaurants',
    [checkAdmin.checkAdmin],
    adminController.getRestaurants
);

router.get(
    '/restaurant',
    [checkAdmin.checkAdmin],
    adminController.getOneRestaurant
);






module.exports = router;
