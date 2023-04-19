const slugify = require('slugify')
const asyncHandler = require('express-async-handler');
const subCategoryModel = require('../models/subCategoryModel');
const ApiError = require('../utils/ApiError');

const ApiFeatures = require('../utils/apiFeatures');

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

  exports.getSubCategories = asyncHandler (async (req, res)=>{
   const documentsCounts = await subCategoryModel.countDocuments();
   const apiFeatures = new ApiFeatures(subCategoryModel.find(),req.query).pagination(documentsCounts).filter().sort().limitFeilds().search('Products');
  
 
   // execute query
   const{mongooseQuery,paginationResult}= apiFeatures;
   const SubCategories = await mongooseQuery;
   //  .populate({path:'category',select: 'name -_id'});
    res.status(200).json({result: SubCategories.length, paginationResult,data: SubCategories});
    }); 
   //@desc Get specific subcategory by id
   //@route Get /api/v1/subcategories/:id
   //@access Public
 exports.getSubCategory = asyncHandler( async (req,res,next)=>{
    const { id } = req.params;
    const SubCategory = await subCategoryModel.findById(id)
    if(!SubCategory){
      return  next(new ApiError(`No SubCategory with this id ${id}`,404))
       //res.status(404).json({msg: `No Category with this id ${id}`});
    }
    res.status(200).json({data: SubCategory});
 });
  //@desc Create subCategory
  //@route POST /api/v1/subcategories
  //@access Private
  // asynchandler package to handler l exception to express
  exports.createSubCategory = asyncHandler ( async (req, res)=>{
   
   const {name , category} = req.body;
    const subCategory = await subCategoryModel.create({name,slug:slugify(name),category});
    res.status(201).json({data : subCategory});
 
   });
  //@desc Update specific subcategory
  //@route Put /api/v1/subcategories/:id
  //@access Private
  exports.updateSubCategory = asyncHandler( async (req, res,next)=>{
    const { id } = req.params;
    const { name, category } = req.body;
    const Subcategory = await subCategoryModel.findByIdAndUpdate(
       {_id : id},
       {name,slug: slugify(name),category},
       {new : true}
    );
    if(!Subcategory){
       return  next(new ApiError(`No SubCategory with this id ${id}`,404))
    }
    res.status(200).json({data: Subcategory});
   })
   //@desc Delete specific subcategory
   //@route DELETE /api/v1/subcategories/:id
   //@access Private
   exports.deleteSubCategory = asyncHandler(async (req,res,next)=>{
    const { id } = req.params;
    const subcategory = await subCategoryModel.findByIdAndDelete(id);
    if(!subcategory){
       return  next(new ApiError(`No SubCategory with this id ${id}`,404))
    }
    res.status(200).json({data: subcategory});
   });