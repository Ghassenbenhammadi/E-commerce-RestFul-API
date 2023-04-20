const slugify = require('slugify')
 const { check,body} = require('express-validator');
 const validataorMiddleware = require('../../middlewares/validatorMiddleware.js')
 
 exports.getCategoryValidator =[
    // Rules
    check('id').isMongoId().withMessage('Invalid id category'),
    validataorMiddleware
 ];
 exports.createCategoryValidator=[
   check("name").notEmpty().withMessage('Category required').isLength({min:3})
   .withMessage('Too short category name').isLength({masx: 32}).withMessage('Too long category name').custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
   }),
   validataorMiddleware

 ];
 exports.updateCategoryValidator =[
   check('id').isMongoId().withMessage('Invalid id category'),
   body('name').optional().custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
   }),
    validataorMiddleware

 ];
 exports.deleteCategoryValidator =[
   check('id').isMongoId().withMessage('Invalid id category'),
    validataorMiddleware

 ];