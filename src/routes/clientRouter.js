const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const   adminController = require("../controllores/adminActions/adminController")



router.get('/products' ,
   adminController.getProducts
)


router.get('/categories' ,
   adminController.getCategories
)


router.get('/products_by_category' ,
   adminController.getProductsByCategory
)

module.exports = router