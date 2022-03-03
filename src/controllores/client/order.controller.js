

const Order = require('../../models/index').Order;
const Order_line = require('../../models/index').Order_line;
const Order_line_extra = require('../../models/index').Order_line_extra;




// TODO: "[imrove func , add amount calculation in the backend ]" //


const createOrder = async (req, res) => {

    const { data  , client_id = 1, restaurant_id = 1  , paiement_methode = "Cash_on_delivery" , order_amount = 200 , delivery_fee =10 } = req.body;


    Order.create({
        client_id: client_id,
        restaurant_id: restaurant_id,
        paiement_methode : paiement_methode,
        order_amount: order_amount,
        delivery_fee: delivery_fee,
        amount_total : order_amount + delivery_fee
      }).then(order => {

        // let amount_total = 0
        // let product_price = 200
        // let extra_product_price = 200

        data.forEach(
         async function(element, idx, array){

            try {
                // amount_total += product_price * element.qte
                let  order_line =    await  Order_line.create({qte: element.qte , order_id: order.id,product_id : element.product_id})
                element.extra_products.forEach(e => {
                  // amount_total += extra_product_price * e.qte
                  e['order_id'] = order.id
                  e['order_line_id'] = order_line.id
                })


                console.log(element.extra_products);

                let order_line_extra = await  Order_line_extra.bulkCreate(element.extra_products)

                if (idx === array.length - 1){ 


                //   order.hashed_password = bcrypt.hashSync(new_password, 8)

                // dliveryBoy.save()
                   return res.status(200).send({ message: "created"});
                }
            } catch (error) {
              console.log("get Order_line" , error);
              return res.status(500).send({ message: error.message });
            }
        });
      }).catch(err => {
         console.log("get order" , err);
        return res.status(500).send({ message: err.message });
      });

}


module.exports = {
    createOrder
}