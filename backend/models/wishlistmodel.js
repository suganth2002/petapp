const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: { 
        type: String
    },
    wishlist: [
        { 
            type: Object,
        }
    ],
   
    
  });

  const Wishlistmodel = mongoose.model('Wishlist', wishlistSchema)

  module.exports=Wishlistmodel
  