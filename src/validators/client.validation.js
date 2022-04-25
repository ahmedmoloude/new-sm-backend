const Joi = require('joi')
const Clientschemas ={
    createOrder: Joi.object().keys({
        order_id: Joi.INTEGER().required(),
        //deliveryBoyid: Joi.deliveryBoyid().required(),    
    })
}