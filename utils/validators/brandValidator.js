 
const { check, body } = require('express-validator');
const validataorMiddleware = require('../../middlewares/validatorMiddleware.js');
const { default: slugify } = require('slugify');
 
 exports.getBrandValidator =[
    // Rules
    check('id').isMongoId().withMessage('Invalid id Brand'),
    validataorMiddleware
 ];
 exports.createBrandValidator=[
   check("name").notEmpty().withMessage('Brand required').isLength({min:3})
   .withMessage('Too short Brand name').isLength({masx: 32}).withMessage('Too long Brand name').custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
   }),
   validataorMiddleware

 ];
 exports.updateBrandValidator =[
   check('id').isMongoId().withMessage('Invalid id Brand'),
   body('name').custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
   }),
    validataorMiddleware

 ];
 exports.deleteBrandValidator =[
   check('id').isMongoId().withMessage('Invalid id Brand'),
    validataorMiddleware

 ];