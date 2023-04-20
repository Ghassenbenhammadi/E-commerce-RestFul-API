
const { default: slugify } = require('slugify');
const { check,body } = require('express-validator');
const validataorMiddleware = require('../../middlewares/validatorMiddleware.js');
const CategoryModel = require ('../../models/categoryModel')
const SubCategoryModel = require ('../../models/subCategoryModel.js');

 exports.createProductValidator =[
    check('title')
    .isLength({min:3})
    .withMessage('must be at least 3 chars')
    .notEmpty()
    .withMessage('Product required').custom((val,{req})=>{
      req.body.slug = slugify(val);
      return true;
     }),
    check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({max:2000})
    .withMessage('Too long descriptoion'),
    check('quantity')
    .isNumeric()
    .withMessage('Quantity must be number')
    .notEmpty()
    .withMessage('Quantity is required'),
    check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product price must be a number'),
    check('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be numeric')
    .isLength({max:32})
    .withMessage('to long price '),
    check('priceAfterDiscount')
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage('priceAfterDiscount must be number')
    .custom((value,{req})=>{
      if (req.body.price < value){
         throw new Error('priceAfterDiscount must be lower than  price');
      }
      return true
    }),
    check('color')
    .optional()
    .isArray()
    .withMessage('Available colors must be an array of string'),
    check('imageCover')
    .notEmpty()
    .withMessage('Product imageCover is required'),
    check('image')
    .optional()
    .isArray()
    .withMessage('images should be array of string'),
  check('category')
  .notEmpty()
  .withMessage('Category is required')
  .isMongoId()
  .withMessage('Invalid Id formate')
  .custom((categoryId)=> CategoryModel.findById(categoryId).then((category)=>{
    if(!category){
      return Promise.reject(new Error(`No category with this category Id ${categoryId}`));
    }
  })),
  check('subcategories')
  .optional()
  .isMongoId()
  .withMessage('Invalid Id formate')
  .custom((subcategoriesIds) =>
  SubCategoryModel.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
        (result) => {
          if (result.length < 1 || result.length !== subcategoriesIds.length) {
            return Promise.reject(new Error(`Invalid subcategories Ids`));
          }
        }
      )
    ).custom((val,{req})=>SubCategoryModel.find({ category: req.body.category}).then((subcategories)=>{
      const subCategoriesIdsInDB =[];
      subcategories.forEach((subCategoryModel)=>{
        subCategoriesIdsInDB.push(subCategoryModel._id.toString());
      });
      if(!val.every((v)=> subCategoriesIdsInDB.includes(v))){
  
        return Promise.reject(new Error(`Invalid subcategories Ids`));
      }

    }

    )),
  check('brand')
  .optional()
  .isMongoId()
  .withMessage('Invalid Id formate'),
  check('ratingsAverage')
  .optional()
  .isNumeric()
  .withMessage('Ratings average must be a number')
  .isLength({min:1})
  .withMessage('rating must be above or equal 1.0')
  .isLength({max:5})
  .withMessage('rating must be below than or equal 5.0'),
  check('ratingsQuantity')
  .optional()
  .isNumeric()
  .withMessage('Ratings quantity must be a number'),

    validataorMiddleware,
 ];
 exports.getProductValidator =[
   check('id').isMongoId().withMessage('InValid ID formate'),
   validataorMiddleware
 ];
 exports.updateProductValidator =[
   check('id').isMongoId().withMessage('InValid ID formate'),
   body('title')
   .optional()
   .custom((val, { req }) => {
     req.body.slug = slugify(val);
     return true;
   }),
   ];
   exports.deleteProductValidator=[
      check('id').isMongoId().withMessage('InValid ID formate'),
      validataorMiddleware
   ];
