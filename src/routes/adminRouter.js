const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const  { adminControllers } = require("../controllores/index")
const  staffController = require("../controllores/staff/order")

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null,  req.body.name + new Date().toISOString() + file.originalname  );
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });


// ************* check token ************* 
router.get(
    '/user_by_token',
    adminControllers.staffController.userBytoken
);


// ************* manager crud ************* 

router.get(
    '/admin/managers',
    [checkAdmin.checkAdmin],
    adminControllers.staffController.getManagers
);

router.get(
    '/admin/manager',
    [checkAdmin.checkAdmin],
    adminControllers.staffController.getOneManager
);

router.post(
    '/admin/manager',
    [checkAdmin.checkAdmin],
    adminControllers.staffController.createManager
);

router.delete(
    '/admin/manager',
    [checkAdmin.checkAdmin],
    adminControllers.staffController.deleteManager
);


// ************* DeliveryBoy crud ************* 

router.post(
    '/admin/deliveryBoy',
    [checkAdmin.checkAdmin],
    adminControllers.deliveryBoyController.createDeliveryBoy
);

router.get(
    '/admin/deliveryBoys',
    // [checkAdmin.checkAdmin],
    adminControllers.deliveryBoyController.getDeliveryBoys
);


router.get(
    '/admin/deliveryBoy',
    [checkAdmin.checkAdmin],
    adminControllers.deliveryBoyController.getOneDeliveryBoy
);


router.delete(
    '/admin/deliveryBoy',
    [checkAdmin.checkAdmin],
    adminControllers.deliveryBoyController.deleteDeliveryBoy
);


// ************* Restaurant crud ************* 



// router.get(
//     '/admin/restaurantWithManagers',
//     [checkAdmin.checkAdmin],
//     adminControllers.getRestaurantwithManagers
// )


router.post(
    '/admin/restaurant',
    [checkAdmin.checkAdmin],
    adminControllers.restaurantController.createRestaurant
);

router.delete(
    '/admin/restaurant',
    [checkAdmin.checkAdmin],
    adminControllers.restaurantController.deleteRestaurant
);


router.get(
    '/admin/restaurants',
    [checkAdmin.checkAdmin],
    adminControllers.restaurantController.getRestaurants
);


router.get(
    '/admin/restaurant',
    [checkAdmin.checkAdmin],
    adminControllers.restaurantController.getOneRestaurant
);


// ************* Product ************* 


router.get(
    '/admin/products',
    [checkAdmin.checkAdmin],
    adminControllers.productController.getProducts
);


router.get(
    '/admin/products_bu_category',
    [checkAdmin.checkAdmin],
    adminControllers.productController.getProductsByCategory
);
router.get(
    '/admin/product',
    [checkAdmin.checkAdmin],
    adminControllers.productController.getOneProduct
);

router.post(
    '/admin/product',
    [checkAdmin.checkAdmin , upload.single('productImage')],
    adminControllers.productController.createProduct
);

router.post(
    '/admin/product_restaurant',
    [checkAdmin.checkAdmin],
    adminControllers.productController.linkProductWithrestaurant
);

router.delete(
    '/admin/product',
    [checkAdmin.checkAdmin],
    adminControllers.productController.deleteProduct
);

// ************* Category ************* 

router.get(
    '/admin/categories',
    [checkAdmin.checkAdmin],
    adminControllers.categoriesController.getCategories
);

router.get(
    '/admin/categorie',
    [checkAdmin.checkAdmin],
    adminControllers.categoriesController.getoneCategory
);


router.post(
    '/admin/categorie',
    [checkAdmin.checkAdmin],
    adminControllers.categoriesController.createCategory
);

router.delete(
    '/admin/categorie',
    [checkAdmin.checkAdmin],
    adminControllers.categoriesController.deleteCategory
);


router.get(
    '/admin/clients',
    [checkAdmin.checkAdmin],
    adminControllers.clientController.getClients
);

router.delete(
    '/admin/client',
    [checkAdmin.checkAdmin],
    adminControllers.clientController.deleteClient
);


router.patch(
    '/admin/update_client_status',
    [checkAdmin.checkAdmin],
    adminControllers.clientController.updateClientStatus
);



// extra product
router.get(
    '/admin/extra_products',
    [checkAdmin.checkAdmin],
    adminControllers.extraProductController.getExtraProducts
);


router.get(
    '/admin/extra_product',
    [checkAdmin.checkAdmin],
    adminControllers.extraProductController.getOneExtraProduct
);

router.post(
    '/admin/extra_product',
    [checkAdmin.checkAdmin , upload.single('productImage')],
    adminControllers.extraProductController.createExtraProduct
);

router.post(
    '/admin/extraproduct_product',
    [checkAdmin.checkAdmin],
    adminControllers.extraProductController.linkProductWithExtraproduct
);

router.delete(
    '/admin/product',
    [checkAdmin.checkAdmin],
    adminControllers.productController.deleteProduct
);


// extra categories



router.get(
    '/admin/extra_categories',
    [checkAdmin.checkAdmin],
    adminControllers.extraCategoryController.getExtraCategories
);

router.get(
    '/admin/extra_categorie',
    [checkAdmin.checkAdmin],
    adminControllers.extraCategoryController.getoneExtraCategory
);


router.post(
    '/admin/extra_categorie',
    [checkAdmin.checkAdmin],
    adminControllers.extraCategoryController.createExtraCategory
);

router.delete(
    '/admin/extra_categorie',
    [checkAdmin.checkAdmin],
    adminControllers.extraCategoryController.deleteExtraCategory
);




router.get(
    '/orders',
    staffController.getOrdersByRestaurant
);


router.post(
    '/notif_delivery_boy',
    staffController.notifDeliveryBoy
);




module.exports = router;
