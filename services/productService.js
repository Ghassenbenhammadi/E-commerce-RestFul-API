const slugify = require('slugify')
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const ApiError = require('../utils/ApiError')
const ApiFeatures = require('../utils/apiFeatures')
 //@desc Get list of  products
  //@route GET /api/v1/products
  //@access Public

exports.getProducts = asyncHandler (async (req, res)=>{
   
   const documentsCounts = await Product.countDocuments();
   const apiFeatures = new ApiFeatures(Product.find(),req.query).pagination(documentsCounts).filter().sort().limitFeilds().search('Products');
  
 
   // execute query
   const{mongooseQuery,paginationResult}= apiFeatures;
   const products = await mongooseQuery;
   res.status(200).json({result: products.length,paginationResult, data: products});
   }); 
  //@desc Get specific product by id
  //@route Get /api/v1/products/:id
  //@access Public
exports.getProduct = asyncHandler( async (req,res,next)=>{
   const { id } = req.params;
   const product = await Product.findById(id).populate({path: 'category' , select:'name-_id'});
   if(!product){
     return  next(new ApiError(`No product with this id ${id}`,404))
      //res.status(404).json({msg: `No Category with this id ${id}`});
   }
   res.status(200).json({data: product});
});
  //@desc Create product
  //@route POST /api/v1/products
  //@access Private
  // asynchandler package to handler l exception to express
  exports.createProduct = asyncHandler ( async (req, res)=>{
   req.body.slug= slugify(req.body.title);

   
   const product = await Product.create(req.body);
   res.status(201).json({data : product});

  });
   //@desc Update specific product
  //@route Put /api/v1/products/:id
  //@access Private
  exports.updateProduct = asyncHandler( async (req, res,next)=>{
   const { id } = req.params;
 if(req.body.title){
   req.body.slug= slugify(req.body.title);
 }
   const product = await Product.findByIdAndUpdate(
      {_id : id},
      req.body,
      {new : true}
   );
   if(!product){
      return  next(new ApiError(`No product with this id ${id}`,404))
   }
   res.status(200).json({data: product});
  })
  //@desc Delete specific product
  //@route DELETE /api/v1/products/:id
  //@access Private
  exports.deleteProduct = asyncHandler(async (req,res,next)=>{
   const { id } = req.params;
   const product = await Product.findByIdAndDelete(id);
   if(!product){
      return  next(new ApiError(`No product with this id ${id}`,404))
   }
   res.status(200).json({data: product});
  });