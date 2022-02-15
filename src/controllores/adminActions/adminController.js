const jwt = require("jsonwebtoken");
const Stuff = require('../../models/index').Stuff;
const secret = require('../../config/jwtConfig');
const bcrypt = require("bcryptjs");
const DeliveryBoy = require('../../models/index').DeliveryBoy;
const Restaurant = require('../../models/index').Restaurant;
const Product = require('../../models/index').Product;
const Category = require('../../models/index').Category;
const Restaurant_inter_product = require('../../models/index').Restaurant_inter_product;






const userBytoken = async (req,res) => {
  let token = req.headers["x-access-token"];
  
  if (!token) {
    return  res.status(403).send({
      message: "No token provided!"
    });
  }



  jwt.verify(token,secret, (err, decoded) => {
    if (err) {
       return res.status(401).send({
        message: "Unauthorized!"
      });
      
    }
    Stuff.findOne({
        where: {
        id:  decoded.id
        }
    }).then(stuff => {

      if (!stuff) {
       return res.status(401).send({
          message: "user not found!",
      });
      }

      return res.status(200).send({
        id: stuff.id,
        username: stuff.user_name,
        email: stuff.email,
        role: stuff.role,
      });
    }).catch(err => {
      console.log("get user by token" , err);
    return  res.status(500).send({ message: err.message });
    });
  });


}
// ************* manager crud ************* 
const createManager = async(req,res) => {
   
    const { email, password , user_name , fcm_token , phone_number} = req.body;

    Stuff.findOne({
        where: {
        phone_number: phone_number
        }
    }).then(stuff => {
        if (stuff) {
        return  res.status(400).send({
            message: "Failed! number is already in use!",
            code : "ST-400"
        });
        }

        Stuff.create({
            user_name: user_name,
            email: email,
            phone_number: phone_number,
            fcm_token : fcm_token, 
            hashed_password: bcrypt.hashSync(password, 8)
          })
            .then(stuff => {
              const token = jwt.sign({ id: stuff.id }, secret, {
               expiresIn: '365d'     
               });    
            return res.status(201).send({ stuff: stuff , token : token });
            })
            .catch(err => {
              console.log("Manager creation" , err);
             return  res.status(500).send({ message: err.message });
            });
    }).catch(err => {
      console.log("Manager creation" , err);
      res.status(500).send({ message: err.message });
    });
} 

const getManagers = async (req,res) => {
  Stuff.findAll({
    where: {
      role: "Manager"
      },
  }).then(managers => {
  return   res.status(200).send(managers);
  }) .catch(err => {
    console.log("get Managers" , err);
   return res.status(500).send({ message: err.message });
  });
} 

const getOneManager = async (req,res) => {

  const id = req.query.id

  Stuff.findOne({
    where: {
      id: id
      },
  }).then(manager => {
    if (manager) {
     return res.status(200).send(manager);
    } else {
      return res.status(404).send({ msg: "No such manager "});
    }
  }) .catch(err => {
    console.log("get one Manager" , err);
   return res.status(500).send({ message: err.message });
  });
} 

const deleteManager = async (req,res) => {

  const { id } = req.body;

  Stuff.destroy({
    where: {
      id: id
      },
  }).then(response => {
    if (response) {
      return  res.status(200).send({msg : "deleted"});
    }
    return  res.status(404).send({msg : "stuff not found"});

  }) .catch(err => {
    console.log("delet Manager" , err);
    return res.status(500).send({ message: err.message });
  });
} 




// ************* DeliveryBoy crud ************* 


const createDeliveryBoy = async (req,res) => {
    console.log(req.body);
   
        const { email, password , user_name , phone_number , adresse , fcm_token}  = req.body;

        DeliveryBoy.findOne({
            where: {
            phone_number: phone_number
            }
        }).then(deliveryBoy => {
            if (deliveryBoy) {
            return  res.status(400).send({
                message: "Failed! number is already in use!",
                code : "DB-400"
            });
            }

            DeliveryBoy.create({
                user_name: user_name,
                email: email,
                phone_number: phone_number,
                hashed_password: bcrypt.hashSync(password, 8),
                adresse : adresse,
                fcm_token : fcm_token
              })
                .then(deliveryBoy => {
                  const token = jwt.sign({ id: deliveryBoy.id }, secret, {
                  expiresIn: '365d'     
                  });    
                 return  res.status(201).send({ deliveryBoy: deliveryBoy , token : token });
                })
                .catch(err => {
                  console.log("DeliveryBoy creation" , err);
                 return  res.status(500).send({ message: err.message });
                });
        });
} 



