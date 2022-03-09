const Order = require('../../models/index').Order;
const paginate = require("../../utils/pagination");
const FCM = require('fcm-node')
const serverKey = require('../../../privatekey.json') 
const DeliveryBoy = require('../../models/index').DeliveryBoy;
const fcm = new FCM(serverKey)


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


        const message = { 
            to: deliveryBoy.fcm_token,         
            notification: {
                title: 'nouvelle commande', 
                body: 'Une nouvelle commande pour vous cliquez pour voir les détails',
                
            },
            data: {
                restaurant_name : "tvz resto",
                total_price : "4000.0",
                phone_number : "46898921",
                prdoucts : JSON.stringify([
                    {
                        name : 'pizza',
                        qte : "4"  
                    },
                    {
                        name : 'hambergeur',
                        qte : "2"  
                    }
                ])
            }
        }
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log(err);
                return  res.status(400).send({msg : "Something has gone wrong"});

            } else {
                return  res.status(201).send({msg : "notication sent successfully"});
            }
        })
    }) .catch(err => {
      console.log("get DeliveryBoys" , err);
     return  res.status(500).send({ message: err.message });
    });
    
}

module.exports = {
    getOrdersByRestaurant,
    notifDeliveryBoy
}