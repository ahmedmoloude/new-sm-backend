const Joi = require('joi')
const DeliveryBoyschemas =({
    acceptOrderDeliveryBoy: Joi.object().keys({
        order_id: Joi.INTEGER().required(),
        //deliveryBoyid: Joi.deliveryBoyid().required(),
    })
})