const getDeliveryBoys = async (req,res) => {

    const count = req.query.count
      DeliveryBoy.findAll({
        limit: count ?? 10
      }).then(deliveryBoys => {
       return res.status(200).send(deliveryBoys);
      }) .catch(err => {
        console.log("get DeliveryBoys" , err);
    return    res.status(500).send({ message: err.message });
      });
} 

const getOneDeliveryBoy = async (req,res) => {

    const id = req.query.id
    DeliveryBoy.findOne({
      where: {
        id: id
        },
    }).then(deliveryBoy => {

      if (deliveryBoy){
        return  res.status(200).send(deliveryBoy);
      }
      return res.status(404).send({ msg : "deliverBoy not found" });
    }) .catch(err => {
      console.log("get DeliveryBoys" , err);
      return res.status(500).send({ message: err.message });
    });
} 



const deleteDeliveryBoy = async (req,res) => {

  const { id } = req.body;

  DeliveryBoy.destroy({
    where: {
      id: id
      },
  }).then(repsonse => {
    if (repsonse) {
      return  res.status(200).send({msg : "deleted"});
    }
    return  res.status(404).send({msg : "delivery boy not found"});
  }) .catch(err => {
    console.log("get DeliveryBoys" , err);
   return  res.status(500).send({ message: err.message });
  });
} 





// ************* Restaurant crud ************* 

const linkRestaurantWithManager = async (req,res) => {
  const {  restaurant_id , manager_id } = req.body;

  Stuff.findOne({
    where: {
    id:  manager_id
    }
  }).then(staff => {


    if (!staff) {
      return res.status(404).send({
        message: "staff not found",
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

       staff.restaurant_id = restaurant_id

       staff.save()

       return res.status(201).send({
         staff
       });
       //TODO: complete function
    }) .catch(err => {
      console.log("get OneRestaurant" , err);
      return res.status(500).send({ message: err.message });
    });


  }).catch(err => {
    console.log(err.msg);
    return res.status(500).send({ message: err.message });

  })

}



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
        model: Stuff , as: "staff",
      }],
  }).then(response => {
    return res.status(200).send(response);
  }) .catch(err => {
   console.log("get Restaurant with Managers" , err);
   return  res.status(500).send({ message: err.message });
  });
} 

const getRestaurants = async (req,res) => {
  Restaurant.findAll({
  }).then(restaurants => {
    return res.status(200).send(restaurants);
  }) .catch(err => {
    console.log("get restaurants" , err);
   return  res.status(500).send({ message: err.message });
  });
} 


const getOneRestaurant = async (req,res) => {
  const id = req.query.id

  Restaurant.findOne({
    where : {
      id : id
    }
  }).then(restaurant => {
    if (restaurant) {
      return res.status(200).send(restaurant);
     } else {
       return res.status(404).send({ msg: "No such restaurant "});
     }
  }) .catch(err => {
    console.log("get OneRestaurant" , err);
    return res.status(500).send({ message: err.message });
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


// ************* Products ************* 

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
  const { category_id , name, description , image , price } = req.body;

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
        image : image,
        description: description,
        price : price
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
  Product.findAll({
    include: [{
      model: Category , as: "Category",
    }],
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


// ************* Categories ************* 


const getCategories = async (req,res) => {
  Category.findAll({

  }).then(categories => {
    return res.status(200).send(categories);
  }) .catch(err => {
   console.log("get categories" , err);
   return  res.status(500).send({ message: err.message });
  });
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
    createManager , 
    createDeliveryBoy,
    getDeliveryBoys,
    getManagers,
    getRestaurantwithManagers,
    getRestaurants,
    getOneRestaurant,
    getOneManager,
    deleteManager,
    getOneDeliveryBoy,
    deleteDeliveryBoy,
    deleteRestaurant,
    createRestaurant,
    userBytoken,
    linkRestaurantWithManager,
    getProducts,
    getCategories,
    createCategory,
    getoneCategory,
    deleteCategory,
    getOneProduct,
    createProduct,
    deleteProduct,
    linkProductWithrestaurant
}