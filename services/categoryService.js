const slugify = require('slugify')
const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');
const ApiError = require('../utils/ApiError')
const ApiFeatures = require('../utils/apiFeatures')
 //@desc Get list of  categories
  //@route GET /api/v1/categories
  //@access Public

exports.getCategories = asyncHandler (async (req, res)=>{
   
   const documentsCounts = await CategoryModel.countDocuments();
   const apiFeatures = new ApiFeatures(CategoryModel.find(),req.query).pagination(documentsCounts).filter().sort().limitFeilds().search('Products');
  
 
   // execute query
   const{mongooseQuery,paginationResult}= apiFeatures;
   const categories = await mongooseQuery;
   res.status(200).json({result: categories.length, paginationResult,data: categories});
   }); 
  //@desc Get specific category by id
  //@route Get /api/v1/categories/:id
  //@access Public
exports.getCategory = asyncHandler( async (req,res,next)=>{
   const { id } = req.params;
   const category = await CategoryModel.findById(id);
   if(!category){
     return  next(new ApiError(`No Category with this id ${id}`,404))
      //res.status(404).json({msg: `No Category with this id ${id}`});
   }
   res.status(200).json({data: category});
});
  //@desc Create category
  //@route POST /api/v1/categories
  //@access Private
  // asynchandler package to handler l exception to express
  exports.createCategory = asyncHandler ( async (req, res)=>{
   const {name} = req.body;
   const category = await CategoryModel.create({name,slug:slugify(name)});
   res.status(201).json({data : category});

  });
   //@desc Update specific category
  //@route Put /api/v1/categories/:id
  //@access Private
  exports.updateCategory = asyncHandler( async (req, res,next)=>{
   const { id } = req.params;
   const { name } = req.body;
   const category = await CategoryModel.findByIdAndUpdate(
      {_id : id},
      {name,slug: slugify(name)},
      {new : true}
   );
   if(!category){
      return  next(new ApiError(`No Category with this id ${id}`,404))
   }
   res.status(200).json({data: category});
  })
  //@desc Delete specific category
  //@route DELETE /api/v1/categories/:id
  //@access Private
  exports.deleteCategory = asyncHandler(async (req,res,next)=>{
   const { id } = req.params;
   const category = await CategoryModel.findByIdAndDelete(id);
   if(!category){
      return  next(new ApiError(`No Category with this id ${id}`,404))
   }
   res.status(200).json({data: category});
  });