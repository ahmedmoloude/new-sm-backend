const express = require("express");
const router = express.Router();
const   orderController = require("../controllores/order/order")




router.get('/delivery_boy_orders' ,
   orderController.getOrdersByDeliveryboy
)

router.post('/delivery_boy_accept' ,
   orderController.acceptOrderDeliveryBoy
)


module.exports = router