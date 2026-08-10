const mongoose = require('mongoose')

const resourceSchema = mongoose.Schema({
    title: { type: String, required: true },

    location: { type: String, required: true },

    size: { type: String, required: true, },

    type: { type: String, required: true, },

    visibility: { type: String, required: true, }, 

    price: { type: Number, required: true, },

    priceType: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      required: true
    },

    dprice: { type: Number, required: true, },

    description: { type: String, required: true, },

    UploadedImages: { type: Array,  required: true, },

    review: [ { userMail: String, comment: String, } ],

    rating:{type: Number},

    userMail: { type: String },

    status: { type: String, default: "pending", },

    brought: { type: String, default: "", },

    })
module.exports=mongoose.model('Resource',resourceSchema)