
const paginate = require("../../utils/pagination");
const Restaurant = require('../../models/index').Restaurant;
const Product = require('../../models/index').Product;
const Category = require('../../models/index').Category;
const Restaurant_inter_product = require('../../models/index').Restaurant_inter_product;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Extra_product = require('../../models/index').Extra_product;


const linkProductWithrestaurant = async (req,res) => {
    const {  restaurant_id , product_id } = req.body;
  
    Product.findOne({
      where: {
      id:  product_id
      }
    }).then(product => {
  
      if (!product) {
        return res.status(404).send({
          message: "product not found",
           });
      }
      
      Restaurant.findOne({
        where : {
          id : restaurant_id
        }
      }).then(restaurant => {
        if (!restaurant) {
          return res.status(404).send({ msg : 'restaurant not found'});
         }
  
         Restaurant_inter_product.create({
          product_id: product_id,
          restaurant_id : restaurant_id
        })
          .then(response => {
            return res.status(201).send(response);
            })
            .catch(err => {
              console.log("resto_inter_product creation" , err);
             return  res.status(500).send({ message: err.message });
            });
  
      }) .catch(err => {
        console.log("get OneRestaurant" , err);
        return res.status(500).send({ message: err.message });
      });
  
    }).catch(err => {
      console.log(err.msg);
      return res.status(500).send({ message: err.message });
    })
  }
  
  const createProduct = async (req,res) => {
    const { category_id , name, description , price } = req.body;
    console.log(req.body , "bodyy");
    Category.findOne({
        where: {
        id: category_id,
        }
    }).then(category => {
        if (!category) {
        return  res.status(404).send({
            message: "no such category",
        });
        }
        Product.create({
          name: name,
          image : req.file.filename,
          description: description,
          price : price,
          category_id : category_id
        })
          .then(product => {
            return res.status(201).send(product);
            })
            .catch(err => {
              console.log("product creation" , err);
             return  res.status(500).send({ message: err.message });
            });
    }).catch(err => {
      console.log("product creation" , err);
      res.status(500).send({ message: err.message });
    });
  }
  
  const getProducts = async (req,res) => {


    try {

      const { key_word, page, limit, order_by, order_direction } = req.query;

      let search = {};
      let order = [];
      let exclude = [];
      let include = [{
        model: Category , as: "Category" } , {
          model: Extra_product,
          as: 'extra_products'
      }];

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
  
      const products = await paginate(Product, include,  page, limit, search, order ,exclude);

      return res.status(200).send(
          products
      )
    } catch (error) {
      console.log('Failed to fetch products', error);
      return res.status(500).send({
          message: 'Failed to fetch products'
      })
    }    
  }
  
  
  const getProductsByCategory = async (req,res) => {
  
    const category_id = req.query.category_id 
  
    Product.findAll({
      where: { category_id : category_id}, 
      include :[{
        model: Category , as: "Category" } , {
          model: Extra_product,
          as: 'extra_products'
      }],
      order:  [['createdAt', 'DESC']]
    }).then(products => {
      return res.status(200).send(products);
    }) .catch(err => {
     console.log("get products" , err);
     return  res.status(500).send({ message: err.message });
    });
  }
  
  const getOneProduct = async (req,res) => {
    const id = req.query.id
    Product.findOne({
      where : {
        id : id
      },
      include: [{
        model: Category , as: "Category",
      }],
    }).then(product => {
      if (product) {
         return res.status(200).send(product);
       } else {
         return res.status(404).send({ msg: "No such product "});
       }
    }) .catch(err => {
      console.log("get Oneproduct" , err);
      return res.status(500).send({ message: err.message });
    });
  } 
  
  
  const deleteProduct = async (req,res) => {
  
    const { id } = req.body;
    
    Product.destroy({
      where : {
        id : id
      }
    }).then(repsonse => {
      if (repsonse) {
        return  res.status(200).send({msg : "deleted"});
      }
      return  res.status(404).send({msg : "Product not found"});
    }) .catch(err => {
      console.log("delete Product" , err);
     return res.status(500).send({ message: err.message });
    });
  } 
  


  const getProductsClient = async (req, res) => {
    let lat = req.query.lat 
    let lng = req.query.lng 

    

    const location = Sequelize.literal(`ST_GeomFromText('POINT(${ lng } ${  lat })')`)
    const distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.col('localisation'), location)

    Restaurant.findAll({
          order: distance,
          where: Sequelize.where(distance, { $lte: 10 }),
      // attributes: attributes,
        // include: [{
        //   model: Product , as: "products" ,  attributes: {exclude:'Restaurant_inter_product' }
        // }],
    //   order: 'distance',
    }).then(response => {
      return res.status(200).send(response);
    }) .catch(err => {
     console.log("get Restaurant with Managers" , err);
     return  res.status(500).send({ message: err.message });
    });

    // Location.findAll({
    //   attributes: attributes,
    //   order: 'distance',
    //   where: sequelize.where(distance, 10000),
    //   logging: console.log
    // })
    // .then(function(instance){
    //   return res.json(200, instance);
    // })
    // Product.findAll({
    //   include :[{
    //     model: Category , as: "Category" } , {
    //       model: Extra_product,
    //       as: 'extra_products'
    //   }],
    //   order:  [['createdAt', 'DESC']]
    // }).then(products => {
    //   return res.status(200).send(products);
    // }).catch(err => {
    //  console.log("get products" , err);
    //  return  res.status(500).send({ message: err.message });
    // });
  }

  module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    deleteProduct,
    linkProductWithrestaurant,
    getProductsByCategory,
    getProductsClient
}