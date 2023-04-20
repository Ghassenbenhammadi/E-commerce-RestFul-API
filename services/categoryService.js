
const CategoryModel = require('../models/categoryModel');
const factory = require('./handlerFactory')
 //@desc Get list of  categories
  //@route GET /api/v1/categories
  //@access Public

exports.getCategories = factory.getAll(CategoryModel); 
  //@desc Get specific category by id
  //@route Get /api/v1/categories/:id
  //@access Public
exports.getCategory =factory.getOne(CategoryModel);
  //@desc Create category
  //@route POST /api/v1/categories
  //@access Private
  // asynchandler package to handler l exception to express
  exports.createCategory = factory.createOne(CategoryModel);
   //@desc Update specific category
  //@route Put /api/v1/categories/:id
  //@access Private
  exports.updateCategory = factory.updateOne(CategoryModel);
  //@desc Delete specific category
  //@route DELETE /api/v1/categories/:id
  //@access Private
  exports.deleteCategory = factory.deleteOne(CategoryModel);
