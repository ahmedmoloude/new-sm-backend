const Staff = require('../../models/index').Staff;
const paginate = require("../../utils/pagination");
const Product = require('../../models/index').Product;
const Extra_product = require('../../models/index').Extra_product;
const Category_extra = require('../../models/index').Category_extra;
const Product_inter_productExtra = require('../../models/index').Product_inter_productExtra;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;







const linkProductWithExtraproduct = async (req,res) => {
  const {  extra_product_id , product_id } = req.body;

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
    
    Extra_product.findOne({
      where : {
        id : extra_product_id
      }
    }).then(extraProduct => {
      if (!extraProduct) {
        return res.status(404).send({ msg : 'extraProduct not found'});
      }

      Product_inter_productExtra.create({
        product_id: product_id,
        product_extra_id : extra_product_id
      })
        .then(response => {
          return res.status(201).send(response);
          })
          .catch(err => {
            console.log("extraproduct_inter_product creation" , err);
           return  res.status(500).send({ message: err.message });
          });

    }) .catch(err => {
      console.log("get one product failed" , err);
      return res.status(500).send({ message: err.message });
    });
  }).catch(err => {
    console.log(err.msg);
    return res.status(500).send({ message: err.message });
  })
}


  const createExtraProduct = async (req,res) => {
    const { category_id , name, description , price } = req.body;
    console.log(req.body , "bodyy");
    Category_extra.findOne({
        where: {
        id: category_id,
        }
    }).then(category => {
        if (!category) {
        return  res.status(404).send({
            message: "no such extra category",
        });
        }
        Extra_product.create({
          name: name,
          image : req.file.filename,
          description: description,
          price : price,
          category_extra_id : category_id
        })
          .then(extraProduct => {
            return res.status(201).send(extraProduct);
            })
            .catch(err => {
              console.log("extraProduct creation" , err);
             return  res.status(500).send({ message: err.message });
            });
    }).catch(err => {
      console.log("extraProduct creation" , err);
      res.status(500).send({ message: err.message });
    });
  }
  
  const getExtraProducts = async (req,res) => {


    try {

      const { key_word, page, limit, order_by, order_direction } = req.query;

      let search = {};
      let order = [];
      let exclude = [];
      let include = [{
        model: Category_extra , as: "category_extra"}] ;

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
  
      const extra_products = await paginate(Extra_product, include,  page, limit, search, order ,exclude);

      return res.status(200).send(
          extra_products
      )
    } catch (error) {
      console.log('Failed to fetch extra_products', error);
      return res.status(500).send({
          message: 'Failed to fetch extra_products'
      })
    }    
  }
  
  
  const getOneExtraProduct = async (req,res) => {
    const id = req.query.id
    Extra_product.findOne({
      where : {
        id : id
      },
      include: [{
        model: Category_extra , as: "category_extra"
      }],
    }).then(extraProduct => {
      if (extraProduct) {
         return res.status(200).send(extraProduct);
       } else {
         return res.status(404).send({ msg: "No such extraProduct "});
       }
    }) .catch(err => {
      console.log("get OneextraProduct" , err);
      return res.status(500).send({ message: err.message });
    });
  } 
  
  
  const deleteExtraProduct = async (req,res) => {
  
    const { id } = req.body;
    
    Extra_product.destroy({
      where : {
        id : id
      }
    }).then(repsonse => {
      if (repsonse) {
        return  res.status(200).send({msg : "deleted"});
      }
      return  res.status(404).send({msg : "extraProduct not found"});
    }) .catch(err => {
      console.log("delete extraProduct" , err);
     return res.status(500).send({ message: err.message });
    });
  } 
  


  module.exports = {
   createExtraProduct,
   deleteExtraProduct,
   getExtraProducts,
   getOneExtraProduct,
   linkProductWithExtraproduct
}