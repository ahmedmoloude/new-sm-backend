const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const   adminController = require("../controllores/admin")
const   orderController = require("../controllores/client/order.controller")
const productController = require("../controllores/product/products.controller")




router.get('/products' ,
   productController.getProductsClient
)

router.post('/order' ,
   orderController.createOrder
)

router.get('/categories' ,
   adminController.categoriesController.getCategoriesClient
)


router.get('/products_by_category' ,
   productController.getProductsByCategory
)

module.exports = router