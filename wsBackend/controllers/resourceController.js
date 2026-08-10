const resource =  require('../models/resourceModel')
const stripe = require('stripe')(process.env.paymentKey);

//add Resource
exports.addResource = async(req,res)=>{
    console.log("inside add Resource function")
    console.log(req.body)
    const {title, location, size, type, visibility, price, priceType , dprice, description} = req.body
    console.log(req.files) //images file

    const UploadedImages =[]
    req.files.map(item=>UploadedImages.push(item.filename))
    console.log(UploadedImages)

    const userMail = req.payload
    console.log(userMail)

    try{
        const existingResource = await resource.findOne({title,userMail})
        if(existingResource){
            res.status(402).json("Resource Alerdy Existing")
        }
        else{
            const newResource = await resource({
            title, location, size, visibility, type, description, price, priceType, dprice, UploadedImages, userMail
            })
            await newResource.save()
            res.status(200).json('Resource Added')
        
        }   
    }
    catch(err){
        console.log(err)
    }

    // res.send("Requset Recived...")
}

//get All Resource
exports.getAllResource = async(req,res)=>{
    console.log("inside Get All Resource Function")
    try{
        const allResource = await resource.find()
        res.status(200).json(allResource)
    }
    catch(err){
        res.status(500).json("ERROR"+err)
    }
}

//get latestResource
exports.getLatestResource = async(req,res)=>{
    try{
        const latestResource = await resource.find().sort({_id:-1}).limit(4)
        res.status(200).json(latestResource)
    }
    catch(err){
        res.status(500).json("Err"+err)
    }
}

//get resource..based on email
exports.getResource = async(req,res)=>{
    console.log("inside Get  Resource Function")
    try{
        const email = req.payload
        const Resource = await resource.find({userMail: email})
        res.status(200).json(Resource)
    }
    catch(err){
        res.status(500).json("ERROR"+err)
    }
}

//viewresource
exports.viewResource = async(req,res)=>{    
    try{
        const { id } = req.params
        const data = await resource.findOne({_id:id})
        
        res.status(200).json({message:"Request Recived ",data})
    }
    catch(err){
        res.status(500).json("Err"+err)
    }
   
}

//to buy resource
exports.buyResource = async (req, res) => {
  console.log("inside buy resource")

  const { resourceDetails } = req.body
  const email = req.payload  // buyer email from JWT

  try {
    const updatedResource = await resource.findByIdAndUpdate(
      resourceDetails._id,
      {
        title: resourceDetails.title,
        type: resourceDetails.type,
        location: resourceDetails.location,
        price: resourceDetails.price,
        dprice: resourceDetails.dprice,
        description: resourceDetails.description,
        visibility: resourceDetails.visibility,
        UploadedImages: resourceDetails.UploadedImages,
        status: "sold",
        userMail: resourceDetails.userMail, // owner
        brought: email                       // buyer
      },
      { new: true }
    )

    if (!updatedResource) {
      return res.status(404).json("Resource not found")
    }

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
                name: resourceDetails.title,
                description: `${resourceDetails.type} | ${resourceDetails.location}`,
                metadata: {
                    title: resourceDetails.title,
                    type: resourceDetails.type,
                    location: resourceDetails.location,
                    price: resourceDetails.price,
                    dprice: resourceDetails.dprice,
                    status: "sold",
                    userMail: resourceDetails.userMail,
                    brought: email
                }
            },
          unit_amount: Math.round(Number(resourceDetails.dprice) * 100)
        },
        quantity: 1
      }
    ]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: "http://localhost:5173/paymentSuccess",
      cancel_url: "http://localhost:5173/paymentError",
      line_items,
      mode: "payment"
    })

    res.status(200).json({
      message: "success",
      session,
      sessionID: session.id,
      updatedResource
    })
  } catch (err) {
    console.error(err)
    res.status(500).json("Error: " + err.message)
  }
}

//delete Resource
exports.deleteResource = async(req,res)=>{
    try{
        const { id } = req.params
        const deletedResource = await resource.findByIdAndDelete({_id:id})
        
        res.status(200).json({message:"deleted successfully ",deletedResource})
    }
    catch(err){
        res.status(500).json("Err"+err)
    }
}

//get Buy resource
exports.getBuyResource = async(req,res)=>{
    console.log("Inside getBuyResource");

     try {
        const email = req.payload; 

        const boughtResources = await resource.find({ brought: email, status: "sold", });
        res.status(200).json(boughtResources);
    } 
    catch (err) {
        res.status(500).json("Error fetching bought resources: " + err);
    }
}

//Add Review
exports.addReview = async (req, res) => {
  const { resourceId, comment } = req.body
  const userMail = req.payload  

  if (!resourceId || !comment) {
    return res.status(400).json("Enter data")
  }

  try {
    const updatedResource = await resource.findByIdAndUpdate(
        resourceId, 
        { $push: { review: {  userMail, comment } } },
        { new: true }
    )
    res.status(200).json({message:"update Successfully",updatedResource})
  }
  catch (err) {
    res.status(500).json(err)
  }
}

