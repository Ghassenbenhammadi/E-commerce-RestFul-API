
const subCategoryModel = require('../models/subCategoryModel');
const factory = require('./handlerFactory')


exports.setCategoryIdToBody =(req, res,next) =>{
   // Nested route
   if(!req.body.category) req.body.category= req.params.categoryId
   next();
};

// Nested route
// GET /api/v1/categories/categoryId/subCategories
exports.createFilterObj = (req,res,next)=>{
   let filterObject ={};
   if(req.params.categoryId) filterObject = {category: req.params.categoryId}
   req.filterObj = filterObject;
   next();
} 
//@desc Get list of  subcategories
  //@route GET /api/v1/subcategories
  //@access Public

  exports.getSubCategories = factory.getAll(subCategoryModel); 
   //@desc Get specific subcategory by id
   //@route Get /api/v1/subcategories/:id
   //@access Public
 exports.getSubCategory =  factory.getOne(subCategoryModel);
  //@desc Create subCategory
  //@route POST /api/v1/subcategories
  //@access Private
  // asynchandler package to handler l exception to express
  exports.createSubCategory = factory.createOne(subCategoryModel);
  //@desc Update specific subcategory
  //@route Put /api/v1/subcategories/:id
  //@access Private
  exports.updateSubCategory = factory.updateOne(subCategoryModel);
   //@desc Delete specific subcategory
   //@route DELETE /api/v1/subcategories/:id
   //@access Private
   exports.deleteSubCategory = factory.deleteOne(subCategoryModel);
  