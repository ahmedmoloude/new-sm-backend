const Joi = require('joi') 
const Authschemas = { 
    
    registerClient: Joi.object().keys({
        user_name: Joi.string().required(),
        phone_number: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }),

    registerClientThirdParty: Joi.object().keys({
      user_name: Joi.string().required(),
      phone_number: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      external_auth_id  : Joi.string().required(),
    }),

    loginClient: Joi.object().keys({ 
        phone_number: Joi.string().required(),
        password: Joi.string().required() 
    }),

    loginStaff : Joi.object().keys({
        phone_number: Joi.string().required(),
        password: Joi.string().required(),
    }),

    loginDeliveryBoy : Joi.object().keys({
        phone_number: Joi.string().required(),
        password: Joi.string().required(),
        fcm_token: Joi.string().required()
    })
        

}; 
module.exports = Authschemas;