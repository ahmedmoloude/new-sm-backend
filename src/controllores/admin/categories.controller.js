const Category = require('../../models/index').Category;
const paginate = require("../../utils/pagination");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


const getCategories = async (req,res) => {
   
    
    try {

      const { key_word, page, limit, order_by, order_direction } = req.query;

      let search = {};
      let order = [];
      let include = [];
      let exclude = [];


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
  
      const categories = await paginate(Category, include,  page, limit, search, order , exclude);

      return res.status(200).send(
          categories
      )
    } catch (error) {
      console.log('Failed to fetch categories', error);
      return res.status(500).send({
          message: 'Failed to fetch categories'
      })
    } 
    
  }
  
  const createCategory = async (req,res) => {
    const { name } = req.body;
  
    Category.findOne({
        where: {
        name: name,
        }
    }).then(category => {
        if (category) {
        return  res.status(400).send({
            message: "Failed! category already exists",
        });
        }
  
        Category.create({
          name: name,
        })
            .then(category => {
  
            return res.status(201).send(category);
            })
            .catch(err => {
              console.log("category creation" , err);
             return  res.status(500).send({ message: err.message });
            });
    }).catch(err => {
      console.log("category creation" , err);
      res.status(500).send({ message: err.message });
    });
  }
  
  
  const getoneCategory = async (req,res) => {
    const id = req.query.id
  
    Category.findOne({
      where : {
        id : id
      }
    }).then(category => {
      if (category) {
        return res.status(200).send(category);
       } else {
         return res.status(404).send({ msg: "No such category "});
       }
    }) .catch(err => {
        console.log("get OneCategory" , err);
        return res.status(500).send({ message: err.message });
    });
  }
  
  
  const deleteCategory = async (req,res) => {
  
    const { id } = req.body;
    
    Category.destroy({
      where : {
        id : id
      }
    }).then(repsonse => {
      if (repsonse) {
        return  res.status(200).send({msg : "deleted"});
      }
      return  res.status(404).send({msg : "Category not found"});
    }) .catch(err => {
      console.log("delete Category" , err);
     return res.status(500).send({ message: err.message });
    });
  } 
  
  
  


  module.exports = {

    getCategories,
    createCategory,
    getoneCategory,
    deleteCategory,
   
}