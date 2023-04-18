   // PORT 
const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
 name:{
    type: String,
    tirm:true,
    unique:[true,"subcategory must be unique"],
    minlength:[2,"to short subcategory name"],
    maxlength:[32,"to long subcategory name"],
 },
 slug:{
    type:String,
    lowercase: true,
 },
 category:{
    type:mongoose.Schema.ObjectId,
    ref: "Category",
    required:[true,"subCategory must be belong to parent category"]
 },
},{timestamps: true});
module.exports = mongoose.model('SubCategory', subCategorySchema)