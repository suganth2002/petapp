const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: { 
        type: String
    },
    products: [
        { 
            type: Object,
        }
    ],
   
    
  });

  const Ordermodel = mongoose.model('Orderdetails', orderSchema)

  module.exports=Ordermodel
  