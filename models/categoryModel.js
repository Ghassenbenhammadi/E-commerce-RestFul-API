const mongoose = require('mongoose')
 // Create Schema
 const categorySchema = new mongoose.Schema({
    name : {
      type : String,
      required : [true,'Category required'],
      unique: [true, 'Category must be unique'],
      minlength:[3,'Too short category name'],
      maxlength:[32,'Too long category']
    },
    // A and B => shoping.com/a-and-b
    slug:{
      type: String,
      lowercase:true,
    },
    image: String,
   },{timestamps: true});
   // create Model
   const CategoryModel = mongoose.model('Category', categorySchema);

   module.exports = CategoryModel;