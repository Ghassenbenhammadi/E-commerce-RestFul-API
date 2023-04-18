/* eslint-disable import/extensions */
 
 const { check } = require('express-validator');
 const validataorMiddleware = require('../../middlewares/validatorMiddleware.js')
 
 exports.getSubCategoryValidator =[
    // Rules
    check('id').isMongoId().withMessage('Invalid id Subcategory'),
    validataorMiddleware
 ];
 exports.createSubCategoryValidator=[
   check("name")
   .notEmpty()
   .withMessage('SubCategory required')
   .isLength({min:2})
   .withMessage('Too short Subcategory name').
   isLength({masx: 32})
   .withMessage('Too long Subcategory name'),
   check('category').notEmpty().withMessage("sub category must be belong to category").isMongoId().withMessage('Invalid Category id format'),
   validataorMiddleware

 ];
 exports.updateSubCategoryValidator =[
   check('id').notEmpty().withMessage("subcategory must be belong to category").isMongoId().withMessage('Invalid id Subcategory'),
    validataorMiddleware

 ];
 exports.deleteSubCategoryValidator =[
   check('id').notEmpty().withMessage("subcategory must be belong to category").isMongoId().withMessage('Invalid id Subcategory'),
    validataorMiddleware

 ];