

const Order = require('../models/index').Order;
const DeliveryBoy = require('../models/index').DeliveryBoy;
const Client = require('../models/index').Client;
const Order_line = require('../models/index').Order_line;
const FCM = require('fcm-node')
const serverKey = require('../../privatekey.json') 
const fcm = new FCM(serverKey)
const socketOrder =  (io) => {

    const nameSpaceOrders = io.of('/order-socket');

    nameSpaceOrders.on('connection', socket => {
        // order.status = data.status
        // order.save()

        // join on connection ?
        console.log('USER CONECTED');

        // socket.on('position', (data) => {
        //     nameSpaceOrders.emit(`position/${data.idOrder}`, { latitude: data.latitude, longitude: data.longitude });
        // });


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
                        model: Order_line, as: 'order_line'
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
                       order.status = data.status

                       //TODO error validation
                       const response = await notifDeliveryBoy(data.deliveryBoy_id, data.order_id)
                       console.log(response);
                       return nameSpaceOrders.emit(`order_status_changed`, order);
                    }
                   order.status = data.status
                   order.save()

                 
                   return nameSpaceOrders.emit(`order_status_changed`, order);
            }).catch(err => {
                console.log("get One order" , err);
                return  {error: err};
            });
        });


        // manager will start here
        socket.on('manager_join_order', (data) => {
            socket.join(`order/${data.order_id}`);
            
            console.log(`order/${data.order_id}`);
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
                        model: Order_line, as: 'order_line'
                    }
                ]      // emit(OrderAccepted());

            }).then(order => {
                // To do : order informations , client , deliveryBoy
                console.log(order , "Order data");
                  return nameSpaceOrders.emit(`order_joined_by_manager`, order);
            }).catch(err => {
                console.log("get One order" , err);
                return  {error: err};
            });
        });


        socket.on('delivery_boy_accept', (data) => {
            socket.join(`order/${data.order_id}`);

            console.log(data);
            Order.findOne({
                where : {
                  id : data.order_id
                },
            }).then(async order => {

                  order.status = "picked_up"
                  order.delivery_boy_id = data.deliveryBoy_id
                  await order.save()


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
                            model: Order_line, as: 'order_line'
                        }
                    ]
                }).then(order => {
                    return nameSpaceOrders.emit(`order_status_changed`, order);
                }).catch(err => {
                    console.log("get One order" , err);
                    return  {error: err};
                });

                 
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