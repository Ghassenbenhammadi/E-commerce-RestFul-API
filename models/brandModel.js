const mongoose = require('mongoose')
 // Create Schema
 const brandSchema = new mongoose.Schema({
    name : {
      type : String,
      required : [true,'Brand required'],
      unique: [true, 'Brand must be unique'],
      minlength:[3,'Too short Brand name'],
      maxlength:[32,'Too long Brand']
    },
    // A and B => shoping.com/a-and-b
    slug:{
      type: String,
      lowercase:true,
    },
    image: String,
   },{timestamps: true});
   // create Model
   module.exports = mongoose.model('Brand', brandSchema);

   