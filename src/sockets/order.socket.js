

const Order = require('../models/index').Order;
const DeliveryBoy = require('../models/index').DeliveryBoy;
const Client = require('../models/index').Client;
const Order_line = require('../models/index').Order_line;
const Product = require('../models/index').Product;
const FCM = require('fcm-node')
const serverKey = require('../../privatekey.json') 
const fcm = new FCM(serverKey)
const socketOrder =  (io) => {

    const nameSpaceOrders = io.of('/order-socket');

    nameSpaceOrders.on('connection', socket => {
       
        console.log('---------USER-CONECTED-------------');


        socket.on('position', (data) => {
            console.log("here------------");
            console.log(data);

            nameSpaceOrders.emit(`position`, { latitude: data.latitude, longitude: data.longitude });
            
        });




        socket.on('change_order_status', (data) => {
            Order.findOne({
                where : {
                  id : data.order_id
                },
                include : [
                    {
                    model: Client , as: "client" 
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
                ]
            }).then(async  order => {

                   // TODO : validation 
                   if (data.status === "processing") {
                    order.estimated_time = data.estimated_time
                   }
                   if (data.status === "ready_to_be_picked") {
                       console.log("enter here");
                       console.log(data.deliveryBoy_id ,"data.deliveryBoy_id");
                        
                    
                    //    console.log(order.potentail_delivery_boys ,"-------------potentail_delivery_boys-------------");
                    



                        let newArray = Object.assign([], order.potentail_delivery_boys);

                    //    order.potentail_delivery_boys.push(data.deliveryBoy_id);


                        newArray.push(data.deliveryBoy_id)
                        let newInstance =   await order.update({
                            potentail_delivery_boys: newArray,
                            status: data.status
                        });


                        console.log(newInstance ,"-------------new_order-------------");



                       //TODO error validation and add queue 
                       const response = await notifDeliveryBoy(data.deliveryBoy_id, data.order_id)
                       return nameSpaceOrders.emit(`order_status_changed`, newInstance);
                    }
                    order.status = data.status
                    order.save()
                    return nameSpaceOrders.emit(`order_status_changed`, order);
                 
                //    return nameSpaceOrders.emit(`order_status_changed`, order);
            }).catch(err => {
                console.log("get One order" , err);
                return  {error: err};
            });
        });


        // manager will start here
        socket.on('manager_join_order', (data) => {
            socket.join(`order/${data.order_id}`);
            
            Order.findOne({
                where : {
                  id : data.order_id
                },
                include : [
                    {
                    model: Client , as: "client" 
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
                ]     
            }).then(order => {
                // To do : order informations , client , deliveryBoy
                  return nameSpaceOrders.emit(`order_joined_by_manager`, order);
            }).catch(err => {
                console.log("get One order" , err);
                return  {error: err};
            });
        });


        // clinet join order
        socket.on('client_join', (data) => {
            socket.join(`order/${data.order_id}`);
            
            Order.findOne({
                where : {
                  id : data.order_id
                },
                include : [
                    {
                    model: Client , as: "client" 
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
                ]      // emit(OrderAccepted());

            }).then(order => {
                // To do : order informations , client , deliveryBoy
                  return nameSpaceOrders.emit(`order_joined_by_client`, order);
            }).catch(err => {
                console.log("get One order" , err);
                return  {error: err};
            });
        });


        socket.on('delivery_boy_accept', (data) => {
            socket.join(`order/${data.order_id}`);

            Order.findOne({
                where : {
                  id : data.order_id
                },
                include : [
                    {
                    model: Client , as: "client" 
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
                ]
            }).then(async order => {

                //   order.status = "picked_up"
                //   order.delivery_boy_id = data.deliveryBoy_id
                //   await order.save()
    
                return nameSpaceOrders.emit(`order_status_changed`, order);

                 
            }).catch(err => {
                console.log("get One order" , err);
                return  {error: err};
            });
        });

        socket.on('disconnect', (data) => {
            console.log('USER DISCONNECT');
        });

    });

} 







const notifDeliveryBoy = async (deliveryBoy_id,order_id) => {

    console.log(deliveryBoy_id , 'delivery Boy id');
    console.log(order_id , 'order id');


    DeliveryBoy.findOne({
      where: {
        id: deliveryBoy_id
        },
    }).then(deliveryBoy => {
       if (!deliveryBoy) {
        return  false;
       }


       console.log("wait until it's done ----------------");
        //TODO : get command information 
        const message = { 
            to: deliveryBoy.fcm_token,         
            notification: {
                title: 'nouvelle commande', 
                body: 'Une nouvelle commande pour vous cliquez pour voir les détails',
                
            },
            data: 
            {
              body :  JSON.stringify({
                order_id : `${order_id}`,
                total_price : "4000.0",
                adresse : "tvz 247BP",
                restaurant_name : "tvz resto",
                phone_number : "46898921",
                prdoucts : [
                    {
                        name : 'pizza',
                        qte : "4"  
                    },
                    {
                        name : 'hambergeur',
                        qte : "2"  
                    }
                ]
            })}
        }
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log(err);
                return false;

            } else {
                return  true;
            }
        })
    }) .catch(err => {
             console.log("get DeliveryBoys" , err);
            return  false;
    });
    
}
module.exports = {
    socketOrder
}