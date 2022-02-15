const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const  adminController = require("../controllores/adminActions/adminController")



// ************* check token ************* 
router.get(
    '/user_by_token',
    adminController.userBytoken
);


// ************* manager crud ************* 

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

router.delete(
    '/admin/manager',
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


router.delete(
    '/admin/deliveryBoy',
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
    '/admin/restaurant_manager',
    [checkAdmin.checkAdmin],
    adminController.linkRestaurantWithManager
);


router.delete(
    '/admin/restaurant',
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


// ************* Product ************* 


router.get(
    '/admin/products',
    [checkAdmin.checkAdmin],
    adminController.getProducts
);
router.get(
    '/admin/product',
    [checkAdmin.checkAdmin],
    adminController.getOneProduct
);

router.post(
    '/admin/product',
    [checkAdmin.checkAdmin],
    adminController.createProduct
);

router.delete(
    '/admin/product',
    [checkAdmin.checkAdmin],
    adminController.deleteProduct
);

// ************* Category ************* 

router.get(
    '/admin/categories',
    [checkAdmin.checkAdmin],
    adminController.getCategories
);

router.get(
    '/admin/categorie',
    [checkAdmin.checkAdmin],
    adminController.getoneCategory
);


router.post(
    '/admin/categorie',
    [checkAdmin.checkAdmin],
    adminController.createCategory
);

router.delete(
    '/admin/categorie',
    [checkAdmin.checkAdmin],
    adminController.deleteCategory
);


module.exports = router;
