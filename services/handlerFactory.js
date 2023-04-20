const ApiError = require('../utils/ApiError');
const ApiFeatures = require('../utils/apiFeatures');
const asyncHandler = require('express-async-handler');

 exports.deleteOne = (Model) =>
    asyncHandler(async (req,res,next)=>{
        const { id } = req.params;
        const document = await Model.findByIdAndDelete(id);
        if(!document){
           return  next(new ApiError(`No document with this id ${id}`,404))
        }
        res.status(200).send();
       });
   exports.updateOne = (Model) => asyncHandler( async (req, res,next)=>{
   
      const document = await Model.findByIdAndUpdate(
       req.params.id,
         req.body,
         {new : true}
      );
      if(!document){
         return  next(new ApiError(`No document with this id ${req.params.id}`,404))
      }
      res.status(200).json({data: document});
     });
exports.createOne = (Model)=> asyncHandler ( async (req, res)=>{
   const newdocument = await Model.create(req.body);
   res.status(201).json({data : newdocument});

  });

exports.getOne = (Model)=>
asyncHandler( async (req,res,next)=>{
   const { id } = req.params;
   const document = await Model.findById(id);
   if(!document){
     return  next(new ApiError(`No document with this id ${id}`,404))
   }
   res.status(200).json({data: document});
});

exports.getAll = (Model,modelName='') =>
asyncHandler (async (req, res,next)=>{
   let filter={};
   if(req.filterObj){
      filter = req.filterObj
   }
   const documentsCounts = await Model.countDocuments();
   const apiFeatures = new ApiFeatures(Model.find(filter),req.query).pagination(documentsCounts).filter().sort().limitFeilds().search(modelName);
  
   const{mongooseQuery,paginationResult}= apiFeatures;
   const documents = await mongooseQuery;
   res.status(200).json({result: documents.length, paginationResult,data: documents});
   });