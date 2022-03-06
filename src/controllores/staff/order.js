

const Order = require('../../models/index').Order;
const paginate = require("../../utils/pagination");
const FCM = require('fcm-node')
const serverKey = require('../../../privatekey.json') 


const getOrdersByRestaurant = async (req,res) => {


     try {

      const { restaurant_id, page, limit, order_by, order_direction } = req.query;
  
        let search = {};
        let order = [];
        let exclude = [];
        let include = [];
  
        if (restaurant_id) {
            search = {
                where: { restaurant_id : restaurant_id}
            };
        }
  
        if (order_by && order_direction) {
            order.push([order_by, order_direction]);
        }
    
        const orders = await paginate(Order, include,  page, limit, search, order ,exclude);
  
        return res.status(200).send(
            orders
        )
      } catch (error) {
        console.log('Failed to fetch orders', error);
        return res.status(500).send({
            message: 'Failed to fetch orders'
        })
      } 
}


const notifDeliveryBoy = async (req,res) => {

    const { id } = req.body;

    DeliveryBoy.findOne({
      where: {
        id: id
        },
    }).then(deliveryBoy => {
      if (!deliveryBoy) {
        return  res.status(404).send({msg : "delivery boy not found"});
      }

         const fcm = new FCM(serverKey)

        const message = { 
            to: deliveryBoy.fcm_token,         
            notification: {
                title: 'new Order', 
                body: 'a new order for you' 
            },
        }
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!")
            } else {
                console.log("Successfully sent with response: ", response)
            }
        })
    }) .catch(err => {
      console.log("get DeliveryBoys" , err);
     return  res.status(500).send({ message: err.message });
    });
    
    
    
}


module.exports = {
    getOrdersByRestaurant
}