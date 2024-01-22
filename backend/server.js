const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Usermodel = require("./models/models");
const bcrypt = require("bcrypt");
const Productmodel = require("./models/productmodel")
const Catmodel = require("./models/CatModel");
const Fishmodel = require("./models/FishModel");
const bodyParser = require("body-parser");
const AddressSchema = require("./models/AddressSchema");
const adoptionSchema = require('./models/adoptionSchema');
const vetmodel = require('./models/vetmodel');
const mongodbid = require('./connect');
const groomingmodel = require("./models/groomingmodel");
const Ordermodel = require("./models/ordermodel");
const Wishlistmodel = require("./models/wishlistmodel");


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
mongoose
  .connect(
    mongodbid
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/register", async (req, res) => {
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    console.log(req.body)
    try {
      const userModel = await Usermodel.create({
        petname: req.body.petName,
        petguardian: req.body.petGuardian,
        email: req.body.email,
        password: hash,
      });
      return res.status(200).send({status: 'ok'});
    } catch (err) {
      return res.status(500).send({error: 'duplicate mail'});
    }
  });
});

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

app.post("/api/login", async (req, res) => {
try{
  const userModel = await Usermodel.findOne({
    email: req.body.email,
  });
  let passwordMatching = await comparePassword(
    req.body.password,
    userModel.password
  );

  if (!passwordMatching) {
    console.log("error")
    // return res.json({ status: "error", userModel: false });
    return res.status(500).send({error: 'hello i failed'});
  } else {
    const userData = {
      id: userModel._id,
      petName: userModel.petname ,
      petGuardian: userModel.petguardian,
      email: userModel.email,
      
    }
    console.log("done");
    console.log(userData)
    // return res.json({ status: "ok", userModel: true });
    return res.status(200).send({status: 'ok', user: userData,});
  }
}catch(error){
  return res.status(500).send("internal server error")
}
 
});
app.post("/api/postdogproducts",async(req,res)=>{
  try{
  const Products = await Productmodel.create({
    
    name: req.body.name,
    imageurl: req.body.imageurl,
    price: req.body.price,
    rating:req.body.rating

  });
  return res.status(200).send({status:"ok"});
}catch(error){
  return res.status(500).send("internal server error")
}
})

