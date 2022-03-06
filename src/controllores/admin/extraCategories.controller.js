const Category_extra = require('../../models/index').Category_extra;
const paginate = require("../../utils/pagination");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


const getExtraCategories = async (req,res) => {
   
    
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
  
      const extra_categories = await paginate(Category_extra, include,  page, limit, search, order , exclude);

      return res.status(200).send(
           extra_categories
      )
    } catch (error) {
      console.log('Failed to fetch extra_categories', error);
      return res.status(500).send({
          message: 'Failed to fetch extra_categories'
      })
    } 
    
}
  
  const createExtraCategory = async (req,res) => {
    const { name } = req.body;
  
    Category_extra.findOne({
        where: {
        name: name,
        }
    }).then(category_extra => {
        if (category_extra) {
        return  res.status(400).send({
            message: "Failed! category_extra already exists",
        });
        }
  
        Category_extra.create({
          name: name,
        })
            .then(category_extra => {
  
            return res.status(201).send(category_extra);
            })
            .catch(err => {
              console.log("category_extra creation" , err);
             return  res.status(500).send({ message: err.message });
            });
    }).catch(err => {
      console.log("category_extra creation" , err);
      res.status(500).send({ message: err.message });
    });
  }
  
  
  const getoneExtraCategory = async (req,res) => {
    const id = req.query.id
  
    Category_extra.findOne({
      where : {
        id : id
      }
    }).then(category_extra => {
      if (category_extra) {
        return res.status(200).send(category_extra);
       } else {
         return res.status(404).send({ msg: "No such category_extra "});
       }
    }) .catch(err => {
        console.log("get Onecategory_extra" , err);
        return res.status(500).send({ message: err.message });
    });
  }
  
  
  const deleteExtraCategory = async (req,res) => {
  
    const { id } = req.body;
    
    Category_extra.destroy({
      where : {
        id : id
      }
    }).then(repsonse => {
      if (repsonse) {
        return  res.status(200).send({msg : "deleted"});
      }
      return  res.status(404).send({msg : "Category_extra not found"});
    }) .catch(err => {
      console.log("delete Category_extra" , err);
     return res.status(500).send({ message: err.message });
    });
  } 
  
  
  


  module.exports = {
    getExtraCategories,
    createExtraCategory,
    getoneExtraCategory,
    deleteExtraCategory,
   
}