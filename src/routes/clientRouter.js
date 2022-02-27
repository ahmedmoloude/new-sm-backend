const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const   adminController = require("../controllores/admin")



router.get('/products' ,
   adminController.productController.getProducts
)


router.get('/categories' ,
   adminController.categoriesController.getCategories
)


router.get('/products_by_category' ,
   adminController.productController.getProductsByCategory
)

module.exports = router