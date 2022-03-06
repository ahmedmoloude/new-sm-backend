

const Order = require('../models/index').Order;
 const socketOrder = (io) => {

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
                }
            }).then(order => {
                   if (data.status === "processing") {
                    order.estimated_time = data.estimated_time
                   }
                   order.status = data.status
                   order.save()
                   return nameSpaceOrders.emit(`order/${data.order_id}`, order);
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
                }
            }).then(order => {
                  return nameSpaceOrders.emit(`order`, order);
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


module.exports = {
    socketOrder
}