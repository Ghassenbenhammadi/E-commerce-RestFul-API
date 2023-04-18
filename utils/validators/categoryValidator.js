 
 const { check } = require('express-validator');
 const validataorMiddleware = require('../../middlewares/validatorMiddleware.js')
 
 exports.getCategoryValidator =[
    // Rules
    check('id').isMongoId().withMessage('Invalid id category'),
    validataorMiddleware
 ];
 exports.createCategoryValidator=[
   check("name").notEmpty().withMessage('Category required').isLength({min:3})
   .withMessage('Too short category name').isLength({masx: 32}).withMessage('Too long category name'),
   validataorMiddleware

 ];
 exports.updateCategoryValidator =[
   check('id').isMongoId().withMessage('Invalid id category'),
    validataorMiddleware

 ];
 exports.deleteCategoryValidator =[
   check('id').isMongoId().withMessage('Invalid id category'),
    validataorMiddleware

 ];