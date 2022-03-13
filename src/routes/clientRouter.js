const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const   adminController = require("../controllores/admin")
const   orderController = require("../controllores/client/order.controller")




router.get('/products' ,
   adminController.productController.getProductsClient
)

router.post('/order' ,
   orderController.createOrder
)

router.get('/categories' ,
   adminController.categoriesController.getCategoriesClient
)


router.get('/products_by_category' ,
   adminController.productController.getProductsByCategory
)

module.exports = router