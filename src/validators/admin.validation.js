const Joi = require('joi')
const Adminschemas ={
    createManager : Joi.object().keys({
        restaurant_id: Joi.INTEGER().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        user_name: Joi.string().required(),
        fcm_token: Joi.string().required(),
        phone_number: Joi.INTEGER().required(),  
    }),
    createDeliveryBoy : Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        user_name: Joi.string().required(),
        fcm_token: Joi.string().required(),
        phone_number: Joi.INTEGER().required(),
    }),
    createRestaurant : Joi.object().keys({
        name: Joi.string().required(),
        phone_number: Joi.INTEGER().required(),
        region: Joi.string().required(),
        localisation: Joi.GEOMETRY('POINT').required(),
    }),
    createProduct : Joi.object().keys({
        category_id: Joi.INTEGER().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.DOUBLE().required(),
    }),
    linkProductWithrestaurant : Joi.object().keys({
        restaurant_id: Joi.INTEGER().required(),
        product_id: Joi.INTEGER().required(),
    }),
    createCategory : Joi.object().keys({
        name: Joi.string().required(),
    }),
    createExtraProduct : Joi.object().keys({
        category_id: Joi.INTEGER().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.DOUBLE().required(),
    }),
    linkProductWithExtraproduct: Joi.object().keys({
        extra_product_id: Joi.INTEGER().required(),
        product_id: Joi.INTEGER().required(),
    }),
    createExtraCategory: Joi.object().keys({
        name: Joi.string().required(),
    }),
    //notifDeliveryBoy: Joi.object().keys({
        //deliveryBoy_id: Joi.INTEGER().required(),
        //order_id: Joi.INTEGER().required(),

   // })

}

module.exports = Adminschemas