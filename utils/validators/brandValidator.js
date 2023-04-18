 
 const { check } = require('express-validator');
 const validataorMiddleware = require('../../middlewares/validatorMiddleware.js')
 
 exports.getBrandValidator =[
    // Rules
    check('id').isMongoId().withMessage('Invalid id Brand'),
    validataorMiddleware
 ];
 exports.createBrandValidator=[
   check("name").notEmpty().withMessage('Brand required').isLength({min:3})
   .withMessage('Too short Brand name').isLength({masx: 32}).withMessage('Too long Brand name'),
   validataorMiddleware

 ];
 exports.updateBrandValidator =[
   check('id').isMongoId().withMessage('Invalid id Brand'),
    validataorMiddleware

 ];
 exports.deleteBrandValidator =[
   check('id').isMongoId().withMessage('Invalid id Brand'),
    validataorMiddleware

 ];