app.get("/api/dogproducts", async (req, res) => {
  try {
    const productmodels = await Productmodel.find();
    return res.status(200).json(productmodels);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});



app.post("/api/postcatproducts",async(req,res)=>{
  try{
  const CatProducts = await Catmodel.create({
    
    name: req.body.name,
    imageurl: req.body.imageurl,
    price: req.body.price,
    rating:req.body.rating,
    desc:req.body.desc

  });
  return res.status(200).send({status:"ok"});
}catch(error){
  return res.status(500).send("internal server error")
}
})

app.get("/api/catproducts", async (req, res) => {
  try {
    const catmodels = await Catmodel.find();
    return res.status(200).json(catmodels);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});



app.post("/api/postfishproducts",async(req,res)=>{
  try{
  const FishProducts = await Fishmodel.create({
    
    name: req.body.name,
    imageurl: req.body.imageurl,
    price: req.body.price,
    rating:req.body.rating,
    desc:req.body.desc

  });
  return res.status(200).send({status:"ok"});
}catch(error){
  return res.status(500).send("internal server error")
}
})

app.get("/api/fishproducts", async (req, res) => {
  try {
    const fishmodels = await Fishmodel.find();
    return res.status(200).json(fishmodels);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});




app.get("/api/petproducts",async(req,res)=>{
  try{
    const fishmodels = await Fishmodel.find();
    const dogmodels = await Productmodel.find();
    const catmodels = await Catmodel.find();
    const results =[...fishmodels,...dogmodels,...catmodels]

    return res.status(200).json(results)
  }
  catch(err){
    return res.status(500).send("Internal Server Error");

  }
})

app.get('/api/searchproducts', async (req, res) => {
  const { name } = req.query;

  try {
   
    const dogmodels = await Productmodel.find({ name: new RegExp(name, 'i') });
    const catmodels = await Catmodel.find({ name: new RegExp(name, 'i') });
    const fishmodels = await Fishmodel.find({name:new RegExp(name,'i')});

    
    const results = [...dogmodels, ...catmodels, ...fishmodels];
if(results.length === 0){
  res.status(404).json({error:"item not found"})
}else{
  res.json(results);
}
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.post("/api/address", async (req, res) => {
   
//   console.log(req.body)
//   try {
//     const address = await AddressSchema.create({
//       country: req.body.country,
//       name: req.body.name,
//       mobilenumber: req.body.mobilenumber,
//       flat: req.body.flat,
//       area: req.body.area,
//       pincode: req.body.pincode,
//       town: req.body.town,
//       state: req.body.state,
      

//     });
//     return res.status(200).send({status: 'posted successfully'});
// } catch (err) {
//   return res.status(500).send({error: 'error'});
// }
// });
// app.post("/api/adoption", async (req, res) => {

//   console.log(req.body)
//   try {
//     const adoption = await adoptionSchema.create({
//       image: req.body.image,
//       name: req.body.name,
//       breed: req.body.breed,
//       guardianname: req.body.guardianname,
//       location: req.body.location,
//       phonenumber: req.body.phonenumber,
//       sex:req.body.sex,
//       desc:req.body.desc,

//     });
//     return res.status(200).send({status: 'posted successfully'});
// } catch (err) {
//   return res.status(500).send({error: 'error'});
// }
// });
app.get('/api/searchpet', async (req, res) => {
  const { location } = req.query;

  try {
   
    const search = await adoptionSchema.find({ location: new RegExp(location, 'i') });
   
if(search.length === 0){
  res.status(404).json({error:"item not found"})
}else{
  res.json(search);
}
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/postvetproducts', async(req,res)=>{

try{
  const vet = await vetmodel.create({
    name: req.body.name,
    imageurl: req.body.imageurl,
    phone: req.body.phone,
    rating:req.body.rating,
    location:req.body.location,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    desc:req.body.desc,
    treatment:req.body.treatment
  })
return res.status(200).send({status:"ok"})
}catch(err){
  return res.status(500).send({error:"error"})
}

})
app.post('/api/postgroomproducts', async(req,res)=>{

  try{
    const groom = await groomingmodel.create({
      name: req.body.name,
      imageurl: req.body.imageurl,
      phone: req.body.phone,
      rating:req.body.rating,
      location:req.body.location,
      latitude:req.body.latitude,
      longitude:req.body.longitude,
      desc:req.body.desc,
      grooming:req.body.grooming
    })
  return res.status(200).send({status:"ok"})
  }catch(err){
    return res.status(500).send({error:"error"})
  }
  
  })

app.get('/api/adoptpets',async(req,res)=>{
try{
const pets=await adoptionSchema.find()
return res.status(200).json(pets)
}catch(err){
return res.status(500).send('server error')
}

})

app.get('/api/vetdata',async(req,res)=>{
  try{
    const data = await vetmodel.find()
    return res.status(200).json(data)
  }catch(error){
    return res.status(500).send("server error")
  }
})

app.get('/api/groomingdata',async(req,res)=>{
  try{
    const data = await groomingmodel.find()
    return res.status(200).json(data)
  }catch(error){
    return res.status(500).send("server error")
  }
})

app.post('/api/createOrder',async(req,res)=>{
  try{
    const newOrder = await Ordermodel.create({ userId:req.body.userId, products:req.body.products });
    res.status(200).json("your order placed successfully");

  }catch(err){
    return res.status(500).send("server error")
  }
})
app.put('/api/updateorder/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { products } = req.body;

    const updatedOrder = await Ordermodel.findByIdAndUpdate(
      orderId,
      {
        $push: { products: { $each: products } }, // Use $push to add new products to the existing array
       
      },
      { new: true }
    );

    if (!updatedOrder) {
      console.log('Order not found');
      return res.status(404).json({ error: 'Order not found' });
    }

    console.log('Order updated:', updatedOrder);
    res.status(200).json('Order updated');
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
});

//       const updatedOrder = await Ordermodel.findByIdAndUpdate(
//         orderId,
//         { products, totalPrice },
//        {new:true}
//       );
//       if (!updatedOrder) {
//         return res.status(404).json({ error: 'Order not found' });
//       }
  
//       res.status(200).json('Order updated');


//   }catch(err){
//     return res.status(500).send("server error")
//   }
// })

app.get("/api/orderdetails/user/:userId",async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Ordermodel.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.post('/api/wishlist', async (req, res) => {
  const newItem = req.body;

  try {
    await Wishlistmodel.create(newItem);
    res.status(201).send('Item added to wishlist');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})
app.delete('/api/wishlist/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await Wishlistmodel.findByIdAndRemove(itemId);
    res.status(200).send('Item removed from wishlist');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/wishlist', async (req, res) => {
  try {
    const wishlistItems = await Wishlistmodel.find();
    res.json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
