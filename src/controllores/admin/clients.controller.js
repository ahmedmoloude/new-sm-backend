

const Client = require('../../models/index').Client;
const paginate = require("../../utils/pagination");

 



const deleteClient = async (req,res) => {

    const { id } = req.body;
  
    Client.destroy({
      where: {
        id: id
        },
    }).then(response => {
      if (response) {
        return  res.status(200).send({msg : "deleted"});
      }
      return  res.status(404).send({msg : "client not found"});
  
    }) .catch(err => {
      console.log("delet client" , err);
      return res.status(500).send({ message: err.message });
    });
} 
  
  
const  updateClientStatus = async (req,res) => {
  
      const {  client_id   } = req.body;
  
      Client.findOne({
          where: {
          id: client_id
          },
          attributes: ['id', 'user_name' , 'email' , 'phone_number' , 'fcm_token' , 'client_is_active' ]
      }).then(client => {
          if (!client) {
          return  res.status(404).send({
              message: "Client not found"
          });
          }
  
          client.client_is_active = !client.client_is_active
  
          client.save()
  
          return res.status(200).send({
            client
          });
      }).catch(err => {
        console.log("Client updated " , err);
        res.status(500).send({ message: err.message });
      });
  
}
     
  
  
  
const getClients =  async (req,res) => {



  try {

    const { key_word, page, limit, order_by, order_direction } = req.query;

    let search = {};
    let order = [];
    let include = [];
    let exclude = ["hashed_password"];

    if (key_word) {
        search = {
            where: {
              user_name: {
                    [Op.like]: `%${key_word}%`
                }
            }
        };
    }

    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const clients = await paginate(Client, include,  page, limit, search, order , exclude);

    return res.status(200).send({
        data: clients
    })
    } catch (error) {
    console.log('Failed to fetch clients', error);
    return res.status(500).send({
        message: 'Failed to fetch clients'
    })
    } 
}



module.exports = {
    getClients,
    updateClientStatus,
    deleteClient
}