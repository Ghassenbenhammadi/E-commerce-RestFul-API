
 const slugify = require('slugify')
 const { check,body } = require('express-validator');
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
   .withMessage('Too long Subcategory name').custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
   }),
   check('category').notEmpty().withMessage("sub category must be belong to category").isMongoId().withMessage('Invalid Category id format'),
   validataorMiddleware

 ];
 exports.updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Subcategory id format'),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validataorMiddleware,
];
 exports.deleteSubCategoryValidator =[
   check('id').notEmpty().withMessage("subcategory must be belong to category").isMongoId().withMessage('Invalid id Subcategory'),
    validataorMiddleware

 ];