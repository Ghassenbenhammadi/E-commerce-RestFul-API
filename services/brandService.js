const slugify = require('slugify')
const asyncHandler = require('express-async-handler');
const Brand = require('../models/brandModel');
const ApiError = require('../utils/ApiError')
const ApiFeatures = require('../utils/apiFeatures')
 //@desc Get list of  brands
  //@route GET /api/v1/brands
  //@access Public

exports.getBrands = asyncHandler (async (req, res,next)=>{
   const documentsCounts = await Brand.countDocuments();
   const apiFeatures = new ApiFeatures(Brand.find(),req.query).pagination(documentsCounts).filter().sort().limitFeilds().search();
  
   const{mongooseQuery,paginationResult}= apiFeatures;
   const brands = await mongooseQuery;
   res.status(200).json({result: brands.length, paginationResult,data: brands});
   }); 
  //@desc Get specific brand by id
  //@route Get /api/v1/brands/:id
  //@access Public
exports.getBrand = asyncHandler( async (req,res,next)=>{
   const { id } = req.params;
   const brand = await Brand.findById(id);
   if(!brand){
     return  next(new ApiError(`No brand with this id ${id}`,404))
      //res.status(404).json({msg: `No Category with this id ${id}`});
   }
   res.status(200).json({data: brand});
});
  //@desc Create brand
  //@route POST /api/v1/brands
  //@access Private
  // asynchandler package to handler l exception to express
  exports.createBrand= asyncHandler ( async (req, res)=>{
   const {name} = req.body;
   const brand = await Brand.create({name,slug:slugify(name)});
   res.status(201).json({data : brand});

  });
   //@desc Update specific brand
  //@route Put /api/v1/brands/:id
  //@access Private
  exports.updateBrand = asyncHandler( async (req, res,next)=>{
   const { id } = req.params;
   const { name } = req.body;
   const brand = await Brand.findByIdAndUpdate(
      {_id : id},
      {name,slug: slugify(name)},
      {new : true}
   );
   if(!brand){
      return  next(new ApiError(`No brand with this id ${id}`,404))
   }
   res.status(200).json({data: brand});
  })
  //@desc Delete specific brand
  //@route DELETE /api/v1/brands/:id
  //@access Private
  exports.deleteBrand = asyncHandler(async (req,res,next)=>{
   const { id } = req.params;
   const brand = await Brand.findByIdAndDelete(id);
   if(!brand){
      return  next(new ApiError(`No brand with this id ${id}`,404))
   }
   res.status(200).json({data: brand});
  });