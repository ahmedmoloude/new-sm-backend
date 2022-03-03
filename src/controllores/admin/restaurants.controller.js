
const Restaurant = require('../../models/index').Restaurant;
const Product = require('../../models/index').Product;
const paginate = require("../../utils/pagination");




const createRestaurant = async (req, res) => {
    const {  region , name , phone_number , localisation} = req.body;
  
    Restaurant.create({
      name: name,
      region: region,
      phone_number: phone_number,
      localisation : localisation
    }).then(restaurants => {
      return res.status(200).send(restaurants);
    }) .catch(err => {
       console.log("get restaurants" , err);
      return res.status(500).send({ message: err.message });
    });
  } 
  
  const getRestaurantwithManagers = async (req,res) => {
    const id = req.query.id
  
    Restaurant.findAll({
      where: {
        id: id
        },
        include: [{
          model: Product , as: "products" ,  attributes: {exclude:'Restaurant_inter_product' }
        }],
        order:  [['createdAt', 'DESC']]
    }).then(response => {
      return res.status(200).send(response);
    }) .catch(err => {
     console.log("get Restaurant with Managers" , err);
     return  res.status(500).send({ message: err.message });
    });
  } 
  
  const getRestaurants = async (req,res) => {
    // Restaurant.findAll({
    //   order:  [['createdAt', 'DESC']]
    // }).then(restaurants => {
    //   return res.status(200).send(restaurants);
    // }) .catch(err => {
    //   console.log("get restaurants" , err);
    //  return  res.status(500).send({ message: err.message });
    // });




    try {

      const { key_word, page, limit, order_by, order_direction } = req.query;

      let search = {};
      let order = [];
      let exclude = [];
      let include = [];

      if (key_word) {
          search = {
              where: {
                  name: {
                      [Op.like]: `%${key_word}%`
                  }
              }
          };
      }

      if (order_by && order_direction) {
          order.push([order_by, order_direction]);
      }
  
      const restaurants = await paginate(Restaurant, include,  page, limit, search, order ,exclude);

      return res.status(200).send(
          restaurants
      )
    } catch (error) {
      console.log('Failed to fetch restaurants', error);
      return res.status(500).send({
          message: 'Failed to fetch restaurants'
      })
    }    
  } 
  
  
  const getOneRestaurant = async (req,res) => {
    const id = req.query.id
  
    Restaurant.findOne({
      where: {
        id: id
        },
        include: [{
          model: Product , as: "products" ,  attributes: {exclude:'Restaurant_inter_product' }
        }],
        order:  [['createdAt', 'DESC']]
    }).then(response => {
      if (response){
        return  res.status(200).send(response);
      }
      return res.status(404).send({ msg : "resturant not found" });
    }) .catch(err => {
     console.log("get Restaurant with Managers" , err);
     return  res.status(500).send({ message: err.message });
    });
  } 
  
  const deleteRestaurant = async (req,res) => {
  
    const { id } = req.body;
    
    Restaurant.destroy({
      where : {
        id : id
      }
    }).then(repsonse => {
      if (repsonse) {
        return  res.status(200).send({msg : "deleted"});
      }
      return  res.status(404).send({msg : "restaurant  not found"});
    }) .catch(err => {
      console.log("delete Restaurant" , err);
     return res.status(500).send({ message: err.message });
    });
} 



module.exports = {
    createRestaurant,
    deleteRestaurant,
    getOneRestaurant,
    getRestaurants,
    getRestaurantwithManagers
}
  
  