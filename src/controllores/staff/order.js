

const Order = require('../../models/index').Order;
const paginate = require("../../utils/pagination");


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


module.exports = {
    getOrdersByRestaurant
}