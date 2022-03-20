



const Order = require('../../models/index').Order;
const DeliveryBoy = require('../../models/index').DeliveryBoy;
const Client = require('../../models/index').Client;
const Restaurant = require('../../models/index').Restaurant;

const Op = require("sequelize").Op;
const Order_line = require('../../models/index').Order_line;
const Product = require('../../models/index').Product;


const getOrdersByDeliveryboy = async (req,res) => {

    const deliveryBoyid = req.query.deliveryBoyid
    Order.findAll({
        where: {
            potentail_delivery_boys: { [Op.contains]: [deliveryBoyid] }
        },
        include : [
            {
            model: Client , as: "client" 
            },
            {
              model: Restaurant , as: "Restaurant" 
            },
            {
              model: DeliveryBoy,
              as: 'delivery_boy'
            },
            {
              model: Order_line, as: 'order_line',
              include: [{
                model: Product,
                as: 'Product',
              }],
            }
        ],
        order:  [['createdAt', 'DESC']]
      }).then(orders => {
      
        return res.status(200).send(orders);
      }) .catch(err => {
       console.log("get orders" , err);
       return  res.status(500).send({ message: err.message });
      });
}


const acceptOrderDeliveryBoy  = async (req,res) => {


      const { order_id , deliveryBoyid } = req.body
      
      Order.findOne({
        where : {
          id : order_id
        }
      }).then(async order => {
        console.log("order");
        if (order) {
            if (order.delivery_boy_id == null) {

              let newArray = [];
              let newInstance =   await order.update({
                  potentail_delivery_boys: newArray,
                  delivery_boy_id: deliveryBoyid,
                  status : "picked_up"
              });
              return res.status(200).send(newInstance)

            }
            else {
              return res.status(400).send({ message: "order already taken" });
            }
        } 
      }) .catch(err => {
          console.log("order accepted" , err);
          return res.status(500).send({ message: err.message });
      });

}



module.exports = {
    getOrdersByDeliveryboy,
    acceptOrderDeliveryBoy
}